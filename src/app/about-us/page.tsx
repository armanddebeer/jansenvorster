import Image from "next/image";
import type { Metadata } from "next";
import { PageBrandsBlock } from "@/components/PageBrandsBlock";
import { SiteShell } from "@/components/SiteShell";
import { ABOUT_PARAGRAPHS, BRANDS_INTRO, PAGE_BRANDS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us - Jansen & Vorster",
  description:
    "Jansen Vorster Optometrists — owned and managed by Mr. Frederik Jansen and Mrs. Mandre Vorster.",
};

/**
 * About Us page — two-column intro + brands block matching the live site.
 */
export default function AboutUsPage() {
  return (
    <SiteShell>
      <section className="w-full bg-white pt-10 pb-8">
        <div className="jv-container">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1 className="mb-5 font-[family-name:var(--font-roboto)] text-[26px] font-semibold text-black uppercase sm:text-[34.16px]">
                ABOUT US
              </h1>
              {ABOUT_PARAGRAPHS.map((p) => (
                <p
                  key={p.slice(0, 48)}
                  className="mb-4 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-black"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="relative mx-auto aspect-[1024/512] w-full max-w-[520px] lg:max-w-none">
              <Image
                src="/images/about-glasses.jpg"
                alt="Ray-Ban style eyeglasses"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
            </div>
          </div>
          <hr className="mt-10 border-0 border-t border-[#ddd]" />
        </div>
      </section>

      <PageBrandsBlock body={BRANDS_INTRO} brands={PAGE_BRANDS} />
    </SiteShell>
  );
}
