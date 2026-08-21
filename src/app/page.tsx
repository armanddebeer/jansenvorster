import { BrandsSection } from "@/components/BrandsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { ImportantMessage } from "@/components/ImportantMessage";
import { SiteShell } from "@/components/SiteShell";
import { WhoWeAre } from "@/components/WhoWeAre";
import { FEATURES, HOME_BRANDS } from "@/lib/site-data";

/**
 * Homepage assembled from extracted Jansen & Vorster sections (1:1 visual clone).
 */
export default function Home() {
  return (
    <SiteShell>
      <HeroSection
        title="PASSIONATE ABOUT EYES & EYE CARE"
        ctaLabel="GET IN TOUCH WITH US"
        ctaHref="/contact-us"
      />
      <ImportantMessage
        title="Important Message"
        body="Our West Beach branch merged with our Melkbosstrand branch. For any West Beach inquiries, please contact our Melkbos Branch on 021 553 2153 or email at"
        email="melkbos@jansenvorster.co.za"
      />
      <WhoWeAre
        title="WHO WE ARE"
        body="Jansen Vorster Optometrists is owned and managed by two qualified optometrists namely Mr. Frederik Jansen and Mrs. Mandre Vorster. We operate from two practices that are situated in Melkbosstrand, and Atlantis Cape Town respectively. We are passionate about eyes and understand that your eyes are an integral part of connecting you to the visual world."
      />
      <FeaturesSection items={FEATURES} />
      <BrandsSection
        title="BRANDS"
        body="We stock various well-known brands that are personally selected by the Jansen Vorster team. Our main goal is to spend sufficient time with each patient to ensure the correct style of frame is selected."
        brands={HOME_BRANDS}
      />
    </SiteShell>
  );
}
