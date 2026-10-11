'use client';

import { useEffect, useRef } from 'react';

/*
 * A shaded sphere drawn with monospace characters, with a latitude/longitude
 * grid, Athens marked in the accent colour and a small satellite in orbit.
 * Auto-rotates; drag to spin it.
 */

const RAMP = ' .:-=+*#%@';

const ATHENS = { lat: (37.98 * Math.PI) / 180, lon: (23.73 * Math.PI) / 180 };
const TILT = 0.38;
const SPEED = 0.22; // rad/s auto-rotation
const LIGHT = (() => {
  const v = [-0.55, 0.55, 0.63];
  const l = Math.hypot(...v);
  return v.map((c) => c / l);
})();

// Coarse continent outlines as [lon, lat] rings. Good enough at ASCII resolution.
const LAND = [
  // North America
  [[-168,66],[-162,70],[-140,70],[-120,72],[-95,72],[-80,73],[-62,66],[-55,52],[-66,45],[-75,35],[-81,25],[-81,30],[-90,29],[-97,26],[-97,20],[-87,21],[-83,10],[-78,8],[-85,12],[-92,15],[-105,20],[-110,24],[-115,32],[-124,40],[-125,49],[-135,58],[-150,60],[-165,60]],
  // Greenland
  [[-55,60],[-43,60],[-20,70],[-20,80],[-40,83],[-60,80],[-70,77],[-55,70]],
  // South America
  [[-80,10],[-72,12],[-60,10],[-50,0],[-35,-5],[-38,-13],[-40,-22],[-48,-26],[-58,-35],[-65,-42],[-68,-52],[-74,-52],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0]],
  // Eurasia
  [[-10,36],[-9,43],[-1,46],[-4,48],[2,51],[8,54],[8,57],[5,61],[14,67],[25,71],[40,68],[55,70],[70,73],[90,76],[110,77],[130,72],[150,71],[170,70],[180,67],[180,65],[165,60],[160,55],[142,52],[140,46],[130,42],[127,38],[122,40],[120,35],[121,30],[118,24],[110,21],[108,15],[105,9],[100,13],[100,6],[103,1],[98,8],[97,16],[92,22],[88,22],[80,15],[77,8],[73,20],[67,25],[57,25],[56,27],[50,30],[48,30],[52,24],[56,24],[59,22],[55,17],[44,12],[43,15],[35,28],[34,31],[36,36],[28,36.5],[27,37],[26.5,40.5],[24,40.5],[24.5,37.5],[23,36.4],[21.5,36.8],[20.5,39.5],[19.5,41.5],[16,41],[18,40],[16,38],[12,44],[14,46],[10,44],[3,43],[-1,37],[-6,36]],
  // Africa
  [[-17,21],[-16,28],[-10,30],[-6,36],[10,37],[11,33],[20,31],[25,32],[32,31],[34,28],[39,16],[43,12],[51,12],[48,5],[40,-3],[40,-10],[40,-16],[35,-24],[32,-29],[27,-34],[20,-35],[18,-32],[15,-27],[12,-18],[13,-10],[9,-1],[9,4],[5,6],[-4,5],[-8,4],[-13,8],[-17,14]],
  // Australia
  [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-25],[151,-34],[145,-38],[138,-35],[132,-31],[124,-34],[115,-34],[113,-26]],
  // British Isles, Japan, Borneo, Sumatra, New Guinea, Madagascar
  [[-6,50],[2,51],[0,53],[-2,57],[-5,58],[-6,56],[-3,54],[-5,52]],
  [[130,31],[140,35],[142,40],[141,45],[139,42],[133,34]],
  [[109,2],[118,7],[119,-1],[115,-4],[110,-3]],
  [[95,5],[106,-6],[101,-3]],
  [[131,-1],[141,-3],[150,-10],[141,-9],[132,-4]],
  [[44,-25],[47,-25],[50,-15],[49,-12],[44,-16]],
];

