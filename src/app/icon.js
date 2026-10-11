import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 14,
          color: '#ededed',
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        PK
        <div style={{ position: 'absolute', right: 9, bottom: 9, width: 8, height: 8, borderRadius: 8, background: '#34d399' }} />
      </div>
    ),
    size
  );
}
