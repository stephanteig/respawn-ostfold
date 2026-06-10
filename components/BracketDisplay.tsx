'use client';

import { useBracket, type BracketMatch, type BracketRound } from './useBracket';

function MatchCard({ match }: { match: BracketMatch }) {
  const { p1, s1, p2, s2, winner } = match;
  const empty = !p1 && !p2;

  const rowStyle = (side: 1 | 2): React.CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    background: winner === side ? 'rgba(135,206,52,0.12)' : 'transparent',
    borderLeft: winner === side ? '2px solid var(--green)' : '2px solid transparent',
    gap: '12px',
  });

  const nameStyle = (side: 1 | 2): React.CSSProperties => ({
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px',
    letterSpacing: '1px',
    color: winner === side ? 'var(--green)' : empty ? 'rgba(255,255,255,0.2)' : 'var(--white)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  });

  const scoreStyle = (side: 1 | 2): React.CSSProperties => ({
    fontFamily: "'Press Start 2P', monospace",
    fontSize: '11px',
    color: winner === side ? 'var(--green)' : 'var(--muted)',
    minWidth: '16px',
    textAlign: 'right',
  });

  return (
    <div style={{
      border: '1px solid rgba(135,206,52,0.2)',
      background: 'rgba(16,44,49,0.8)',
      minWidth: '180px',
      maxWidth: '220px',
      width: '100%',
    }}>
      <div style={rowStyle(1)}>
        <span style={nameStyle(1)}>{p1 || 'TBD'}</span>
        {(s1 !== '' || winner !== 0) && <span style={scoreStyle(1)}>{s1}</span>}
      </div>
      <div style={{ height: '1px', background: 'rgba(135,206,52,0.1)' }} />
      <div style={rowStyle(2)}>
        <span style={nameStyle(2)}>{p2 || 'TBD'}</span>
        {(s2 !== '' || winner !== 0) && <span style={scoreStyle(2)}>{s2}</span>}
      </div>
    </div>
  );
}

function RoundColumn({ round }: { round: BracketRound }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'var(--portal)',
        marginBottom: '4px',
      }}>
        {round.name}
      </span>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        justifyContent: 'space-around',
        flex: 1,
      }}>
        {round.matches.map((m, i) => (
          <MatchCard key={i} match={m} />
        ))}
      </div>
    </div>
  );
}

export default function BracketDisplay() {
  const bracket = useBracket();

  const hasData = bracket && bracket.rounds.some(r =>
    r.matches.some(m => m.p1 || m.p2)
  );

  if (!hasData) {
    return (
      <div style={{
        border: '1px solid rgba(135,206,52,0.15)',
        background: 'rgba(30,72,53,0.2)',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '480px',
      }}>
        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '13px',
          letterSpacing: '2px',
          color: 'var(--muted)',
        }}>
          BRACKET PUBLISERES SNART
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        {bracket.rounds.map((round, i) => (
          <RoundColumn key={i} round={round} />
        ))}
      </div>

      {bracket.champion && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          border: '1px solid rgba(135,206,52,0.4)',
          background: 'rgba(135,206,52,0.06)',
          maxWidth: 'fit-content',
        }}>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--portal)',
          }}>
            TURNERINGSVINNER
          </span>
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(14px, 2.5vw, 20px)',
            color: 'var(--green)',
          }}>
            {bracket.champion}
          </span>
        </div>
      )}
    </div>
  );
}
