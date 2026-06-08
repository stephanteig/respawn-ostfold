'use client';

import SkinViewer from './SkinViewer';

export const TBD_SKIN_USERNAME = 'UnsolvedX';

export interface Player {
  username: string;
  displayName?: string;
  seed?: number;
  rank?: string;
  elo?: number;
  pb?: string;
  avgTime?: string;
  tbd?: boolean;
}

interface Props extends Player {
  showSkin?: boolean;
}

function rankColor(rank: string = '') {
  const r = rank.toLowerCase();
  if (r.includes('emerald')) return '#50C878';
  if (r.includes('diamond')) return '#5BE5FF';
  if (r.includes('platinum')) return '#9BD4D4';
  if (r.includes('gold')) return '#FFD700';
  if (r.includes('silver')) return '#C0C0C0';
  if (r.includes('bronze')) return '#CD7F32';
  return 'var(--muted)';
}

function CornerBrackets() {
  return (
    <>
      {[
        { top: -1, left: -1, borderWidth: '2px 0 0 2px' },
        { top: -1, right: -1, borderWidth: '2px 2px 0 0' },
        { bottom: -1, left: -1, borderWidth: '0 0 2px 2px' },
        { bottom: -1, right: -1, borderWidth: '0 2px 2px 0' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          width: 16,
          height: 16,
          borderColor: 'var(--green)',
          borderStyle: 'solid',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  );
}

export default function PlayerCard({ username, displayName, seed, rank, elo, pb, avgTime, tbd, showSkin = true }: Props) {
  const name = tbd ? 'TBD' : (displayName || username);
  const skinUsername = tbd ? TBD_SKIN_USERNAME : username;
  const color = rank ? rankColor(rank) : 'var(--muted)';

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      border: '1px solid rgba(135,206,52,0.18)',
      background: 'rgba(16,44,49,0.6)',
      padding: '24px',
    }}>
      <CornerBrackets />

      {showSkin && (
        <div style={{ flexShrink: 0 }}>
          <SkinViewer username={skinUsername} width={100} height={180} animate />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0, flex: 1 }}>
        {/* MCSR Ranked navn */}
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '18px',
          letterSpacing: '1px',
          color: 'var(--white)',
          wordBreak: 'break-word',
        }}>
          {tbd ? 'TBD' : username}
        </span>

        {/* Fullt navn */}
        {displayName && !tbd && (
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px',
            letterSpacing: '1px',
            color: 'var(--muted)',
          }}>
            {displayName}
          </span>
        )}

        {/* Seed */}
        {seed !== undefined && (
          <span style={{
            alignSelf: 'flex-start',
            fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
            fontSize: '8px',
            letterSpacing: '1px',
            color: 'var(--green)',
            border: '1px solid rgba(135,206,52,0.4)',
            padding: '5px 8px',
          }}>
            SEED #{seed}
          </span>
        )}

        {/* Rank + ELO */}
        {(rank || elo !== undefined) && !tbd && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {rank && (
              <span style={{
                fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
                fontSize: '8px',
                letterSpacing: '1px',
                color: color,
                border: `1px solid ${color}55`,
                padding: '5px 8px',
              }}>
                {rank.toUpperCase()}
              </span>
            )}
            {elo !== undefined && (
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                color: color,
                opacity: 0.85,
              }}>
                {elo} ELO
              </span>
            )}
          </div>
        )}

        {/* Stats: PB og AVG */}
        {(pb || avgTime) && !tbd && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: pb && avgTime ? '1fr 1fr' : '1fr',
            gap: '8px',
            marginTop: '4px',
          }}>
            {pb && (
              <div style={{
                background: 'rgba(135,206,52,0.06)',
                border: '1px solid rgba(135,206,52,0.15)',
                padding: '6px 10px',
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: 'var(--muted)',
                  letterSpacing: '1px',
                  marginBottom: '4px',
                }}>
                  PB
                </div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '14px',
                  color: 'var(--white)',
                  letterSpacing: '1px',
                }}>
                  {pb}
                </div>
              </div>
            )}
            {avgTime && (
              <div style={{
                background: 'rgba(135,206,52,0.06)',
                border: '1px solid rgba(135,206,52,0.15)',
                padding: '6px 10px',
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: 'var(--muted)',
                  letterSpacing: '1px',
                  marginBottom: '4px',
                }}>
                  AVG
                </div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '14px',
                  color: 'var(--white)',
                  letterSpacing: '1px',
                }}>
                  {avgTime}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
