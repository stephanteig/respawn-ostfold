'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'respawn_player_count';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '0';
  } catch {
    return '0';
  }
}

function getServerSnapshot(): string {
  return '0';
}

export default function PlayerCountDisplay() {
  // SSR-safe localStorage read; re-renders on cross-tab storage events.
  const count = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{count}</>;
}
