import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import InfoStrip from '@/components/InfoStrip';
import SectionOm from '@/components/SectionOm';
import SectionRoller from '@/components/SectionRoller';
import SectionProfil from '@/components/SectionProfil';
import SectionRessurser from '@/components/SectionRessurser';
import Footer from '@/components/Footer';

const SectionDivider = () => (
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
    <hr style={{ border: 'none', borderTop: '1px solid rgba(135,206,52,0.12)' }} />
  </div>
);

export default function Home() {
  return (
    <>
      {/* Corner brackets (fixed, full viewport) */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 998 }}>
        {[
          { top: 16, left: 16, borderWidth: '3px 0 0 3px' },
          { top: 16, right: 16, borderWidth: '3px 3px 0 0' },
          { bottom: 16, left: 16, borderWidth: '0 0 3px 3px' },
          { bottom: 16, right: 16, borderWidth: '0 3px 3px 0' },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...pos,
            width: 32,
            height: 32,
            borderColor: 'var(--green)',
            borderStyle: 'solid',
          }} />
        ))}
      </div>

      <Nav />
      <main>
        <Hero />
        <InfoStrip />
        <SectionOm />
        <SectionDivider />
        <SectionRoller />
        <SectionDivider />
        <SectionProfil />
        <SectionDivider />
        <SectionRessurser />
      </main>
      <Footer />
    </>
  );
}
