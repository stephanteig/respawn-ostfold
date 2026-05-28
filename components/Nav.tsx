'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StaticImage from './StaticImage';

const links = [
  { label: 'HJEM', href: '/' },
  { label: 'OM', href: '/om' },
  { label: 'SPILLERE', href: '/spillere' },
  { label: 'PÅMELDING', href: '/pamelding' },
  { label: 'STREAM', href: '/stream' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <div style={{ height: '3px', background: 'var(--green)', width: '100%' }} />
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid rgba(135,206,52,0.15)',
        position: 'sticky',
        top: 0,
        background: 'rgba(16,44,49,0.97)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <StaticImage
            src="/logo-1.png"
            alt="Respawn Østfold logo ikon"
            width={40}
            height={40}
            style={{ imageRendering: 'pixelated', width: 40, height: 40 }}
          />
          <div style={{ fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.4 }}>
            <div style={{ fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace", color: 'var(--white)', letterSpacing: '1px', fontSize: '11px' }}>RESPAWN</div>
            <div style={{ color: 'var(--green)', letterSpacing: '5px', fontSize: '11px', marginTop: '4px' }}>ØSTFOLD</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex',
          gap: '36px',
          listStyle: 'none',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '12px',
          letterSpacing: '3px',
          alignItems: 'center',
        }} className="nav-links-desktop">
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    color: active ? 'var(--green)' : 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color .2s',
                    cursor: 'pointer',
                    borderBottom: active ? '2px solid var(--green)' : '2px solid transparent',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? 'var(--green)' : 'var(--muted)')}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label="Åpne meny"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid rgba(135,206,52,0.4)',
            color: 'var(--green)',
            padding: '8px 10px',
            cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px',
            letterSpacing: '1px',
          }}
          className="nav-hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--dark)',
          borderBottom: '1px solid rgba(135,206,52,0.2)',
          padding: '16px 24px',
          zIndex: 99,
          position: 'sticky',
          top: '0',
        }}>
          {links.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '3px',
                  color: active ? 'var(--green)' : 'var(--muted)',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(135,206,52,0.08)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        nav { padding: 20px 48px; }
        @media (max-width: 768px) {
          nav { padding: 16px 24px !important; }
        }
      `}</style>
    </>
  );
}
