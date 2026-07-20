import { Hero3D }          from '@/components/hero-3d';
import { Navbar }           from '@/components/navbar';
import { RealmCarousel }    from '@/components/realm-carousel';
import { MarqueeTicker }    from '@/components/marquee-ticker';
import { KonkanMap }        from '@/components/konkan-map';
import { StorySection }     from '@/components/story-section';
import { ExperienceSection } from '@/components/experience-section';
import { ParallaxDivider }  from '@/components/parallax-divider';
import { PortalGrid }       from '@/components/portal-grid';
import { Footer }           from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />
      <Hero3D />
      <RealmCarousel />
      <MarqueeTicker />
      <KonkanMap />
      <StorySection />
      <ExperienceSection />
      <ParallaxDivider />
      <PortalGrid />
      <Footer />
    </main>
  );
}
