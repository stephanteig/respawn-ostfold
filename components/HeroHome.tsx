'use client';

import Link from 'next/link';
import Countdown from './Countdown';

const PixelLogoSVG = () => (
  <svg
    width="110"
    height="110"
    viewBox="0 0 198.78 198.78"
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: 'pixelated' }}
    aria-label="Respawn Østfold logo ikon"
  >
    <rect width="198.78" height="198.78" fill="#102c31" />
    <rect x="27.87" y="27.87" width="143.04" height="143.04" fill="none" stroke="#87ce34" strokeWidth="5" strokeMiterlimit="10" />
    <rect x="21.37" y="21.37" width="13" height="13" fill="#87ce34" opacity=".4" />
    <rect x="164.41" y="21.37" width="13" height="13" fill="#87ce34" opacity=".4" />
    <rect x="21.37" y="164.41" width="13" height="13" fill="#87ce34" opacity=".4" />
    <rect x="164.41" y="164.41" width="13" height="13" fill="#87ce34" opacity=".4" />
    <rect x="44.13" y="44.13" width="110.53" height="110.53" fill="#1e4835" />
    <rect x="60.38" y="60.38" width="78.02" height="78.02" fill="#316364" />
    <rect x="76.64" y="76.64" width="45.51" height="45.51" fill="#87ce34" opacity=".8" />
    <rect x="89.64" y="89.64" width="19.51" height="19.51" fill="#fff" />
  </svg>
);

export default function HeroHome() {
  return (
    <div style={{
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '72px 24px 56px',
      position: 'relative',
    }}>
      {/* Pixel grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(135,206,52,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(135,206,52,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '24px', animation: 'fadeUp .6s .1s ease both' }}>
          <PixelLogoSVG />
        </div>

        <h1 style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(40px, 8vw, 84px)',
          letterSpacing: '8px',
          color: 'var(--white)',
          lineHeight: 1,
          animation: 'fadeUp .6s .2s ease both',
        }}>
          RESPAWN
        </h1>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(12px, 2vw, 16px)',
          letterSpacing: '8px',
          color: 'var(--green)',
          marginTop: '8px',
          animation: 'fadeUp .6s .25s ease both',
        }}>
          ØSTFOLD
        </p>

        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 20px)',
          color: 'var(--muted)',
          fontWeight: 600,
          letterSpacing: '1px',
          marginTop: '24px',
          animation: 'fadeUp .6s .3s ease both',
        }}>
          MCSR Ranked Speedrun-turnering
        </p>

        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(28px, 6vw, 54px)',
          letterSpacing: '4px',
          color: 'var(--white)',
          marginTop: '20px',
          animation: 'fadeUp .6s .35s ease both',
        }}>
          11. JUNI 2025
        </p>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(11px, 2vw, 14px)',
          letterSpacing: '3px',
          color: 'var(--portal)',
          marginTop: '10px',
          animation: 'fadeUp .6s .4s ease both',
        }}>
          GLEMMEN VGS · FREDRIKSTAD
        </p>

        <div style={{ margin: '44px 0', animation: 'fadeUp .6s .45s ease both' }}>
          <Countdown />
        </div>

        <div style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeUp .6s .5s ease both',
        }}>
          <Link
            href="/pamelding"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              letterSpacing: '4px',
              padding: '16px 40px',
              background: 'var(--green)',
              color: 'var(--dark)',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'background .2s, transform .15s, box-shadow .15s',
              display: 'inline-block',
              boxShadow: '0 4px 20px rgba(135,206,52,0.25)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-d)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(135,206,52,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(135,206,52,0.25)'; }}
          >
            MELD DEG PÅ
          </Link>
          <Link
            href="/stream"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px',
              letterSpacing: '3px',
              padding: '14px 28px',
              background: 'transparent',
              color: 'var(--green)',
              border: '1px solid rgba(135,206,52,0.6)',
              textDecoration: 'none',
              transition: 'background .2s, transform .15s, border-color .2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(135,206,52,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'rgba(135,206,52,0.9)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(135,206,52,0.6)'; }}
          >
            SE STREAM
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
