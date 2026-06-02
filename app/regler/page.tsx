import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Regler — Respawn Østfold',
  description: 'Reglene for Respawn Østfold — MCSR Ranked, Any% Glitchless. Spørsmål? Bli med i vår Discord.',
};

const DISCORD_URL = 'https://discord.gg/gT6BfWdUZ';

const rules = [
  'Alle runs må følge Minecraft Any% Glitchless-reglene',
  'Kun Sodium og MCSR Ranked-modden er tillatt',
  'Ikke modifiser klienten eller forsøk å jukse',
  'Ikke bruk alternative kontoer',
  'Ikke streamsnipe eller motta hjelp under runs',
  'Macros for å bytte skjermstørrelse er tillatt',
  'Ninjabrain Bot Calculator er tillatt for stronghold-lokalisering',
  'Vis god sportsånd og respekt for andre deltakere',
];

function CornerBrackets() {
  return (
    <>
      {[
        { top: -1, left: -1, borderWidth: '2px 0 0 2px' },
        { top: -1, right: -1, borderWidth: '2px 2px 0 0' },
        { bottom: -1, left: -1, borderWidth: '0 0 2px 2px' },
        { bottom: -1, right: -1, borderWidth: '0 2px 2px 0' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          width: 18,
          height: 18,
          borderColor: 'var(--green)',
          borderStyle: 'solid',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  );
}

export default function ReglerPage() {
  return (
    <PageShell>
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="MCSR RANKED · ANY% GLITCHLESS" title="Regler" />

        <div style={{
          position: 'relative',
          border: '1px solid rgba(135,206,52,0.18)',
          background: 'rgba(16,44,49,0.6)',
          padding: '40px 36px',
        }}>
          <CornerBrackets />
          <ol style={{
            listStyle: 'none',
            counterReset: 'rule',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            margin: 0,
            padding: 0,
          }}>
            {rules.map((rule, i) => (
              <li key={i} style={{ display: 'flex', gap: '18px', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
                  fontSize: '12px',
                  color: 'var(--green)',
                  minWidth: '34px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '16px', color: 'var(--white)', fontWeight: 600, lineHeight: 1.7 }}>
                  {rule}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ marginTop: '40px' }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'var(--portal)',
            marginBottom: '14px',
          }}>
            SPØRSMÅL?
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              letterSpacing: '2px',
              padding: '14px 32px',
              background: 'var(--green)',
              color: 'var(--dark)',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            BLI MED I VÅR DISCORD →
          </a>
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
