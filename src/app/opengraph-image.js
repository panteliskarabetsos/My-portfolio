import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const dots = 'radial-gradient(rgba(255,255,255,0.10) 1.5px, transparent 1.5px)';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0a0a0a',
          backgroundImage: dots,
          backgroundSize: '28px 28px',
          color: '#ededed',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#a3a3a3' }}>
          <div
            style={{
              display: 'flex',
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #262626',
              borderRadius: 10,
              color: '#ededed',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            PK
          </div>
          pkarabetsos.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 30, color: "#a3a3a3", marginTop: 12 }}>
            {`${site.role} · Network security & adversarial ML`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40, fontSize: 24, color: '#34d399' }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: '#34d399' }} />
            Open to entry-level security roles
          </div>
        </div>
      </div>
    ),
    size
  );
}
