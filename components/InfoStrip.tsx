const items = [
  { label: 'FORMAT',   val: 'MCSR RANKED' },
  { label: 'LOKASJON', val: 'GLEMMEN VGS' },
  { label: 'PREMIE',   val: 'CASH PRIZE' },
  { label: 'SENDING',  val: 'TWITCH LIVE' },
  { label: 'SPILLERE', val: 'ONLINE' },
];

export default function InfoStrip() {
  return (
    <>
      <div style={{
        borderTop: '1px solid rgba(135,206,52,0.12)',
        borderBottom: '1px solid rgba(135,206,52,0.12)',
        background: 'rgba(30,72,53,0.25)',
        padding: '28px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
      }}>
        {items.map((item, i) => (
          <div key={item.label} style={{ display: 'contents' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '9px',
                letterSpacing: '3px',
                color: 'var(--portal)',
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '13px',
                color: 'var(--white)',
                letterSpacing: '1px',
              }}>
                {item.val}
              </span>
            </div>
            {i < items.length - 1 && (
              <div style={{
                width: '1px',
                height: '32px',
                background: 'rgba(135,206,52,0.25)',
                flexShrink: 0,
              }} className="info-sep" />
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .info-sep { display: none; }
        }
      `}</style>
    </>
  );
}
