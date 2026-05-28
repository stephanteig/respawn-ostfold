const PARTNER_EMAIL = 'teig.stephan@gmail.com';

export default function SponsorsSection() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        03 / PARTNERE
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '40px',
      }}>
        Partnere
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'center',
      }}>
        {/* KRED-logo placeholder — bytt ut med ekte logofil i /public når tilgjengelig */}
        <div style={{
          border: '1px solid rgba(135,206,52,0.25)',
          background: 'rgba(30,72,53,0.4)',
          padding: '36px 56px',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '24px',
          letterSpacing: '6px',
          color: 'var(--white)',
        }}>
          KRED
        </div>
      </div>

      <p style={{
        marginTop: '36px',
        fontSize: '14px',
        color: 'var(--muted)',
        fontWeight: 600,
        lineHeight: 1.7,
      }}>
        Interessert i å bli partner?{' '}
        <a href={`mailto:${PARTNER_EMAIL}`} style={{ color: 'var(--green)', textDecoration: 'none' }}>
          {PARTNER_EMAIL}
        </a>
      </p>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
