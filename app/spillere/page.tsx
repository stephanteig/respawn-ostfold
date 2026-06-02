import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';
import PlayerCard, { type Player } from '@/components/PlayerCard';
import PlayerCountDisplay from '@/components/PlayerCountDisplay';
import playersData from '@/public/data/players.json';

export const metadata: Metadata = {
  title: 'Spillere & bracket — Respawn Østfold',
  description: 'Bracket og seeding for Respawn Østfold publiseres etter at påmeldingen stenger 9. juni.',
};

const REGISTRATION_DEADLINE = new Date('2026-06-09T23:59:59+02:00');

function loadPlayers(): Player[] {
  if (!Array.isArray(playersData)) return [];
  return (playersData as Player[]).filter((p) => p && typeof p.username === 'string' && p.username.trim() !== '');
}

export default function SpillerePage() {
  const players = loadPlayers();
  const registrationOpen = new Date() < REGISTRATION_DEADLINE;

  return (
    <PageShell>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
        {players.length === 0 ? (
          <>
            <PageHeading eyebrow="SPILLERE & BRACKET" title="Bracket" />

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
          </>
        ) : (
          <>
            <PageHeading eyebrow="SPILLERE & BRACKET" title={`${players.length} spillere`} />

            <div className="player-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              {players.map((p) => (
                <PlayerCard key={p.username} {...p} />
              ))}
            </div>
          </>
        )}
      </section>
      <style>{`
        @media (max-width: 1024px) {
          .player-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .player-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageShell>
  );
}
