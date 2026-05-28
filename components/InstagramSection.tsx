const INSTAGRAM_URL = 'https://www.instagram.com/respawnostfold/';

export default function InstagramSection() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
        fontSize: '8px',
        letterSpacing: '2px',
        lineHeight: 1.6,
        color: 'var(--green)',
        marginBottom: '14px',
      }}>
        02 / INSTAGRAM
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '32px',
      }}>
        Følg oss
      </h2>

      {/* SnapWidget Instagram-feed for @respawnostfold */}
      {/* TODO: Bytt SNAPWIDGET_ID_HER med ID fra snapwidget.com */}
      <div style={{ border: '1px solid rgba(135,206,52,0.2)', background: 'rgba(30,72,53,0.25)' }}>
        <iframe
          src="https://snapwidget.com/embed/SNAPWIDGET_ID_HER"
          className="snapwidget-widget"
          allowTransparency
          frameBorder="0"
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden', width: '100%', minHeight: '400px' }}
          title="Instagram-feed fra @respawnostfold"
        />
      </div>

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px',
            letterSpacing: '3px',
            padding: '14px 32px',
            border: '1px solid rgba(135,206,52,0.6)',
            color: 'var(--green)',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background .2s, border-color .2s',
          }}
        >
          FØLG @RESPAWNOSTFOLD
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
