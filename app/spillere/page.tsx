import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import SpillereView from '@/components/SpillereView';
import { type Player } from '@/components/PlayerCard';
import playersData from '@/public/data/players.json';
import commentatorsData from '@/public/data/commentators.json';
import guestsData from '@/public/data/guests.json';

export const metadata: Metadata = {
  title: 'Spillere & bracket — Respawn Østfold',
  description: 'Spillere, kommentatorer og gjester for Respawn Østfold. Bracket publiseres etter at påmeldingen stenger 9. juni.',
};

function clean(data: unknown): Player[] {
  if (!Array.isArray(data)) return [];
  return (data as Player[]).filter((p) => p && typeof p.username === 'string' && p.username.trim() !== '');
}

export default function SpillerePage() {
  return (
    <PageShell>
      <SpillereView
        players={clean(playersData)}
        commentators={clean(commentatorsData)}
        guests={clean(guestsData)}
      />
    </PageShell>
  );
}
