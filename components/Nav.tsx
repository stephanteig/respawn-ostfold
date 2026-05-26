'use client';

import { useState } from 'react';
import Link from 'next/link';
import StaticImage from './StaticImage';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div style={{ height: '3px', background: 'var(--green)', width: '100%' }} />
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 48px',
        borderBottom: '1px solid rgba(135,206,52,0.15)',
        position: 'sticky',
        top: 0,
        background: 'rgba(16,44,49,0.97)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <StaticImage
            src="/logo-1.svg"
            alt="Respawn Østfold logo ikon"
            width={36}
            height={36}
            style={{ imageRendering: 'pixelated', width: 36, height: 36 }}
          />
          <div style={{ fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.2 }}>
            <div style={{ color: 'var(--white)', letterSpacing: '3px', fontSize: '14px' }}>RESPAWN</div>
            <div style={{ color: 'var(--green)', letterSpacing: '4px', fontSize: '10px' }}>ØSTFOLD</div>
          </div>
        </a>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          letterSpacing: '2px',
          alignItems: 'center',
        }} className="nav-links-desktop">
          {['OM', 'ROLLER', 'PROFIL', 'RESSURSER'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/kontrollpanel"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '10px', letterSpacing: '2px',
                padding: '5px 12px',
                border: '1px solid rgba(135,206,52,0.5)',
                color: 'var(--green)',
                textDecoration: 'none', transition: 'background .2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(135,206,52,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              KONTROLLPANEL
            </Link>
          </li>
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
        }}>
          {['OM', 'ROLLER', 'PROFIL', 'RESSURSER'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '13px',
                letterSpacing: '3px',
                color: 'var(--muted)',
                padding: '12px 0',
                borderBottom: '1px solid rgba(135,206,52,0.08)',
                textDecoration: 'none',
              }}
            >
              {item}
            </a>
          ))}
          <Link
            href="/kontrollpanel"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px', letterSpacing: '3px',
              color: 'var(--green)',
              padding: '12px 0',
              textDecoration: 'none',
            }}
          >
            KONTROLLPANEL
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        nav { padding: 16px 48px; }
        @media (max-width: 768px) {
          nav { padding: 14px 24px !important; }
        }
      `}</style>
    </>
  );
}
