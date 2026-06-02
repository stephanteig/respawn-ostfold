'use client';

import Link from 'next/link';
import PageHeading from './PageHeading';
import PlayerCard, { type Player } from './PlayerCard';
import PlayerCountDisplay from './PlayerCountDisplay';
import { useRoster } from './useRoster';

const REGISTRATION_DEADLINE = new Date('2026-06-09T23:59:59+02:00');

interface Props {
  players: Player[];
  commentators: Player[];
  guests: Player[];
}

function Grid({ roster }: { roster: Player[] }) {
  return (
    <div className="player-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    }}>
      {roster.map((p, i) => (
        <PlayerCard key={`${p.username}-${i}`} {...p} />
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 'clamp(18px, 3vw, 26px)',
      letterSpacing: '2px',
      color: 'var(--green)',
      margin: '56px 0 24px',
    }}>
      {children}
    </h2>
  );
}

export default function SpillereView({ players: pInit, commentators: cInit, guests: gInit }: Props) {
  const players = useRoster('players', pInit);
  const commentators = useRoster('commentators', cInit);
  const guests = useRoster('guests', gInit);

  const registrationOpen = new Date() < REGISTRATION_DEADLINE;
  const hasAny = players.length > 0 || commentators.length > 0 || guests.length > 0;

  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
      <PageHeading eyebrow="SPILLERE & BRACKET" title={players.length > 0 ? `${players.length} spillere` : 'Bracket'} />

      {players.length > 0 ? (
        <Grid roster={players} />
      ) : (
        <div style={{
          border: '1px solid rgba(135,206,52,0.25)',
          background: 'rgba(30,72,53,0.3)',
          padding: '48px 40px',
          textAlign: 'center',
          maxWidth: '720px',
        }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(15px, 2.5vw, 20px)',
            letterSpacing: '2px',
            color: 'var(--white)',
            lineHeight: 1.6,
            marginBottom: '12px',
          }}>
            Bracket publiseres etter at påmelding stenger 9. juni
          </p>
          <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.7 }}>
            Når påmeldingen er stengt setter vi opp seeding og kampoppsett her. Følg med!
          </p>

          <p style={{
            marginTop: '24px',
            fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
            fontSize: '20px',
            color: 'var(--green)',
          }}>
            <PlayerCountDisplay /> <span style={{ fontSize: '11px', color: 'var(--muted)' }}>PÅMELDTE</span>
          </p>

          {registrationOpen && (
            <div style={{ marginTop: '28px' }}>
              <Link
                href="/pamelding"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '3px',
                  padding: '14px 32px',
                  background: 'var(--green)',
                  color: 'var(--dark)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                MELD DEG PÅ
              </Link>
            </div>
          )}
        </div>
      )}

      {commentators.length > 0 && (
        <>
          <SectionTitle>Kommentatorer</SectionTitle>
          <Grid roster={commentators} />
        </>
      )}

      {guests.length > 0 && (
        <>
          <SectionTitle>Gjester</SectionTitle>
          <Grid roster={guests} />
        </>
      )}

      {!hasAny && null}

      <style>{`
        @media (max-width: 1024px) {
          .player-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .player-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
