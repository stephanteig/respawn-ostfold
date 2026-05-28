import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Respawn Østfold — Ressurser',
  description: 'Pitch-presentasjon, logoer, profilguide og lenker for Respawn Østfold.',
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const GAMMA_URL = 'https://gamma.app/docs/Ostfolds-forste-Minecraft-esports-turnering-t11byix06w66flz';
const INSTAGRAM_URL = 'https://www.instagram.com/respawnostfold/';
const SITE_URL = 'https://stephanteig.github.io/respawn-ostfold';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
  fontSize: '8px',
  letterSpacing: '2px',
  lineHeight: 1.6,
  color: 'var(--green)',
  marginBottom: '18px',
};

// Reelle filer i /public — koblet via NEXT_PUBLIC_BASE_PATH.
const downloads = [
  { label: 'Logo', file: '/logo-2.png', type: 'PNG' },
  { label: 'Logo-pakke', file: '/downloads/logo-pakke.zip', type: 'ZIP' },
  { label: 'Profilguide', file: '/downloads/profilguide.pdf', type: 'PDF' },
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

function Section({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative',
      border: '1px solid rgba(135,206,52,0.18)',
      background: 'rgba(16,44,49,0.6)',
      padding: '36px 32px',
      marginBottom: '28px',
    }}>
      <CornerBrackets />
      <p style={eyebrowStyle}>{eyebrow}</p>
      {children}
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '13px',
  letterSpacing: '1px',
  color: 'var(--green)',
  textDecoration: 'none',
};

export default function ProfilPage() {
  return (
    <PageShell>
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="INTERN RESSURSSIDE" title="Respawn Østfold — Ressurser" />

        {/* 1 — PITCH */}
        <Section eyebrow="01 / PITCH">
          <a
            href={GAMMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '14px',
              letterSpacing: '2px',
              padding: '14px 28px',
              background: 'var(--green)',
              color: 'var(--bg)',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            ÅPNE PITCH-PRESENTASJON →
          </a>
          <p style={{ marginTop: '16px', fontSize: '15px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.7 }}>
            Pitch-presentasjon for sponsorer og samarbeidspartnere.
          </p>
        </Section>

        {/* 2 — NEDLASTNINGER */}
        <Section eyebrow="02 / NEDLASTNINGER">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {downloads.map((d) => (
              <a
                key={d.file}
                href={`${BASE}${d.file}`}
                download
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  border: '1px solid rgba(135,206,52,0.4)',
                  background: 'var(--forest)',
                  padding: '16px 22px',
                  minWidth: '180px',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '14px',
                  letterSpacing: '1px',
                  color: 'var(--white)',
                }}>
                  ⤓ {d.label}
                </span>
                <span style={{
                  fontFamily: "'Press Start 2P', 'Share Tech Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '1px',
                  color: 'var(--portal)',
                }}>
                  {d.file.split('/').pop()} · {d.type}
                </span>
              </a>
            ))}
          </div>
        </Section>

        {/* 3 — LENKER */}
        <Section eyebrow="03 / LENKER">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '10px' }}>Nettside:</span>
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                stephanteig.github.io/respawn-ostfold
              </a>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '10px' }}>Instagram:</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                @respawnostfold
              </a>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '10px' }}>Kontrollpanel:</span>
              <Link href="/kontrollpanel" style={linkStyle}>/kontrollpanel</Link>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '10px' }}>Docs:</span>
              <Link href="/docs" style={linkStyle}>/docs</Link>
            </div>
          </div>
        </Section>
      </section>
      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </PageShell>
  );
}
