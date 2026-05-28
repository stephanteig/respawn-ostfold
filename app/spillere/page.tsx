import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Spillere & bracket — Respawn Østfold',
  description: 'Bracket og seeding for Respawn Østfold publiseres etter at påmeldingen stenger 9. juni.',
};

export default function SpillerePage() {
  return (
    <PageShell>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="SPILLERE & BRACKET" title="Bracket" />

        <div style={{
          border: '1px solid rgba(135,206,52,0.25)',
          background: 'rgba(30,72,53,0.3)',
          padding: '48px 40px',
          textAlign: 'center',
          maxWidth: '720px',
        }}>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(15px, 2.5vw, 20px)',
            letterSpacing: '2px',
            color: 'var(--white)',
            lineHeight: 1.6,
            marginBottom: '12px',
          }}>
            Bracket publiseres etter at påmelding stenger 9. juni
          </p>
          <p style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.7 }}>
            Når påmeldingen er stengt setter vi opp seeding og kampoppsett her. Følg med!
          </p>

          <div style={{ marginTop: '32px' }}>
            <Link
              href="/pamelding"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '12px',
                letterSpacing: '3px',
                padding: '14px 32px',
                background: 'var(--green)',
                color: 'var(--dark)',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              MELD DEG PÅ
            </Link>
          </div>
        </div>

        {/*
          Etter påmeldingsfrist: erstatt boksen over med en bracketvisning.
          Et statisk grid med spillernavn og seeding fungerer fint for static export, f.eks.:

          <div className="bracket-grid"> ...runder med <BracketMatch seed1 name1 seed2 name2 /> ... </div>
        */}
      </section>
      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </PageShell>
  );
}
