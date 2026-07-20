import { Hero3D } from '@/components/hero-3d';
import { Navbar } from '@/components/navbar';
import { StorySection } from '@/components/story-section';
import { PortalGrid } from '@/components/portal-grid';
import { ParallaxDivider } from '@/components/parallax-divider';
import { ExperienceSection } from '@/components/experience-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-[#f4ecd8]">
      <Navbar />
      <Hero3D />
      <StorySection />
      <ExperienceSection />
      <ParallaxDivider />
      <PortalGrid />
      <Footer />
    </main>
  );
}
