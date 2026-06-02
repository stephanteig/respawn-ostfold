import PlayerCountDisplay from './PlayerCountDisplay';

const cards = [
  {
    label: 'FORMAT',
    title: 'MCSR Ranked',
    desc: 'Bracket-turnering spilt online. 1v1 speedrun-dueller til vinneren står igjen.',
  },
  {
    label: 'PREMIE',
    title: 'Cash prize',
    desc: 'Annonseres snart. Spill om heder, ære og kontanter.',
  },
  {
    label: 'DATO',
    title: '11. juni',
    desc: 'Turneringen går av stabelen 11. juni. Påmelding stenger 9. juni.',
  },
];

const cardStyle: React.CSSProperties = {
  background: 'var(--forest)',
  padding: '36px 28px',
  borderTop: '3px solid var(--green)',
};
const cardLabel: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '10px',
  letterSpacing: '4px',
  color: 'var(--portal)',
  marginBottom: '14px',
};
const cardTitle: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '22px',
  letterSpacing: '1px',
  color: 'var(--white)',
  marginBottom: '12px',
};

export default function TournamentInfo() {
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2px',
      }}>
        {cards.map((c) => (
          <div key={c.label} style={cardStyle}>
            <div style={cardLabel}>{c.label}</div>
            <div style={cardTitle}>{c.title}</div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 600 }}>
              {c.desc}
            </p>
          </div>
        ))}

        <div style={cardStyle}>
          <div style={cardLabel}>SPILLERE</div>
          <div style={{ ...cardTitle, fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace", fontSize: '26px' }}>
            <PlayerCountDisplay />
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 600 }}>
            Påmeldte spillere så langt. Meld deg på før 9. juni.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .info-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .info-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
