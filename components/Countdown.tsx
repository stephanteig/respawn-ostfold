'use client';

import { useEffect, useState } from 'react';

// Turneringsstart: 11. juni 2026 kl 12:00 (norsk tid, UTC+2 i juni)
const TARGET = new Date('2026-06-11T12:00:00+02:00').getTime();

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{
        fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
        fontSize: 'clamp(20px, 5vw, 38px)',
        color: 'var(--green)',
        background: 'rgba(30,72,53,0.5)',
        border: '1px solid rgba(135,206,52,0.25)',
        padding: '18px 18px',
        minWidth: 'clamp(64px, 16vw, 96px)',
        textAlign: 'center',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '3px',
        color: 'var(--portal)',
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '4px',
        color: 'var(--portal)',
      }}>
        NEDTELLING TIL START
      </p>
      <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 16px)', alignItems: 'flex-start' }} aria-live="polite">
        {/* Render fast layout uten verdier under hydrering for å unngå mismatch */}
        <Unit value={remaining?.days ?? 0} label="DAGER" />
        <Unit value={remaining?.hours ?? 0} label="TIMER" />
        <Unit value={remaining?.minutes ?? 0} label="MIN" />
        <Unit value={remaining?.seconds ?? 0} label="SEK" />
      </div>
    </div>
  );
}
