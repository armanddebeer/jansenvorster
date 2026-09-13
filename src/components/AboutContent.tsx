"use client";

import Image from "next/image";
import { useI18n } from "@/components/LocaleProvider";

/**
 * About Us in the shared 1180px column: heading + first two paragraphs
 * beside the square illustration, then the last two paragraphs in a
 * two-column row.
 */
export function AboutContent() {
  const { t } = useI18n();
  const [first, second, third, fourth] = t.about.paragraphs;
  const bodyClass =
    "text-[1.05rem] font-light leading-8 text-jv-text sm:text-[1.125rem] sm:leading-8";

  return (
    <section className="bg-[#f8f0e7]" aria-labelledby="about-us-heading">
      <div className="jv-container py-16 lg:py-24 xl:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,40rem)] lg:gap-16">
          <div>
            <p className="jv-kicker">{t.about.kicker}</p>
            <h1
              id="about-us-heading"
              className="jv-display mt-4 text-5xl text-jv-ink sm:text-6xl"
            >
              {t.about.title}
            </h1>
            <div className={`mt-10 space-y-6 ${bodyClass}`}>
              <p>{first}</p>
              <p>{second}</p>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[40rem]">
            <Image
              src="/images/about-us-square.png"
              alt={t.about.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className={`mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 lg:mt-16 ${bodyClass}`}>
          <p>{third}</p>
          <p>{fourth}</p>
        </div>
      </div>
    </section>
  );
}
