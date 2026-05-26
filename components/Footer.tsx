export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(135,206,52,0.12)' }} />
      </div>
      <footer style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'var(--muted)',
        }}>
          <span style={{ color: 'var(--green)' }}>RESPAWN</span>{' '}ØSTFOLD
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '9px',
          letterSpacing: '2px',
          color: 'rgba(122,172,174,0.4)',
          textAlign: 'right',
        }}>
          © {year} · GLEMMEN VGS · FREDRIKSTAD · MCSR RANKED
        </div>
      </footer>
      <style>{`
        @media (max-width: 768px) {
          footer { padding: 24px !important; flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}