function inside([x, y], ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Rasterise once into a 2° lon/lat bitmap for cheap per-cell lookups
const RES = 2;
const MASK = (() => {
  const w = 360 / RES;
  const h = 180 / RES;
  const m = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) {
    const lat = 90 - (j + 0.5) * RES;
    for (let i = 0; i < w; i++) {
      const lon = -180 + (i + 0.5) * RES;
      m[j * w + i] = lat < -68 || LAND.some((ring) => inside([lon, lat], ring)) ? 1 : 0;
    }
  }
  return m;
})();
const isLand = (latRad, lonRad) => {
  const lat = (latRad * 180) / Math.PI;
  const lon = (lonRad * 180) / Math.PI;
  const i = Math.min(179, Math.max(0, Math.floor((lon + 180) / RES)));
  const j = Math.min(89, Math.max(0, Math.floor((90 - lat) / RES)));
  return MASK[j * (360 / RES) + i] === 1;
};

const rgb = (name) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return v.length >= 3 ? v.slice(0, 3) : [128, 128, 128];
};
const css = ([r, g, b], a = 1) => `rgba(${r},${g},${b},${a})`;

// view = Rx(tilt) · Ry(yaw) · object
function toView([x, y, z], yaw, tilt) {
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [x1, y * Math.cos(tilt) - z1 * Math.sin(tilt), y * Math.sin(tilt) + z1 * Math.cos(tilt)];
}
function toObject([x, y, z], yaw, tilt) {
  const y1 = y * Math.cos(-tilt) - z * Math.sin(-tilt);
  const z1 = y * Math.sin(-tilt) + z * Math.cos(-tilt);
  return [x * Math.cos(-yaw) + z1 * Math.sin(-yaw), y1, -x * Math.sin(-yaw) + z1 * Math.cos(-yaw)];
}

