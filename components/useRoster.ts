'use client';

import { useSyncExternalStore } from 'react';
import type { Player } from './PlayerCard';

export type RosterCategory = 'players' | 'commentators' | 'guests';

export const ROSTER_KEYS: Record<RosterCategory, string> = {
  players: 'respawn_players',
  commentators: 'respawn_commentators',
  guests: 'respawn_guests',
};

export const ROSTER_FILES: Record<RosterCategory, string> = {
  players: 'players.json',
  commentators: 'commentators.json',
  guests: 'guests.json',
};

// Same-tab updates (storage events only fire in *other* tabs).
export const ROSTER_EVENT = 'roster-change';

function parseRoster(raw: string | null): Player[] | null {
  if (raw == null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return (parsed as Player[]).filter((p) => p && typeof p.username === 'string' && p.username.trim() !== '');
  } catch {
    return null;
  }
}

// Cache keeps getSnapshot returning a stable reference until the raw string changes.
const cache: Record<string, { raw: string | null; value: Player[] }> = {};

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(ROSTER_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(ROSTER_EVENT, callback);
  };
}

export function readRoster(category: RosterCategory): Player[] | null {
  try {
    return parseRoster(localStorage.getItem(ROSTER_KEYS[category]));
  } catch {
    return null;
  }
}

export function writeRoster(category: RosterCategory, roster: Player[]) {
  try {
    localStorage.setItem(ROSTER_KEYS[category], JSON.stringify(roster));
    window.dispatchEvent(new Event(ROSTER_EVENT));
  } catch {}
}

// Reads from localStorage when present, otherwise the deployed JSON (`initial`).
export function useRoster(category: RosterCategory, initial: Player[]): Player[] {
  const key = ROSTER_KEYS[category];

  const getSnapshot = (): Player[] => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(key);
    } catch {}
    const cached = cache[key];
    if (cached && cached.raw === raw) return cached.value;
    const value = parseRoster(raw) ?? initial;
    cache[key] = { raw, value };
    return value;
  };

  const getServerSnapshot = (): Player[] => initial;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
