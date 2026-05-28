'use client';

import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import PageShell from '@/components/PageShell';
import PageHeading from '@/components/PageHeading';

// Påmelding stenger tirsdag 9. juni 2025, ved døgnets slutt (norsk tid).
const DEADLINE = new Date('2025-06-09T23:59:59+02:00').getTime();

const labelStyle: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '11px',
  letterSpacing: '2px',
  color: 'var(--portal)',
  marginBottom: '8px',
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--forest)',
  border: '1px solid rgba(135,206,52,0.25)',
  color: 'var(--white)',
  padding: '12px 14px',
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '14px',
  outline: 'none',
};

const errorStyle: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: '11px',
  letterSpacing: '1px',
  color: '#ff8a4c',
  marginTop: '6px',
  display: 'block',
};

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

export default function PameldingPage() {
  const [state, handleSubmit] = useForm('maqkvdpl');
  const [closed, setClosed] = useState<boolean | null>(null);

  useEffect(() => {
    setClosed(Date.now() > DEADLINE);
  }, []);

  return (
    <PageShell>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 48px 96px' }}>
        <PageHeading eyebrow="PÅMELDING" title="Meld deg på" />

        {/* Unngå hydrerings-mismatch: vent til vi vet om fristen er passert */}
        {closed === null ? (
          <div style={{ minHeight: '420px' }} aria-hidden="true" />
        ) : closed ? (
          <div style={{
            position: 'relative',
            border: '1px solid rgba(135,206,52,0.25)',
            background: 'rgba(30,72,53,0.3)',
            padding: '48px 40px',
            textAlign: 'center',
            maxWidth: '640px',
          }}>
            <CornerBrackets />
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 'clamp(16px, 3vw, 22px)',
              letterSpacing: '2px',
              color: 'var(--white)',
            }}>
              Påmelding er stengt.
            </p>
            <p style={{ marginTop: '12px', fontSize: '15px', color: 'var(--muted)', fontWeight: 600 }}>
              Påmeldingen stengte 9. juni. Bracket og kampoppsett finner du under Spillere.
            </p>
          </div>
        ) : state.succeeded ? (
          <div style={{
            position: 'relative',
            border: '1px solid var(--green)',
            background: 'rgba(135,206,52,0.08)',
            padding: '48px 40px',
            textAlign: 'center',
            maxWidth: '640px',
          }}>
            <CornerBrackets />
            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 'clamp(16px, 3vw, 22px)',
              letterSpacing: '2px',
              color: 'var(--green)',
            }}>
              Påmelding mottatt! Vi sender bekreftelse til e-posten din.
            </p>
          </div>
        ) : (
          <div style={{ position: 'relative', maxWidth: '640px', padding: '32px', border: '1px solid rgba(135,206,52,0.18)', background: 'rgba(16,44,49,0.6)' }}>
            <CornerBrackets />
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label htmlFor="navn" style={labelStyle}>FULLT NAVN *</label>
                <input id="navn" name="navn" type="text" required style={inputStyle} className="rp-input" />
                <ValidationError prefix="Navn" field="navn" errors={state.errors} style={errorStyle} />
              </div>
              <div>
                <label htmlFor="mcsr" style={labelStyle}>MCSR BRUKERNAVN *</label>
                <input id="mcsr" name="mcsr_brukernavn" type="text" required style={inputStyle} className="rp-input" />
                <ValidationError prefix="MCSR brukernavn" field="mcsr_brukernavn" errors={state.errors} style={errorStyle} />
              </div>
              <div>
                <label htmlFor="alder" style={labelStyle}>ALDER *</label>
                <input id="alder" name="alder" type="number" min={1} max={120} required style={inputStyle} className="rp-input" />
                <ValidationError prefix="Alder" field="alder" errors={state.errors} style={errorStyle} />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>E-POST *</label>
                <input id="email" name="email" type="email" required style={inputStyle} className="rp-input" />
                <ValidationError prefix="E-post" field="email" errors={state.errors} style={errorStyle} />
              </div>
              <div>
                <label htmlFor="erfaring" style={labelStyle}>KORT OM DEG / ERFARING</label>
                <textarea id="erfaring" name="erfaring" rows={4} style={{ ...inputStyle, resize: 'vertical' }} className="rp-input" />
                <ValidationError prefix="Erfaring" field="erfaring" errors={state.errors} style={errorStyle} />
              </div>

              <ValidationError errors={state.errors} style={errorStyle} />

              <button
                type="submit"
                disabled={state.submitting}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '4px',
                  padding: '16px 40px',
                  background: state.submitting ? 'rgba(135,206,52,0.5)' : 'var(--green)',
                  color: 'var(--bg)',
                  border: 'none',
                  cursor: state.submitting ? 'wait' : 'pointer',
                  fontWeight: 700,
                  alignSelf: 'flex-start',
                }}
              >
                {state.submitting ? 'Sender...' : 'SEND PÅMELDING'}
              </button>

              <p style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.7 }}>
                Påmelding stenger tirsdag 9. juni.<br />
                Bekreftelse sendes til oppgitt e-post.
              </p>
            </form>
          </div>
        )}
      </section>
      <style>{`
        .rp-input:focus { border-color: var(--green) !important; box-shadow: 0 0 0 1px var(--green); }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </PageShell>
  );
}
