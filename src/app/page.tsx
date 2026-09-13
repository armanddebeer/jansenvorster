import { BrandsSection } from "@/components/BrandsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { ImportantMessage } from "@/components/ImportantMessage";
import { SiteShell } from "@/components/SiteShell";
import { WhoWeAre } from "@/components/WhoWeAre";
import { FEATURES, HOME_BRANDS } from "@/lib/site-data";

/**
 * Homepage — same JV copy and PDF amendments, restyled.
 */
export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <ImportantMessage />
      <WhoWeAre />
      <FeaturesSection items={FEATURES} />
      <BrandsSection brands={HOME_BRANDS} />
    </SiteShell>
  );
}
