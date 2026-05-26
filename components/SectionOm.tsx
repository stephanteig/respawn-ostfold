import StaticImage from './StaticImage';


const cards = [
  {
    accent: 'var(--green)',
    titleColor: 'var(--green)',
    title: 'FORMAT',
    body: 'MCSR Ranked — det offisielle Minecraft speedrun-systemet. Spillere konkurrerer 1v1 om å beate spillet raskest. Ranked format, som chess.com men for Minecraft.',
  },
  {
    accent: 'var(--portal)',
    titleColor: 'var(--portal)',
    title: 'PREMIE',
    body: 'Cash prize til vinneren, finansiert av lokale sponsorer. Ekte stakes, ekte turnering. Vi søker aktive støttespillere — ta kontakt hvis du eller din bedrift vil bidra.',
  },
  {
    accent: 'var(--teal)',
    titleColor: 'var(--muted)',
    title: 'SENDING',
    body: 'Hele turneringen sendes live på Twitch med profesjonelle overlays, live bracket, spillerstatistikk, kommentatorer og intervju-scenes bygget fra bunnen av.',
  },
];

const screenshots: { src: string; alt: string; caption: string }[] = [
  {
    src: '/screenshots/obs_multistream.png',
    alt: 'Respawn Østfold 1v1 multistream overlay med PLAYER_ONE vs PLAYER_TWO',
    caption: 'Live 1v1 multistream — slik ser sendingen ut på Twitch',
  },
  {
    src: '/screenshots/obs_interview.png',
    alt: 'Intervju-scene med kommentator og spillerpanel med 3D Minecraft skin',
    caption: 'Intervju-scene — ARON FOLKESTAD + STIFFEL_ med ELO og rank',
  },
  {
    src: '/screenshots/obs_countdown.png',
    alt: 'Countdown overlay — 30:00 nedtelling, MCSR RANKED TURNERING',
    caption: 'Countdown overlay — streamen starter om 30:00',
  },
  {
    src: '/screenshots/obs_bracket_overlay.png',
    alt: 'Bracket-display overlay i OBS — SINGLE ELIMINATION',
    caption: 'Live bracket — SINGLE ELIMINATION turnering',
  },
];

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

      {/* Screenshots */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px',
      }}>
        {screenshots.map((s) => (
          <div key={s.src} className="screenshot-wrap">
            <StaticImage
              src={s.src}
              alt={s.alt}
              width={1456}
              height={816}
              className="screenshot"
              style={{ width: '100%', height: 'auto' }}
            />
            <p className="screenshot-caption">{s.caption}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #om { padding: 60px 24px !important; }
        }
      `}</style>
    </section>
  );
}
