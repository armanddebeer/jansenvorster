"use client";

import Image from "next/image";
import { GetInTouchButton } from "@/components/GetInTouchButton";
import { useI18n } from "@/components/LocaleProvider";
import { motion } from "motion/react";

/**
 * Full-width cream hero. The illustration is never cropped: it is
 * height-clamped and right-aligned so Table Mountain and the glasses stay
 * visible. Extra viewport width becomes more cream on the left, which is
 * where the slogan sits — a readable column, not a skinny strip.
 */
export function HeroSection() {
  const { t } = useI18n();

  const copy = (
    <>
      <p className="jv-kicker mb-4">{t.hero.kicker}</p>
      <h1 className="jv-display mb-4 text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
        {t.hero.titleLine1}
        <br />
        {t.hero.titleLine2}
      </h1>
      <span className="mb-5 block h-px w-16 bg-jv-accent" aria-hidden />
      <p className="mb-2 font-heading text-[1.35rem] font-medium leading-snug text-jv-ink sm:text-[1.5rem]">
        {t.hero.subtitle}
      </p>
      <p className="mb-7 max-w-[36rem] text-[16px] font-light leading-7 text-jv-text sm:text-[17px] sm:leading-8">
        {t.hero.detail}
      </p>
      <GetInTouchButton className="jv-btn w-fit">{t.nav.getInTouch}</GetInTouchButton>
    </>
  );

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f4ebe1]"
      aria-label={t.hero.aria}
    >
      <div className="relative flex w-full flex-col lg:block lg:h-[clamp(500px,36vw,640px)]">
        <motion.div
          className="order-1 px-6 py-10 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-10 lg:order-none lg:flex lg:items-center lg:px-0 lg:py-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="jv-container lg:pointer-events-auto">
            <div className="max-w-[40rem]">{copy}</div>
          </div>
        </motion.div>

        <div className="relative order-2 aspect-[1672/941] w-full lg:absolute lg:inset-0 lg:order-none lg:aspect-auto">
          <Image
            src="/images/home-hero.png"
            alt={t.hero.imageAlt}
            fill
            className="max-w-none object-contain object-center lg:object-right"
            sizes="100vw"
            quality={95}
            priority
          />
        </div>
      </div>
    </section>
  );
}
