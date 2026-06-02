'use client';

import SkinViewer from './SkinViewer';

export interface Player {
  username: string;
  displayName?: string;
  seed?: number;
  info?: string;
}

interface Props extends Player {
  showSkin?: boolean;
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

export default function PlayerCard({ username, displayName, seed, info, showSkin = true }: Props) {
  const name = displayName || username;

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
          <SkinViewer username={username} width={120} height={200} animate />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '20px',
          letterSpacing: '1px',
          color: 'var(--white)',
          wordBreak: 'break-word',
        }}>
          {name}
        </span>

        {displayName && (
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '12px',
            letterSpacing: '1px',
            color: 'var(--muted)',
          }}>
            #{username}
          </span>
        )}

        {seed !== undefined && (
          <span style={{
            alignSelf: 'flex-start',
            fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
            fontSize: '8px',
            letterSpacing: '1px',
            color: 'var(--green)',
            border: '1px solid rgba(135,206,52,0.4)',
            padding: '6px 10px',
          }}>
            SEED #{seed}
          </span>
        )}

        {info && (
          <p style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            {info}
          </p>
        )}
      </div>
    </div>
  );
}
