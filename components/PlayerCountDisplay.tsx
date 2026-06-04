'use client';

import { useRoster } from './useRoster';
import playersSeed from '@/public/data/players.json';

export default function PlayerCountDisplay() {
  const players = useRoster('players', playersSeed);
  return <>{players.length}</>;
}
