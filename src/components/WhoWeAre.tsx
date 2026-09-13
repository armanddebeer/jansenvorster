"use client";

import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";

/**
 * Centered intro with generous type and whitespace.
 */
export function WhoWeAre() {
  const { t } = useI18n();

  return (
    <section className="w-full bg-[#fdfcfb] py-20 sm:py-28">
      <FadeIn className="jv-container max-w-[780px] text-center">
        <p className="jv-kicker mb-4">{t.who.kicker}</p>
        <h2 className="jv-display mb-8 text-4xl sm:text-5xl">{t.who.title}</h2>
        <p className="text-[17px] font-light leading-8 text-jv-text">{t.who.body}</p>
      </FadeIn>
    </section>
  );
}
