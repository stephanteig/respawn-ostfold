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
        padding: '20px 48px',
        borderBottom: '1px solid rgba(135,206,52,0.15)',
        position: 'sticky',
        top: 0,
        background: 'rgba(16,44,49,0.97)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <StaticImage
            src="/logo-1.png"
            alt="Respawn Østfold logo ikon"
            width={40}
            height={40}
            style={{ imageRendering: 'pixelated', width: 40, height: 40 }}
          />
          <div style={{ fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.2 }}>
            <div style={{ color: 'var(--white)', letterSpacing: '3px', fontSize: '15px' }}>RESPAWN</div>
            <div style={{ color: 'var(--green)', letterSpacing: '5px', fontSize: '11px' }}>ØSTFOLD</div>
          </div>
        </a>

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
            <a
              href="https://stephanteig.github.io/respawn-ostfold/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px', letterSpacing: '2px',
                padding: '6px 14px',
                border: '1px solid rgba(135,206,52,0.45)',
                color: 'var(--green)',
                textDecoration: 'none', transition: 'background .2s, border-color .2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(135,206,52,0.10)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(135,206,52,0.7)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(135,206,52,0.45)'; }}
            >
              DOCS
            </a>
          </li>
          <li>
            <Link
              href="/kontrollpanel"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px', letterSpacing: '2px',
                padding: '6px 14px',
                background: 'rgba(135,206,52,0.08)',
                border: '1px solid rgba(135,206,52,0.6)',
                color: 'var(--green)',
                textDecoration: 'none', transition: 'background .2s, border-color .2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(135,206,52,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(135,206,52,0.9)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(135,206,52,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(135,206,52,0.6)'; }}
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
          <a
            href="https://stephanteig.github.io/respawn-ostfold/docs"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px', letterSpacing: '3px',
              color: 'var(--green)',
              padding: '12px 0',
              borderBottom: '1px solid rgba(135,206,52,0.08)',
              textDecoration: 'none',
            }}
          >
            DOCS
          </a>
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
        nav { padding: 20px 48px; }
        @media (max-width: 768px) {
          nav { padding: 16px 24px !important; }
        }
      `}</style>
    </>
  );
}
