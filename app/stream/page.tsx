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

        <p style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(13px, 2.5vw, 18px)',
          letterSpacing: '3px',
          color: 'var(--green)',
          marginBottom: '20px',
        }}>
          STREAM STARTER 11. JUNI 2026 KL 13:00
        </p>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          aspectRatio: '16 / 9',
          border: '1px solid rgba(135,206,52,0.25)',
          background: 'rgba(10,31,35,0.8)',
        }}>
          <iframe
            src="https://player.twitch.tv/?channel=respawnostfold&parent=stephanteig.github.io"
            allowFullScreen
            title="Respawn Østfold Live Stream"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginTop: '24px' }}>
          <a
            href="https://www.twitch.tv/respawnostfold"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px',
              letterSpacing: '3px',
              padding: '14px 32px',
              border: '1px solid rgba(135,206,52,0.6)',
              color: 'var(--green)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            ÅPNE STREAM PÅ TWITCH →
          </a>
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
            Turneringen starter 11. juni 2026 kl. 13:00. Følg sendingen direkte her eller på Twitch.
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
