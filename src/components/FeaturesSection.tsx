import { FeatureIcon, type TFeatureIconName } from "@/components/icons";
import type { TFeatureItem } from "@/types/site";

type TFeaturesSectionProps = {
  items: TFeatureItem[];
  /** Background token — homepage uses feature grey; why-choose-us uses white. */
  backgroundClassName?: string;
};

/**
 * Four framed icon boxes matching Elementor icon-box widgets.
 */
export function FeaturesSection({
  items,
  backgroundClassName = "bg-jv-feature-bg",
}: TFeaturesSectionProps) {
  return (
    <section className={`w-full px-1 pt-10 pb-12 sm:pt-[50px] sm:pb-[65px] ${backgroundClassName}`}>
      <div className="jv-container">
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col items-center px-2 text-center sm:px-[15px]">
              <div className="mb-[15px] flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-jv-accent p-7 text-jv-accent transition-transform duration-300 hover:scale-[1.03] sm:h-[146px] sm:w-[146px] sm:p-[35px]">
                <FeatureIcon
                  name={item.icon as TFeatureIconName}
                  className="text-[56px] leading-none sm:text-[70px]"
                />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-roboto)] text-[18px] font-bold leading-snug text-black uppercase sm:text-[21.84px] sm:leading-[26.208px]">
                {item.title}
              </h3>
              <p className="max-w-[265px] font-[family-name:var(--font-poppins)] text-[14px] font-light leading-6 text-black">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
