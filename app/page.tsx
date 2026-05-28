import PageShell from '@/components/PageShell';
import HeroHome from '@/components/HeroHome';
import TournamentInfo from '@/components/TournamentInfo';
import InstagramSection from '@/components/InstagramSection';
import SponsorsSection from '@/components/SponsorsSection';

const SectionDivider = () => (
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
    <hr style={{ border: 'none', borderTop: '1px solid rgba(135,206,52,0.12)' }} />
  </div>
);

export default function Home() {
  return (
    <PageShell>
      <HeroHome />
      <TournamentInfo />
      <SectionDivider />
      <InstagramSection />
      <SectionDivider />
      <SponsorsSection />
    </PageShell>
  );
}
