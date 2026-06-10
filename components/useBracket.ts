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

// Handles both old format (p1: {name, seed, score}) and new format (p1: string, s1: string)
function normalizeMatch(m: Record<string, unknown>): BracketMatch {
  const p1raw = m.p1;
  const p2raw = m.p2;
  const isOld = typeof p1raw === 'object' && p1raw !== null;
  const p1obj = isOld ? (p1raw as Record<string, unknown>) : null;
  const p2obj = isOld ? (p2raw as Record<string, unknown>) : null;
  return {
    p1: isOld ? String(p1obj?.name ?? '') : String(p1raw ?? ''),
    s1: isOld ? String(p1obj?.score ?? '') : String(m.s1 ?? ''),
    p2: isOld ? String(p2obj?.name ?? '') : String(p2raw ?? ''),
    s2: isOld ? String(p2obj?.score ?? '') : String(m.s2 ?? ''),
    winner: Number(m.winner) || 0,
  };
}

function normalizeBracket(data: Record<string, unknown>): BracketData {
  const rounds = Array.isArray(data.rounds) ? data.rounds : [];
  return {
    rounds: rounds.map((r: Record<string, unknown>) => ({
      name: String(r.name ?? ''),
      matches: Array.isArray(r.matches) ? r.matches.map(normalizeMatch) : [],
    })),
    champion: String(data.champion ?? ''),
  };
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
            setBracket(normalizeBracket(msg.state.bracket as Record<string, unknown>));
          } else if (msg.type === 'bracket' && msg.data) {
            setBracket(normalizeBracket(msg.data as Record<string, unknown>));
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
