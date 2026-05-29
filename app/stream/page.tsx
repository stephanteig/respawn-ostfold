import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Stream — Respawn Østfold',
  description: 'Respawn Østfold streames live 11. juni 2026. Følg turneringen direkte.',
};

export default function StreamPage() {
  return (
    <PageShell>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="STREAM" title="Turneringen streames live 11. juni" />

        {/*
          Stream-embed placeholder.
          Bytt ut SRC-en under når streamlinken er klar:
            Twitch:  https://player.twitch.tv/?channel=KANALNAVN&parent=stephanteig.github.io
            YouTube: https://www.youtube.com/embed/VIDEO_ID
          Erstatt deretter placeholder-boksen med en <iframe> som bruker denne SRC-en.
        */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          aspectRatio: '16 / 9',
          border: '1px solid rgba(135,206,52,0.25)',
          background: 'rgba(10,31,35,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          textAlign: 'center',
          padding: '32px',
        }}>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(13px, 2.5vw, 18px)',
            letterSpacing: '3px',
            color: 'var(--green)',
          }}>
            STREAM STARTER 11. JUNI
          </span>
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px',
            letterSpacing: '2px',
            color: 'rgba(122,172,174,0.6)',
          }}>
            Embed (Twitch / YouTube) legges inn når streamlinken er klar
          </span>
        </div>

        <div style={{ marginTop: '32px', maxWidth: '720px' }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'var(--portal)',
            marginBottom: '10px',
          }}>
            STARTTID
          </p>
          <p style={{ fontSize: '16px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.8 }}>
            Turneringen starter 11. juni kl. 12:00. Eksakt sendingsstart oppdateres her når
            programmet er spikret.
          </p>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </PageShell>
  );
}
