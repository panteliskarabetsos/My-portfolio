import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ededed',
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        PK
        <div style={{ position: 'absolute', right: 34, bottom: 34, width: 16, height: 16, borderRadius: 16, background: '#34d399' }} />
      </div>
    ),
    size
  );
}
