"use client";

import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { useI18n } from "@/components/LocaleProvider";
import type { TMessages } from "@/lib/i18n/messages";

type TServiceBlock = TMessages["services"]["items"][number];
type TServiceGroup = TServiceBlock["groups"][number];

/**
 * Thin orange tick used for service lists — same stroke weight as the header icons.
 */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="mt-[5px] shrink-0 text-jv-accent"
    >
      <path
        d="M2.6 8.2L6.1 11.6L13.4 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One labelled group of checkmark items inside a service card.
 */
function ServiceGroup({ group }: { group: TServiceGroup }) {
  if (!group.items.length) return null;

  return (
    <div className="mt-5">
      {group.heading ? (
        <p className="jv-kicker mb-3">{group.heading}</p>
      ) : null}
      <ul className="space-y-2.5">
        {group.items.map((item) => (
          <li
            key={item.slice(0, 60)}
            className="flex gap-3 text-[15px] font-light leading-7 text-jv-text"
          >
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Intro copy, grouped check lists, and an optional closing note.
 */
function ServiceCopy({ service }: { service: TServiceBlock }) {
  return (
    <>
      {service.paragraphs.map((p) => (
        <p
          key={p.slice(0, 40)}
          className="mb-3 text-[15px] font-light leading-7 text-jv-text sm:text-[16px] sm:leading-8"
        >
          {p}
        </p>
      ))}
      {service.groups.map((group) => (
        <ServiceGroup key={group.heading ?? group.items[0]} group={group} />
      ))}
      {"note" in service && service.note ? (
        <p className="mt-5 text-[15px] font-light leading-7 text-jv-text sm:text-[16px] sm:leading-8">
          {service.note}
        </p>
      ) : null}
    </>
  );
}

/**
 * Service card body shared by the Eye Screening split and the 2-column grid.
 */
function ServiceArticle({
  service,
  index,
}: {
  service: TServiceBlock;
  index: number;
}) {
  return (
    <>
      <p className="jv-kicker mb-3">{String(index + 1).padStart(2, "0")}</p>
      <h2 className="jv-display mb-5 text-[1.85rem] sm:text-[2.15rem]">
        {service.title}
      </h2>
      <ServiceCopy service={service} />
    </>
  );
}

type TServiceArt = {
  src: string;
  alt: string;
};

/**
 * Square illustration on the right, matching the block height. Copy is never
 * clipped. Only used when a real image file exists.
 */
function ServiceSplit({
  service,
  index,
  art,
  priority = false,
}: {
  service: TServiceBlock;
  index: number;
  art: TServiceArt;
  priority?: boolean;
}) {
  return (
    <FadeIn className="mb-6">
      <article className="grid bg-jv-paper lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-visible px-7 py-9 sm:px-9 sm:py-10 lg:px-12">
          <ServiceArticle service={service} index={index} />
        </div>
        <div className="relative aspect-square overflow-hidden bg-[#f4ebe1] lg:min-h-full">
          <Image
            src={art.src}
            alt={art.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={95}
            priority={priority}
          />
        </div>
      </article>
    </FadeIn>
  );
}

/**
 * Returns illustration data for Eye Screening and Contact Lens Consultation.
 * Other services stay text-only until Armand adds art.
 */
function serviceArt(index: number, t: TMessages): TServiceArt | null {
  if (index === 0) {
    return { src: "/images/services-eye.png", alt: t.services.eyeAlt };
  }
  if (index === 2) {
    return { src: "/images/contact-lens.png", alt: t.services.contactLensAlt };
  }
  return null;
}

type TServiceEntry = {
  service: TServiceBlock;
  index: number;
  art: TServiceArt | null;
};

/**
 * Walks services in catalogue order, flushing text cards in pairs so a lone
 * card never sits beside an empty image slot.
 */
function buildServiceRows(items: TServiceEntry[]) {
  const rows: Array<
    | { kind: "split"; item: TServiceEntry }
    | { kind: "grid"; items: TServiceEntry[] }
  > = [];
  let pending: TServiceEntry[] = [];

  /**
   * Pushes buffered text-only services as one grid row.
   */
  function flushPending() {
    if (!pending.length) return;
    rows.push({ kind: "grid", items: pending });
    pending = [];
  }

  for (const item of items) {
    if (item.art) {
      flushPending();
      rows.push({ kind: "split", item });
      continue;
    }
    pending.push(item);
    if (pending.length === 2) flushPending();
  }
  flushPending();
  return rows;
}

/**
 * Eye Screening and Contact Lens Consultation are copy/art splits.
 * Remaining services sit in a two-column grid, in original catalogue order.
 */
export function ServicesContent() {
  const { t } = useI18n();
  const items = t.services.items.map((service, index) => ({
    service,
    index,
    art: serviceArt(index, t),
  }));
  const rows = buildServiceRows(items);

  return (
    <section className="w-full bg-[#fdfcfb] py-16 pb-24 sm:py-20">
      <div className="jv-container">
        <FadeIn className="mb-10 max-w-[36rem] lg:mb-14">
          <p className="jv-kicker mb-4">{t.services.kicker}</p>
          <h1 className="jv-display mb-6 text-4xl sm:text-6xl">{t.services.title}</h1>
          <p className="text-[17px] font-light leading-8">{t.services.intro}</p>
        </FadeIn>

        {rows.map((row) => {
          if (row.kind === "split") {
            return (
              <ServiceSplit
                key={row.item.service.title}
                service={row.item.service}
                index={row.item.index}
                art={row.item.art as TServiceArt}
                priority={row.item.index === 0}
              />
            );
          }

          const paired = row.items.length > 1;
          return (
            <div
              key={row.items.map((item) => item.service.title).join("-")}
              className={
                paired
                  ? "mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch"
                  : "mb-6 grid max-w-[calc(50%-0.75rem)] grid-cols-1 max-md:max-w-none"
              }
            >
              {row.items.map((item) => (
                <FadeIn
                  key={item.service.title}
                  delay={item.index * 0.04}
                  className={paired ? "h-full" : undefined}
                >
                  <article className="h-full overflow-visible bg-jv-paper px-7 py-9 sm:px-9 sm:py-10">
                    <ServiceArticle service={item.service} index={item.index} />
                  </article>
                </FadeIn>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
