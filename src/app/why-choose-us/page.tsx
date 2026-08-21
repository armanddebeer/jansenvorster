import type { Metadata } from "next";
import { CallbackForm } from "@/components/CallbackForm";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SiteShell } from "@/components/SiteShell";
import { FEATURES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Why Choose Us - Jansen & Vorster",
  description:
    "One year guarantee, pensioner packages, onsite laboratory, and medical aid support.",
};

/**
 * Why Choose Us — feature icons + request-a-callback form.
 */
export default function WhyChooseUsPage() {
  return (
    <SiteShell>
      <div className="pt-6">
        <FeaturesSection items={FEATURES} backgroundClassName="bg-white" />
      </div>
      <CallbackForm />
    </SiteShell>
  );
}
