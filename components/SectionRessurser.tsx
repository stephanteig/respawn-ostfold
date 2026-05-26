'use client';

import { useState } from 'react';

const resources = [
  {
    type: 'BRAND',
    name: 'PROFILGUIDE PDF',
    desc: 'Fullstendig brand guide med farger, fonter, logobruk og designprinsipper.',
    href: '/RespawnOstfoldProfilGuide.pdf',
    icon: '↓',
  },
  {
    type: 'LOGO',
    name: 'LOGO PAKKE',
    desc: 'PNG i 4x skala, SVG-varianter. Horisontal og ikon-variant. Til alle bruksområder.',
    href: '#',
    icon: '↓',
  },
  {
    type: 'STREAM',
    name: 'OBS OVERLAY-SYSTEM',
    desc: 'Node.js WebSocket-server med alle overlays v3. Klart til bruk på turneringsdagen.',
    href: '#',
    icon: '↓',
  },
  {
    type: 'FONT',
    name: 'PIXER FONT',
    desc: 'Last ned fra Fontfabric.com. Gratis for personlig bruk. Primær pixel-font.',
    href: 'https://www.fontfabric.com/fonts/pixer/',
    icon: '↗',
  },
  {
    type: 'FONT',
    name: 'PRESS START 2P',
    desc: 'Google Fonts. Brukes kun for Ø-tegnet i logotypen.',
    href: 'https://fonts.google.com/specimen/Press+Start+2P',
    icon: '↗',
  },
  {
    type: 'PITCH',
    name: 'PRESENTASJON',
    desc: 'Gamma-presentasjon for rekruttering av VG1-elever til produksjonsteam.',
    href: '#',
    icon: '↗',
  },
];

function ResourceCard({ resource }: { resource: typeof resources[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={resource.href}
      target={resource.href.startsWith('http') ? '_blank' : undefined}
      rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        background: 'var(--forest)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        borderBottom: `2px solid ${hovered ? 'var(--green)' : 'transparent'}`,
        transition: 'border-color .2s',
        textDecoration: 'none',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '9px',
          letterSpacing: '3px',
          color: 'var(--portal)',
        }}>
          {resource.type}
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '14px',
          color: hovered ? 'var(--green)' : 'var(--muted)',
          transition: 'color .2s',
        }}>
          {resource.icon}
        </span>
      </div>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '13px',
        color: 'var(--white)',
        letterSpacing: '1px',
      }}>
        {resource.name}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.5 }}>
        {resource.desc}
      </span>
    </a>
  );
}

export default function SectionRessurser() {
  return (
    <section id="ressurser" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '4px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        04 / RESSURSER
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '48px',
      }}>
        Last ned &amp; ta i bruk
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2px',
      }}>
        {resources.map((r) => (
          <ResourceCard key={r.name} resource={r} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ressurser { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
