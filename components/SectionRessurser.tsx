'use client';

import { useState } from 'react';

const base = process.env.NODE_ENV === 'production' ? '/respawn-ostfold' : '';

const resources = [
  {
    type: 'BRAND',
    name: 'Profilguide PDF',
    desc: 'Fullstendig brand guide med farger, fonter, logobruk og designprinsipper.',
    href: `${base}/downloads/profilguide.pdf`,
    download: 'RespawnOstfold-ProfilGuide.pdf',
    action: '↓ LAST NED',
    external: false,
  },
  {
    type: 'LOGO',
    name: 'Logo Pakke',
    desc: 'SVG, PNG og JPG i alle størrelser. Horisontal og kvadratisk variant.',
    href: `${base}/downloads/logo-pakke.zip`,
    download: 'respawn-ostfold-logo.zip',
    action: '↓ LAST NED',
    external: false,
  },
  {
    type: 'STREAM',
    name: 'OBS Overlay-system v3',
    desc: 'Node.js WebSocket-server med alle 8 overlays. README og start-script inkludert.',
    href: `${base}/downloads/stream-overlays-v3.zip`,
    download: 'respawn-overlays-v3.zip',
    action: '↓ LAST NED',
    external: false,
  },
  {
    type: 'FONT',
    name: 'Pixer Font',
    desc: 'Primær pixel-font brukt for all tekst. Last ned fra Fontfabric. Gratis for personlig bruk.',
    href: 'https://www.fontfabric.com/fonts/pixer/',
    download: undefined,
    action: '↗ ÅPNE',
    external: true,
  },
  {
    type: 'FONT',
    name: 'Press Start 2P',
    desc: 'Brukes kun for Ø-tegnet i logotypen. Google Fonts.',
    href: 'https://fonts.google.com/specimen/Press+Start+2P',
    download: undefined,
    action: '↗ ÅPNE',
    external: true,
  },
  {
    type: 'PITCH',
    name: 'Pitch-presentasjon',
    desc: 'Gamma-presentasjon for rekruttering av VG1-elever til produksjonsteam.',
    href: 'https://gamma.app/docs/Ostfolds-forste-Minecraft-esports-turnering-t11byix06w66flz?following_id=srum38fvpluqs2l&follow_on_start=true',
    download: undefined,
    action: '↗ ÅPNE',
    external: true,
  },
  {
    type: 'DOCS',
    name: 'Dokumentasjon',
    desc: 'Teknisk dokumentasjon for stream-system, overlays, kontrollpanel og multi-sesjon.',
    href: 'https://stephanteig.github.io/respawn-ostfold/docs',
    download: undefined,
    action: '↗ ÅPNE',
    external: true,
  },
];

function ResourceCard({ r }: { r: typeof resources[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={r.href}
      download={r.download}
      target={r.external ? '_blank' : undefined}
      rel={r.external ? 'noopener noreferrer' : undefined}
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
          {r.type}
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          letterSpacing: '2px',
          color: hovered ? 'var(--green)' : 'var(--muted)',
          transition: 'color .2s',
        }}>
          {r.action}
        </span>
      </div>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '13px',
        color: 'var(--white)',
        letterSpacing: '1px',
      }}>
        {r.name}
      </span>
      <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.55 }}>
        {r.desc}
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
          <ResourceCard key={r.name} r={r} />
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
