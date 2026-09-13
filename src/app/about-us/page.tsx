import type { Metadata } from "next";

import { AboutContent } from "@/components/AboutContent";
import { PageBrandsBlock } from "@/components/PageBrandsBlock";
import { SiteShell } from "@/components/SiteShell";
import { PAGE_BRANDS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us - Jansen & Vorster",
  description:
    "Jansen Vorster Optometrists — owned and managed by Mr. Frederik Jansen and Mrs. Mandre Vorster.",
};

/**
 * About Us — large two-column band plus the brands grid.
 */
export default function AboutUsPage() {
  return (
    <SiteShell>
      <AboutContent />
      <PageBrandsBlock brands={PAGE_BRANDS} />
    </SiteShell>
  );
}
