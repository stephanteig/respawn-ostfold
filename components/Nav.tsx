'use client';

import { useState } from 'react';
import Image from 'next/image';

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
          <Image
            src="/logo-1.svg"
            alt="Respawn Østfold logo ikon"
            width={36}
            height={36}
            style={{ imageRendering: 'pixelated' }}
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
