"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GetInTouchButton } from "@/components/GetInTouchButton";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/components/LocaleProvider";
import { MenuIcon } from "@/components/icons";
import { NAV_LINKS } from "@/lib/site-data";

const UNDERLINE_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Sticky header: optically centered uppercase nav, bold only on the active page.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const links = NAV_LINKS.filter((link) => link.href !== "/contact-us");

  /**
   * Returns whether a nav href matches the current route.
   */
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#fdfcfb]/90 backdrop-blur-md">
      <div className="jv-container grid grid-cols-[1fr_auto] items-center gap-4 py-4 lg:py-5 xl:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="relative block h-[48px] w-[196px] shrink-0 justify-self-start sm:h-[54px] sm:w-[226px] lg:h-[60px] lg:w-[252px]"
          aria-label={t.nav.homeAria}
        >
          <Image
            src="/images/logo.png"
            alt="Jansen & Vorster"
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 196px, (max-width: 1024px) 226px, 252px"
            quality={100}
            priority
          />
        </Link>

        <nav className="hidden items-center justify-center xl:flex" aria-label="Primary">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <NavItem
                  href={link.href}
                  label={t.nav[link.key]}
                  active={isActive(link.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
          <LanguageToggle />
          <GetInTouchButton className="jv-btn hidden h-11 min-h-11 px-4 text-[11px] lg:inline-flex">
            {t.nav.getInTouch}
          </GetInTouchButton>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-jv-ink xl:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: UNDERLINE_EASE }}
            className="overflow-hidden border-t border-black/5 bg-[#fdfcfb] xl:hidden"
          >
            <ul className="jv-container flex flex-col py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <NavItem
                    href={link.href}
                    label={t.nav[link.key]}
                    active={isActive(link.href)}
                    stacked
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              ))}
              <li className="pb-4 pt-2">
                <GetInTouchButton
                  className="jv-btn w-full"
                  onOpen={() => setOpen(false)}
                >
                  {t.nav.getInTouch}
                </GetInTouchButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

type TNavItemProps = {
  href: string;
  label: string;
  active: boolean;
  stacked?: boolean;
  onNavigate?: () => void;
};

/**
 * Nav link with a left-origin orange underline that stays on the current page
 * and plays the same motion on hover.
 */
function NavItem({ href, label, active, stacked = false, onNavigate }: TNavItemProps) {
  const [hovered, setHovered] = useState(false);
  const showLine = active || hovered;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex flex-col items-center font-normal uppercase tracking-[0.14em] text-jv-ink transition-colors duration-300",
        stacked ? "items-start py-3.5 text-[15px]" : "py-1 text-[13px]",
        active && "font-semibold",
        (active || hovered) && "text-jv-accent"
      )}
    >
      {label}
      <motion.span
        aria-hidden
        className="mt-1.5 h-px w-full origin-left bg-jv-accent"
        initial={false}
        animate={{ scaleX: showLine ? 1 : 0, opacity: showLine ? 1 : 0 }}
        transition={{ duration: 0.38, ease: UNDERLINE_EASE }}
      />
    </Link>
  );
}
