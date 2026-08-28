import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FieldGrid } from "@/components/home/FieldGrid";
import { FeaturedResearch } from "@/components/home/FeaturedResearch";
import { HoursSection } from "@/components/home/HoursSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FieldGrid />
      <FeaturedResearch />
      <HoursSection />
      <ProcessSection />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
