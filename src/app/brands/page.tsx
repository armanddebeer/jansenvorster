import type { Metadata } from "next";
import { PageBrandsBlock } from "@/components/PageBrandsBlock";
import { SiteShell } from "@/components/SiteShell";
import { BRANDS_INTRO, PAGE_BRANDS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Brands - Jansen & Vorster",
  description:
    "We stock various well-known eyewear brands personally selected by the Jansen Vorster team.",
};

/**
 * Brands page — left-aligned intro and logo grid.
 */
export default function BrandsPage() {
  return (
    <SiteShell>
      <div className="pt-10">
        <PageBrandsBlock body={BRANDS_INTRO} brands={PAGE_BRANDS} />
      </div>
    </SiteShell>
  );
}
