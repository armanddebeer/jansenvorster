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
 * Why Choose Us — feature tiles + request-a-callback form.
 */
export default function WhyChooseUsPage() {
  return (
    <SiteShell>
      <FeaturesSection items={FEATURES} />
      <CallbackForm />
    </SiteShell>
  );
}
