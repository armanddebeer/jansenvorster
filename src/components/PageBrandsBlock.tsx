import Image from "next/image";
import type { TBrandLogo } from "@/types/site";

type TPageBrandsBlockProps = {
  title?: string;
  body: string;
  brands: TBrandLogo[];
  showTitle?: boolean;
};

/**
 * Left-aligned brands intro + 5-column logo grid used on About and Brands pages.
 */
export function PageBrandsBlock({
  title = "BRANDS",
  body,
  brands,
  showTitle = true,
}: TPageBrandsBlockProps) {
  return (
    <section className="w-full bg-white pb-12 pt-2">
      <div className="jv-container">
        {showTitle ? (
          <h1 className="mb-4 font-[family-name:var(--font-roboto)] text-[26px] font-semibold leading-[1.2] text-black uppercase sm:text-[34.16px]">
            {title}
          </h1>
        ) : null}
        <p className="mb-8 max-w-[900px] font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-black">
          {body}
        </p>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-5">
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
