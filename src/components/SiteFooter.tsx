"use client";

import Image from "next/image";
import Link from "next/link";
import { GetInTouchButton } from "@/components/GetInTouchButton";
import { useI18n } from "@/components/LocaleProvider";
import { FOOTER, LOCATIONS, NAV_LINKS } from "@/lib/site-data";
import { toDisplayHeading } from "@/lib/utils";

/**
 * Editorial footer: simple site nav plus the three practices already on the site.
 */
export function SiteFooter() {
  const { t } = useI18n();
  const { year, brandName, floatingLabel, floatingHref, privacyHref, cookieHref } = FOOTER;

  return (
    <footer className="w-full border-t border-[#e6e1d8] bg-jv-paper">
      <div className="jv-container py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)] lg:gap-16">
          <div>
            <Link
              href="/"
              className="relative mb-6 block h-12 w-[220px] sm:h-14 sm:w-[248px]"
              aria-label={t.nav.homeAria}
            >
              <Image
                src="/images/logo.png"
                alt={brandName}
                fill
                className="object-contain object-left"
                sizes="248px"
                quality={100}
              />
            </Link>
            <p className="jv-kicker mb-3">{t.footer.slogan}</p>
            <p className="max-w-[36rem] text-[15px] font-light leading-7 text-jv-text">
              {t.hero.detail}
            </p>
            <GetInTouchButton className="jv-btn mt-8">{t.nav.getInTouch}</GetInTouchButton>
          </div>

          <nav aria-label="Footer">
            <p className="jv-kicker mb-5">{t.footer.explore}</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.filter((link) => link.href !== "/contact-us").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] font-semibold tracking-[0.04em] text-jv-ink transition-colors hover:text-jv-accent"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#e6e1d8] pt-12 sm:grid-cols-2 xl:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <article key={loc.name}>
              <h2 className="mb-4 font-heading text-[1.55rem] font-medium text-jv-ink">
                {toDisplayHeading(loc.name)}
              </h2>
              <p className="text-[14px] font-light leading-7">
                <a href={`tel:${loc.tel.replaceAll(" ", "")}`} className="hover:text-jv-accent">
                  {loc.tel}
                </a>
              </p>
              <p className="mt-1 text-[14px] font-light leading-7">{loc.address}</p>
              <p className="mt-1 text-[14px] font-light leading-7">
                <a href={`mailto:${loc.email}`} className="hover:text-jv-accent">
                  {loc.email}
                </a>
              </p>
              <ul className="mt-4 space-y-0.5 text-[13px] font-light leading-6 text-jv-text">
                {loc.hours.map((line) => (
                  <li key={line}>{hourLine(line, t.hours)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e6e1d8]">
        <div className="jv-container py-6">
          <p className="text-[12px] font-light leading-6 text-jv-text">
            <span aria-hidden="true">{"\u00A9"}</span>
            {year} {brandName}. {t.footer.credit}{" "}
            <a
              href={floatingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-jv-ink underline-offset-4 hover:text-jv-accent hover:underline"
            >
              {floatingLabel}
            </a>
            .{" "}
            <Link href={privacyHref} className="text-jv-ink underline-offset-4 hover:text-jv-accent hover:underline">
              {t.footer.privacy}
            </Link>
            .{" "}
            <Link href={cookieHref} className="text-jv-ink underline-offset-4 hover:text-jv-accent hover:underline">
              {t.footer.cookePolicy}
            </Link>
            . {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Looks up a translated opening-hours line, keeping unknown strings as-is.
 */
function hourLine(line: string, hours: Record<string, string>) {
  return hours[line] ?? line;
}
