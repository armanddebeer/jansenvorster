"use client";

import Image from "next/image";
import type { TBrandLogo } from "@/types/site";
import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";

type TPageBrandsBlockProps = {
  brands: TBrandLogo[];
  showTitle?: boolean;
};

/**
 * Left-aligned brands intro + logo grid for About and Brands pages.
 */
export function PageBrandsBlock({
  brands,
  showTitle = true,
}: TPageBrandsBlockProps) {
  const { t } = useI18n();

  return (
    <section className="w-full bg-[#fdfcfb] py-16 sm:py-20">
      <div className="jv-container">
        <FadeIn className="mb-12 max-w-[720px]">
          {showTitle ? (
            <h2 className="jv-display mb-5 text-4xl sm:text-5xl">{t.brands.title}</h2>
          ) : null}
          <p className="text-[17px] font-light leading-8">{t.brands.pageBody}</p>
        </FadeIn>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <li key={brand.name} className="flex items-center justify-center">
              <div className="relative h-20 w-full max-w-[168px] sm:h-24">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  sizes="180px"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
