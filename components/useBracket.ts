'use client';

import { useEffect, useState } from 'react';

const WS_BASE = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:3001'
  : 'wss://respawnostfold-production.up.railway.app';

export interface BracketMatch {
  p1: string; s1: string; p2: string; s2: string; winner: number;
}

export interface BracketRound {
  name: string;
  matches: BracketMatch[];
}

export interface BracketData {
  rounds: BracketRound[];
  champion: string;
}

export function useBracket(session = 'live'): BracketData | null {
  const [bracket, setBracket] = useState<BracketData | null>(null);

  useEffect(() => {
    let dead = false;
    let ws: WebSocket;
    let retryTimer: ReturnType<typeof setTimeout>;

    function connect() {
      if (dead) return;
      ws = new WebSocket(`${WS_BASE}?session=${encodeURIComponent(session)}&role=overlay`);

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data as string);
          if (msg.type === 'init' && msg.state?.bracket) {
            setBracket(msg.state.bracket as BracketData);
          } else if (msg.type === 'bracket' && msg.data) {
            setBracket(msg.data as BracketData);
          }
        } catch {}
      };

      ws.onclose = () => { if (!dead) retryTimer = setTimeout(connect, 3000); };
      ws.onerror = () => ws.close();
    }

    connect();
    return () => {
      dead = true;
      clearTimeout(retryTimer);
      ws?.close();
    };
  }, [session]);

  return bracket;
}
