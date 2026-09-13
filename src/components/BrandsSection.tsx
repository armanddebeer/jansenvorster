"use client";

import Image from "next/image";
import type { TBrandLogo } from "@/types/site";
import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";

type TBrandsSectionProps = {
  brands: TBrandLogo[];
};

/**
 * Brands intro + calm logo grid. Logos sit with breathing room between cells.
 */
export function BrandsSection({ brands }: TBrandsSectionProps) {
  const { t } = useI18n();

  return (
    <section className="w-full bg-[#fdfcfb] py-20 sm:py-28">
      <div className="jv-container">
        <FadeIn className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="jv-kicker mb-4">{t.brands.kicker}</p>
          <h2 className="jv-display mb-6 text-4xl sm:text-5xl">{t.brands.title}</h2>
          <p className="text-[17px] font-light leading-8">{t.brands.homeBody}</p>
        </FadeIn>

        <ul className="mx-auto grid max-w-[1140px] grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
