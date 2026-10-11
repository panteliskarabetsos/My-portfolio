/** Static dot grid with an accent layer revealed around the cursor (vars set by <Spotlight />). */
export default function HeroGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div data-glow className="dot-grid-glow absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-background" />
    </div>
  );
}
