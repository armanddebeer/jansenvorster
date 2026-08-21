import Image from "next/image";
import type { TBrandLogo } from "@/types/site";

type TBrandsSectionProps = {
  title: string;
  body: string;
  brands: TBrandLogo[];
};

/**
 * Brands intro + 5-column logo grid (208px cells) matching Elementor image widgets.
 */
export function BrandsSection({ title, body, brands }: TBrandsSectionProps) {
  return (
    <section className="w-full bg-white pt-12 pb-10 sm:pt-[75px]">
      <div className="jv-container">
        <div className="mx-auto mb-[30px] max-w-[900px] text-center">
          <h2 className="mb-5 font-[family-name:var(--font-roboto)] text-[26px] font-medium leading-[1.2] text-black uppercase sm:mb-[30px] sm:text-[34.16px] sm:leading-[40.992px]">
            {title}
          </h2>
          <p className="px-2 font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-black sm:px-[25px]">
            {body}
          </p>
        </div>

        <ul className="mx-auto grid max-w-[1140px] grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-5">
          {brands.map((brand) => (
            <li key={brand.name} className="flex items-center justify-center">
              <div className="relative h-[110px] w-[110px] sm:h-[180px] sm:w-[180px] lg:h-[208px] lg:w-[208px]">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  sizes="208px"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
