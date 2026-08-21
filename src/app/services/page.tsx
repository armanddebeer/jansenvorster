import type { Metadata } from "next";
import { ServicesContent } from "@/components/ServicesContent";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Services - Jansen & Vorster",
  description:
    "Eye screening, examinations, contact lenses, on-site laboratory, and low vision services.",
};

/**
 * Our Services page with full service catalogue content.
 */
export default function ServicesPage() {
  return (
    <SiteShell>
      <ServicesContent />
    </SiteShell>
  );
}
