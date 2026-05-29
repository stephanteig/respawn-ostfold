import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Om turneringen — Respawn Østfold',
  description: 'Hva er Respawn Østfold, hva er MCSR Ranked, turneringsformatet og tidslinjen frem mot 11. juni 2026.',
};

const sectionStyle: React.CSSProperties = { marginBottom: '48px' };
const h2Style: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: 'clamp(18px, 3vw, 26px)',
  letterSpacing: '2px',
  color: 'var(--green)',
  marginBottom: '16px',
};
const pStyle: React.CSSProperties = {
  fontSize: '16px',
  color: 'var(--muted)',
  lineHeight: 1.8,
  fontWeight: 600,
  maxWidth: '720px',
};

const timeline = [
  { date: '29. mai', text: 'Påmelding åpner' },
  { date: '9. juni', text: 'Påmelding stenger' },
  { date: '11. juni', text: 'Turneringen spilles' },
];

export default function OmPage() {
  return (
    <PageShell>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="OM TURNERINGEN" title="Respawn Østfold" />

        <div style={sectionStyle}>
          <h2 style={h2Style}>Hva er Respawn Østfold</h2>
          <p style={pStyle}>
            Respawn Østfold er Østfolds første Minecraft esports-turnering, arrangert fra Glemmen VGS
            i Fredrikstad. Målet er å samle speedrun-miljøet i regionen til en proff, livestreamet
            konkurranse — med ordentlig produksjon, cash prize og full innlevelse.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Hva er MCSR Ranked</h2>
          <p style={pStyle}>
            MCSR Ranked (Minecraft Speedrunning Ranked) er et 1v1 rangert speedrun-system der to
            spillere får identiske verdener og kappes om å fullføre spillet — beseire Enderdragen —
            raskest mulig. Den som når målet først, vinner runden.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Turneringsformat</h2>
          <p style={pStyle}>
            Turneringen spilles som en bracket online. Hver kamp er en 1v1 speedrun-duell, og
            vinnerne går videre gjennom bracketen til én spiller står igjen som mester. Alt sendes
            live på stream.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Tidslinje</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '520px' }}>
            {timeline.map((t) => (
              <div key={t.date} style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'baseline',
                background: 'var(--forest)',
                borderLeft: '3px solid var(--green)',
                padding: '18px 24px',
              }}>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '14px',
                  letterSpacing: '2px',
                  color: 'var(--green)',
                  minWidth: '90px',
                }}>
                  {t.date}
                </span>
                <span style={{ fontSize: '15px', color: 'var(--white)', fontWeight: 600 }}>
                  {t.text}
                </span>
              </div>
            ))}
          </div>
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
