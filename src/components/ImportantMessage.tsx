"use client";

import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";

/**
 * Quiet announcement band — orange is used as a kicker, not a full-bleed shout.
 */
export function ImportantMessage() {
  const { t } = useI18n();

  return (
    <section className="w-full border-y border-[#e6e1d8] bg-jv-paper">
      <FadeIn className="jv-container max-w-[820px] py-16 text-center sm:py-20">
        <p className="jv-kicker mb-4">{t.important.title}</p>
        <p className="font-heading text-[1.45rem] leading-snug text-jv-ink sm:text-[1.85rem] sm:leading-snug">
          {t.important.body}
        </p>
      </FadeIn>
    </section>
  );
}
