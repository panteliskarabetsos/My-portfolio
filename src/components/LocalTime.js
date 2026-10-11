'use client';

import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Athens',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
});

/** Current time in Athens, rendered only on the client to avoid hydration mismatch. */
export default function LocalTime({ className = '' }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={`tabular-nums ${className}`} suppressHydrationWarning>
      {now ? fmt.format(now) : '--:-- ---'}
    </time>
  );
}
