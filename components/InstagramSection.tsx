const INSTAGRAM_URL = 'https://www.instagram.com/respawnostfold/';

/*
 * Instagram-feed via SnapWidget.
 * Når @respawnostfold-kontoen er opprettet og en SnapWidget er laget:
 *   1. Lag widget på https://snapwidget.com (Instagram, Grid, 6 poster)
 *   2. Bytt ut DINID i URL-en under med widget-ID-en du får
 *   3. Erstatt placeholder-boksen nedenfor med denne iframen:
 *
 *   <script src="https://snapwidget.com/js/snapwidget.js"></script>
 *   <iframe
 *     src="https://snapwidget.com/embed/DINID"
 *     className="snapwidget-widget"
 *     allowTransparency
 *     frameBorder="0"
 *     scrolling="no"
 *     style={{ border: 'none', overflow: 'hidden', width: '100%' }}
 *     title="Instagram-feed fra @respawnostfold"
 *   />
 */

export default function InstagramSection() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '12px',
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

      {/* Placeholder til SnapWidget-feed (se kommentar i kildekoden) */}
      <div style={{
        border: '1px dashed rgba(135,206,52,0.3)',
        background: 'rgba(30,72,53,0.25)',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '40px',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '13px',
          letterSpacing: '2px',
          color: 'var(--muted)',
        }}>
          Instagram feed lastes her
        </span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '10px',
          letterSpacing: '1px',
          color: 'rgba(122,172,174,0.5)',
        }}>
          SnapWidget-ID legges inn når @respawnostfold er opprettet
        </span>
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
