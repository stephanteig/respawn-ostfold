'use client';

import { useState } from 'react';
import ImgPlaceholder from './ImgPlaceholder';

const roles = [
  {
    title: 'PRODUSENT',
    desc: 'Styr OBS og live kontrollpanelet under sendingen. Alt du gjør synes på Twitch i sanntid.',
    color: 'var(--green)',
  },
  {
    title: 'KAMERAOPERATØR',
    desc: 'Film kommentatorer, reaksjoner og atmosfæren i lokalet. Flere kameravinkler trengs.',
    color: 'var(--portal)',
  },
  {
    title: 'REGI',
    desc: 'Koordiner alle deler av sendingen i sanntid. Du bestemmer hva publikum ser og når.',
    color: 'var(--teal)',
  },
  {
    title: 'SOSIALE MEDIER',
    desc: 'Instagram og TikTok, live-updates og innhold før, under og etter eventet.',
    color: 'var(--green-d)',
  },
  {
    title: 'PLANLEGGING',
    desc: 'Logistikk, tidslinje, sponsorkontakt og gjennomføring. Hjelp til å få det hele i land.',
    color: 'var(--muted)',
  },
];

function RoleCard({ role }: { role: typeof roles[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: hovered ? 'rgba(30,72,53,0.9)' : 'var(--forest)',
        padding: '28px 22px',
        borderLeft: `3px solid ${hovered ? role.color : role.color}`,
        transition: 'background .2s',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '12px',
        letterSpacing: '2px',
        color: 'var(--white)',
        marginBottom: '8px',
      }}>
        {role.title}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 600 }}>
        {role.desc}
      </div>
    </div>
  );
}

export default function SectionRoller() {
  return (
    <section id="roller" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '4px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        02 / PRODUKSJONSTEAM
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '48px',
      }}>
        Vi trenger deg
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2px',
        marginBottom: '40px',
      }}>
        {roles.map((role) => (
          <RoleCard key={role.title} role={role} />
        ))}
      </div>

      <ImgPlaceholder caption="obs_kontrollpanel.png — Scenekontroll med STARTER SMART, PAUSE osv." />

      <style>{`
        @media (max-width: 768px) {
          #roller { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
