import StaticImage from './StaticImage';

const swatches = [
  { name: 'RESPAWN GREEN', hex: '#87CE34', bg: '#87CE34' },
  { name: 'GREEN DARK',    hex: '#6EC836', bg: '#6EC836' },
  { name: 'DEEP BG',       hex: '#102C31', bg: '#102C31' },
  { name: 'FOREST',        hex: '#1E4835', bg: '#1E4835' },
  { name: 'DEEP TEAL',     hex: '#316364', bg: '#316364' },
  { name: 'PORTAL TEAL',   hex: '#1D9E75', bg: '#1D9E75' },
];

const fonts = [
  {
    accent: 'var(--green)',
    titleColor: 'var(--green)',
    title: 'PIXER',
    body: 'Primær pixel-font for all tekst unntatt Ø. Samme stil som MCSR Ranked sin brand font. Last ned fra Fontfabric.',
  },
  {
    accent: 'var(--portal)',
    titleColor: 'var(--portal)',
    title: 'PRESS START 2P',
    body: 'Brukes kun for tegnet Ø i logotypen. Google Fonts — gratis nedlasting.',
  },
  {
    accent: 'var(--teal)',
    titleColor: 'var(--muted)',
    title: 'FALLBACK',
    body: 'Share Tech Mono eller Courier New for digitale flater der Pixer ikke er tilgjengelig.',
  },
];

export default function SectionProfil() {
  return (
    <section id="profil" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        03 / BRAND &amp; PROFIL
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '16px',
      }}>
        Profilguide
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '15px', fontWeight: 600, marginBottom: '40px', maxWidth: '560px', lineHeight: 1.7 }}>
        All visuell kommunikasjon for Respawn Østfold følger disse retningslinjene. Bruk alltid godkjente farger, fonter og logoer.
      </p>

      {/* Color palette */}
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '20px',
      }}>
        FARGEPALETT
      </p>
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '48px',
      }}>
        {swatches.map((s) => (
          <div key={s.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: s.bg,
              border: '1px solid rgba(255,255,255,0.08)',
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '9px',
              letterSpacing: '1px',
              color: 'var(--muted)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}>
              {s.name}
            </span>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '10px',
              color: 'var(--green)',
            }}>
              {s.hex}
            </span>
          </div>
        ))}
      </div>

      {/* Fonts */}
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '20px',
      }}>
        FONTER
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px',
        marginBottom: '48px',
      }}>
        {fonts.map((f) => (
          <div key={f.title} style={{
            background: 'var(--forest)',
            padding: '32px 28px',
            borderTop: `3px solid ${f.accent}`,
          }}>
            <h3 style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              letterSpacing: '2px',
              color: f.titleColor,
              marginBottom: '10px',
            }}>
              {f.title}
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 600, maxWidth: '65ch' }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>

      {/* Logos */}
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '20px',
      }}>
        LOGOTYPER
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px',
      }}>
        <div style={{
          background: '#0A1F23',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          borderTop: '3px solid rgba(135,206,52,0.3)',
          border: '1px solid rgba(135,206,52,0.15)',
          borderTopWidth: '3px',
        }}>
          <StaticImage
            src="/logo-2.png"
            alt="Respawn Østfold horisontal logo"
            width={300}
            height={120}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '2px',
            color: 'var(--muted)',
          }}>
            HORISONTAL LOGO (PRIMÆR)
          </span>
        </div>
        <div style={{
          background: '#0A1F23',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          borderTop: '3px solid rgba(135,206,52,0.3)',
          border: '1px solid rgba(135,206,52,0.15)',
          borderTopWidth: '3px',
        }}>
          <StaticImage
            src="/logo-1.png"
            alt="Respawn Østfold ikon logo"
            width={100}
            height={100}
            style={{ imageRendering: 'pixelated' }}
          />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '9px',
            letterSpacing: '2px',
            color: 'var(--muted)',
          }}>
            IKON-LOGO (SEKUNDÆR)
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #profil { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
