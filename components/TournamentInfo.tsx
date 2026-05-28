const cards = [
  {
    label: 'FORMAT',
    title: 'MCSR Ranked',
    desc: 'Bracket-turnering spilt online. 1v1 speedrun-dueller til vinneren står igjen.',
  },
  {
    label: 'PREMIE',
    title: 'Cash Prize',
    desc: 'Pengepremie til vinneren. Spill om heder, ære og kontanter.',
  },
  {
    label: 'DATO',
    title: '11. juni',
    desc: 'Turneringen går av stabelen 11. juni. Påmelding stenger 9. juni.',
  },
];

export default function TournamentInfo() {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '5px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        01 / TURNERINGEN
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '48px',
      }}>
        Kort fortalt
      </h2>

      <div className="info-cards" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
      }}>
        {cards.map((c) => (
          <div key={c.label} style={{
            background: 'var(--forest)',
            padding: '36px 28px',
            borderTop: '3px solid var(--green)',
          }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '10px',
              letterSpacing: '4px',
              color: 'var(--portal)',
              marginBottom: '14px',
            }}>
              {c.label}
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '22px',
              letterSpacing: '1px',
              color: 'var(--white)',
              marginBottom: '12px',
            }}>
              {c.title}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 600 }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .info-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
