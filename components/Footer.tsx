import Link from 'next/link';
import StaticImage from './StaticImage';

const navLinks = [
  { label: 'Hjem', href: '/' },
  { label: 'Om', href: '/om' },
  { label: 'Spillere', href: '/spillere' },
  { label: 'Påmelding', href: '/pamelding' },
  { label: 'Stream', href: '/stream' },
];

const INSTAGRAM_URL = 'https://www.instagram.com/respawnostfold/';
const EMAIL = 'teig.stephan@gmail.com';

export default function Footer() {
  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
        <hr style={{ border: 'none', borderTop: '2px solid rgba(135,206,52,0.15)' }} />
      </div>
      <footer style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px',
      }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Left: logo + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StaticImage
                src="/logo-1.png"
                alt="Respawn Østfold logo ikon"
                width={36}
                height={36}
                style={{ imageRendering: 'pixelated', width: 36, height: 36 }}
              />
              <div style={{ fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.2 }}>
                <div style={{ color: 'var(--white)', letterSpacing: '3px', fontSize: '14px' }}>RESPAWN</div>
                <div style={{ color: 'var(--green)', letterSpacing: '5px', fontSize: '10px' }}>ØSTFOLD</div>
              </div>
            </div>
            <p style={{
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              fontWeight: 600,
              maxWidth: '240px',
            }}>
              Østfolds første MCSR Ranked speedrun-turnering.
            </p>
          </div>

          {/* Middle: nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '2px',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: socials + email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--green)', textDecoration: 'none' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', letterSpacing: '2px' }}>
                @respawnostfold
              </span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                letterSpacing: '1px',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(135,206,52,0.1)',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'rgba(122,172,174,0.5)',
        }}>
          © 2025 Respawn Østfold · Glemmen VGS
        </div>
      </footer>
      <style>{`
        @media (max-width: 768px) {
          footer { padding: 32px 24px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </>
  );
}
