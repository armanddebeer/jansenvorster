import type { Metadata } from "next";
import { PageBrandsBlock } from "@/components/PageBrandsBlock";
import { SiteShell } from "@/components/SiteShell";
import { PAGE_BRANDS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Brands - Jansen & Vorster",
  description:
    "We stock well-known eyewear brands, personally selected by the Jansen Vorster team.",
};

/**
 * Brands page — left-aligned intro and logo grid.
 */
export default function BrandsPage() {
  return (
    <SiteShell>
      <PageBrandsBlock brands={PAGE_BRANDS} />
    </SiteShell>
  );
}
