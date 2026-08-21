import Link from "next/link";

type THeroSectionProps = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
};

/**
 * Full-bleed hero matching the Revolution Slider single-slide layout.
 */
export function HeroSection({ title, ctaLabel, ctaHref }: THeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-3 py-12 sm:min-h-[360px] sm:px-4 md:h-[400px] md:py-0 lg:h-[450px]"
      style={{ backgroundImage: "url(/images/hero-glasses.webp)" }}
      aria-label="Hero"
    >
      <div className="relative z-10 flex w-full max-w-[1140px] flex-col items-center text-center">
        <h2 className="mb-5 max-w-[20ch] text-balance text-center font-[family-name:var(--font-poppins)] text-[22px] font-light leading-snug text-white sm:mb-6 sm:max-w-none sm:whitespace-nowrap sm:text-[35px] sm:leading-[70px] md:text-[45px] lg:text-[56px] lg:leading-[70px]">
          {title}
        </h2>
        <Link
          href={ctaHref}
          className="inline-flex min-h-[48px] items-center justify-center rounded-[3px] bg-jv-cta px-6 py-3 text-center font-[family-name:var(--font-poppins)] text-[15px] font-medium leading-tight text-white transition-colors duration-300 hover:bg-[#d63d1f] sm:h-[55px] sm:px-[35px] sm:text-[18px] sm:leading-[30px] sm:whitespace-nowrap"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
