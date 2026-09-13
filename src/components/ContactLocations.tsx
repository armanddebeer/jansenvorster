"use client";

import type { TLocation } from "@/lib/site-data";
import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";
import { toDisplayHeading } from "@/lib/utils";

type TContactLocationsProps = {
  locations: TLocation[];
};

/**
 * Branch contact cards with maps — three practices, generous spacing.
 */
export function ContactLocations({ locations }: TContactLocationsProps) {
  const { t } = useI18n();

  return (
    <section className="w-full bg-[#fdfcfb] pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="jv-container">
        <FadeIn className="mb-14 max-w-[640px]">
          <p className="jv-kicker mb-4">{t.contact.kicker}</p>
          <h1 className="jv-display text-4xl sm:text-6xl">{t.contact.title}</h1>
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((loc, index) => (
            <FadeIn key={loc.name} delay={index * 0.08}>
              <article className="min-w-0">
                <h2 className="mb-5 font-heading text-[1.7rem] font-medium text-jv-ink">
                  {toDisplayHeading(loc.name)}
                </h2>
                <p className="mb-2 text-[15px] font-light leading-7">
                  {t.contact.tel}:{" "}
                  <a href={`tel:${loc.tel.replaceAll(" ", "")}`} className="hover:text-jv-accent">
                    {loc.tel}
                  </a>
                </p>
                <p className="mb-2 break-words text-[15px] font-light leading-7">
                  {t.contact.address}: {loc.address}
                </p>
                <p className="mb-5 break-words text-[15px] font-light leading-7">
                  <span className="font-medium text-jv-ink">{t.contact.email}:</span>{" "}
                  <a href={`mailto:${loc.email}`} className="hover:text-jv-accent">
                    {loc.email}
                  </a>
                </p>
                <h3 className="mb-2 text-[13px] font-medium tracking-[0.08em] uppercase text-jv-ink">
                  {t.contact.hours}
                </h3>
                {loc.hours.map((line) => (
                  <p key={line} className="text-[15px] font-light leading-7">
                    {(t.hours as Record<string, string>)[line] ?? line}
                  </p>
                ))}
                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden bg-jv-paper">
                  <iframe
                    title={`${toDisplayHeading(loc.name)} ${t.contact.mapTitle}`}
                    src={loc.mapSrc}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
