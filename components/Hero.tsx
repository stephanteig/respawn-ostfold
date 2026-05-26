'use client';

const PixelLogoSVG = () => (
  <svg
    width="100"
    height="100"
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

const badges = ['GLEMMEN VGS', 'FREDRIKSTAD', 'MCSR RANKED', 'CASH PRIZE', 'LIVE PÅ TWITCH'];

export default function Hero() {
  return (
    <div style={{
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 60px',
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

      {/* Corner brackets */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[
          { top: 24, left: 24, borderWidth: '2px 0 0 2px' },
          { top: 24, right: 24, borderWidth: '2px 2px 0 0' },
          { bottom: 24, left: 24, borderWidth: '0 0 2px 2px' },
          { bottom: 24, right: 24, borderWidth: '0 2px 2px 0' },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...pos,
            width: 24,
            height: 24,
            borderColor: 'var(--green)',
            borderStyle: 'solid',
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '10px',
          letterSpacing: '5px',
          color: 'var(--portal)',
          marginBottom: '28px',
          animation: 'fadeUp .6s ease both',
        }}>
          MCSR RANKED · CASH PRIZE TOURNAMENT
        </p>

        <div style={{
          marginBottom: '32px',
          animation: 'fadeUp .6s .1s ease both',
        }}>
          <PixelLogoSVG />
        </div>

        <h1 style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(42px, 8vw, 88px)',
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

        {/* Diamond divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '32px auto',
          width: '320px',
          animation: 'fadeUp .6s .3s ease both',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(135,206,52,0.3)' }} />
          <div style={{
            width: '8px',
            height: '8px',
            background: 'var(--green)',
            transform: 'rotate(45deg)',
            flexShrink: 0,
          }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(135,206,52,0.3)' }} />
        </div>

        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 19px)',
          color: 'var(--muted)',
          maxWidth: '580px',
          lineHeight: 1.65,
          fontWeight: 600,
          animation: 'fadeUp .6s .35s ease both',
        }}>
          Østfolds første Minecraft esports-turnering. MCSR Ranked speedrun-format, cash prize og livestreamet på Twitch.
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '28px',
          animation: 'fadeUp .6s .4s ease both',
        }}>
          {badges.map((badge) => (
            <span key={badge} style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '10px',
              letterSpacing: '2px',
              padding: '6px 14px',
              border: '1px solid rgba(135,206,52,0.35)',
              color: 'var(--muted)',
              background: 'rgba(30,72,53,0.4)',
            }}>
              {badge}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: '44px',
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeUp .6s .45s ease both',
        }}>
          <a
            href="#roller"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px',
              letterSpacing: '3px',
              padding: '14px 32px',
              background: 'var(--green)',
              color: 'var(--dark)',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'background .2s, transform .15s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-d)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            BLI MED PÅ LAGET
          </a>
          <a
            href="#om"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px',
              letterSpacing: '3px',
              padding: '13px 32px',
              background: 'transparent',
              color: 'var(--green)',
              border: '1px solid var(--green)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background .2s, transform .15s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(135,206,52,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            LES MER
          </a>
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
