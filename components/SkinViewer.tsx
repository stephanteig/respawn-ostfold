'use client';

import { useEffect, useRef, useState } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const STEVE_SKIN = `${BASE}/steve_skin.png`;

interface Props {
  username: string;
  width?: number;
  height?: number;
  animate?: boolean;
}

function initials(name: string): string {
  const clean = name.trim();
  if (!clean) return '?';
  return clean.slice(0, 2).toUpperCase();
}

export default function SkinViewer({ username, width = 120, height = 240, animate = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    let disposed = false;
    // skinview3d is browser-only — import dynamically to keep it out of SSR.
    let viewer: import('skinview3d').SkinViewer | null = null;

    setLoading(true);

    import('skinview3d')
      .then(({ SkinViewer: Viewer, WalkingAnimation }) => {
        if (disposed || !canvasRef.current) return;

        viewer = new Viewer({
          canvas: canvasRef.current,
          width,
          height,
        });

        if (animate) {
          viewer.animation = new WalkingAnimation();
        }

        const skinUrl = `https://mc-heads.net/skin/${encodeURIComponent(username)}`;
        viewer
          .loadSkin(skinUrl)
          .catch(() => viewer?.loadSkin(STEVE_SKIN).catch(() => {}))
          .finally(() => {
            if (!disposed) setLoading(false);
          });
      })
      .catch(() => {
        if (!disposed) setLoading(false);
      });

    return () => {
      disposed = true;
      viewer?.dispose();
    };
  }, [username, width, height, animate]);

  return (
    <div style={{ position: 'relative', width, height }}>
      {loading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(13,35,40,0.6)',
          border: '1px solid var(--forest)',
          fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
          fontSize: '14px',
          color: 'var(--green)',
          letterSpacing: '2px',
        }}>
          {initials(username)}
        </div>
      )}
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}