export default function AsciiGlobe({ className = '' }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const family = getComputedStyle(canvas).fontFamily;

    let size = 0;
    let font = 11;
    let cellW = 7;
    let cellH = 13;
    let colors = {};
    let yaw = -ATHENS.lon - 0.7; // start just before Athens rotates to the front
    let tilt = TILT;
    let vel = SPEED;
    let orbit = 0;
    let pulse = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let drag = null;

    const readColors = () => {
      colors = { fg: rgb('--foreground'), muted: rgb('--muted'), accent: rgb('--accent'), bg: rgb('--background') };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      font = size < 240 ? 9 : 10.5;
      ctx.font = `${font}px ${family}`;
      cellW = ctx.measureText('M').width;
      cellH = font * 1.18;
    };

    const draw = () => {
      const { fg, muted, accent } = colors;
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.38;
      ctx.clearRect(0, 0, size, size);
      ctx.font = `${font}px ${family}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Orbit: an ellipse around the globe, hidden where it passes behind it
      const ORX = R * 1.32;
      const ORY = R * 0.36;
      const rot = -0.32;
      const orbitPoint = (t) => {
        const ex = ORX * Math.cos(t);
        const ey = ORY * Math.sin(t);
        return {
          x: cx + ex * Math.cos(rot) - ey * Math.sin(rot),
          y: cy + ex * Math.sin(rot) + ey * Math.cos(rot),
          front: Math.sin(t) > 0,
        };
      };
      const hidden = (p) => !p.front && Math.hypot(p.x - cx, p.y - cy) < R;
      const drawOrbit = (front) => {
        for (let i = 0; i < 140; i++) {
          const p = orbitPoint((i / 140) * Math.PI * 2);
          if (p.front !== front || hidden(p)) continue;
          ctx.fillStyle = css(muted, front ? 0.45 : 0.25);
          ctx.fillRect(p.x, p.y, 1, 1);
        }
      };
      drawOrbit(false);

      // Sphere
      const cols = Math.ceil((R * 2) / cellW) + 2;
      const rows = Math.ceil((R * 2) / cellH) + 2;
      for (let r = 0; r < rows; r++) {
        const py = cy - R - cellH + r * cellH;
        const yv = -(py - cy) / R;
        for (let c = 0; c < cols; c++) {
          const px = cx - R - cellW + c * cellW;
          const xv = (px - cx) / R;
          const d = xv * xv + yv * yv;
          if (d > 1) continue;
          const zv = Math.sqrt(1 - d);
          const light = Math.max(0, xv * LIGHT[0] + yv * LIGHT[1] + zv * LIGHT[2]);
          const b = 0.3 + 0.7 * light;
          const [ox, oy, oz] = toObject([xv, yv, zv], yaw, tilt);
          const lat = Math.asin(Math.max(-1, Math.min(1, oy)));
          const lon = Math.atan2(ox, oz);
          if (isLand(lat, lon)) {
            const ch = RAMP[Math.max(2, Math.min(RAMP.length - 1, Math.round(b * (RAMP.length - 1))))];
            ctx.fillStyle = css(fg, 0.3 + 0.65 * b);
            ctx.fillText(ch, px, py);
            continue;
          }
          const step = Math.PI / 12; // 15° graticule over the ocean
          const nearLat = Math.abs(lat / step - Math.round(lat / step)) < 0.08;
          const nearLon = Math.abs(lon / step - Math.round(lon / step)) * Math.cos(lat) < 0.08;
          ctx.fillStyle = css(muted, nearLat || nearLon ? 0.2 + 0.35 * b : 0.06 + 0.16 * b);
          ctx.fillText(nearLat || nearLon ? ':' : '.', px, py);
        }
      }

      // Faint rim to define the sphere
      ctx.strokeStyle = css(muted, 0.25);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R + cellW * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      // Athens
      const a = toView(
        [Math.cos(ATHENS.lat) * Math.sin(ATHENS.lon), Math.sin(ATHENS.lat), Math.cos(ATHENS.lat) * Math.cos(ATHENS.lon)],
        yaw,
        tilt
      );
      if (a[2] > 0.05) {
        const ax = cx + a[0] * R;
        const ay = cy - a[1] * R;
        const fade = Math.min(1, (a[2] - 0.05) / 0.25);
        const k = pulse % 1;
        ctx.strokeStyle = css(accent, (1 - k) * 0.8 * fade);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ax, ay, 3 + k * 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = css(accent, fade);
        ctx.beginPath();
        ctx.arc(ax, ay, 2.6, 0, Math.PI * 2);
        ctx.fill();
        if (a[2] > 0.35) {
          ctx.textAlign = 'left';
          ctx.fillStyle = css(accent, fade);
          ctx.fillText('athens', ax + 9, ay - 8);
          ctx.textAlign = 'center';
        }
      }

      drawOrbit(true);

      // Satellite
      const s = orbitPoint(orbit);
      if (!hidden(s)) {
        ctx.fillStyle = css(s.front ? fg : muted, s.front ? 0.9 : 0.5);
        ctx.fillRect(s.x - 2, s.y - 2, 4, 4);
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (!drag) {
        vel += (SPEED - vel) * Math.min(1, dt * 1.5); // ease back to auto-rotation
        tilt += (TILT - tilt) * Math.min(1, dt * 1.2);
      }
      yaw += vel * dt;
      orbit += dt * 0.45;
      pulse += dt * 0.7;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onDown = (e) => {
      drag = { x: e.clientX, y: e.clientY, t: performance.now() };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!drag) return;
      const now = performance.now();
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      yaw += dx * 0.01;
      tilt = Math.max(-0.9, Math.min(0.9, tilt + dy * 0.006));
      vel = (dx * 0.01) / Math.max(0.016, (now - drag.t) / 1000);
      drag = { x: e.clientX, y: e.clientY, t: now };
      if (reduced) draw();
    };
    const onUp = () => {
      drag = null;
    };

    readColors();
    resize();
    draw();
    start();

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(wrap);
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Rotating globe drawn in ASCII characters, with Athens highlighted"
      className={`relative aspect-square w-full ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab touch-pan-y font-mono active:cursor-grabbing" />
    </div>
  );
}
