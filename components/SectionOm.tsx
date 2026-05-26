import ImgPlaceholder from './ImgPlaceholder';

const cards = [
  {
    accent: 'var(--green)',
    titleColor: 'var(--green)',
    title: 'FORMAT',
    body: 'MCSR Ranked — det offisielle Minecraft speedrun-systemet. Spillere konkurrerer 1v1 om å beate spillet raskest. Ranked format, som chess.com men for Minecraft.',
    placeholder: 'obs_multistream.png — 1v1 multistream PLAYER_ONE vs PLAYER_TWO',
  },
  {
    accent: 'var(--portal)',
    titleColor: 'var(--portal)',
    title: 'PREMIE',
    body: 'Cash prize til vinneren, finansiert av lokale sponsorer. Ekte stakes, ekte turnering. Vi søker aktive støttespillere — ta kontakt hvis du eller din bedrift vil bidra.',
    placeholder: 'obs_bracket.png — Bracket-panel kvartfinale/semifinale/finale',
  },
  {
    accent: 'var(--teal)',
    titleColor: 'var(--muted)',
    title: 'SENDING',
    body: 'Hele turneringen sendes live på Twitch med profesjonelle overlays, live bracket, spillerstatistikk, kommentatorer og intervju-scenes bygget fra bunnen av.',
    placeholder: 'obs_countdown.png — Countdown overlay 30:00 MCSR RANKED TURNERING',
  },
];

const SectionDivider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid rgba(135,206,52,0.12)' }} />
);

export default function SectionOm() {
  return (
    <section id="om" style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 48px' }}>
      <p style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '9px',
        letterSpacing: '4px',
        color: 'var(--green)',
        marginBottom: '12px',
      }}>
        01 / OM TURNERINGEN
      </p>
      <h2 style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(22px, 4vw, 36px)',
        letterSpacing: '3px',
        color: 'var(--white)',
        marginBottom: '48px',
      }}>
        Hva er Respawn Østfold?
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2px',
        marginBottom: '40px',
      }}>
        {cards.map((card) => (
          <div key={card.title} style={{
            background: 'var(--forest)',
            padding: '32px 28px',
            borderTop: `3px solid ${card.accent}`,
          }}>
            <h3 style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              letterSpacing: '2px',
              color: card.titleColor,
              marginBottom: '10px',
            }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 600 }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Screenshot placeholders */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px',
      }}>
        <ImgPlaceholder caption="obs_multistream.png — 1v1 multistream layout" />
        <ImgPlaceholder caption="obs_interview.png — Intervju-scene med ELO/rank" />
        <ImgPlaceholder caption="obs_countdown.png — Countdown 30:00" />
        <ImgPlaceholder caption="obs_bracket.png — Bracket-panel" />
      </div>

      <style>{`
        @media (max-width: 768px) {
          #om { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
