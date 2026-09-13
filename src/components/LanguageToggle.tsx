"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/LocaleProvider";
import type { TLocale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

const OPTIONS: { locale: TLocale; label: string }[] = [
  { locale: "en", label: "English" },
  { locale: "af", label: "Afrikaans" },
];

/**
 * Globe in the header. Opens a short English / Afrikaans menu;
 * it does not swap language on the first click.
 */
export function LanguageToggle() {
  const { locale, t, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    /**
     * Closes the menu on outside click or Escape.
     */
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /**
   * Applies the chosen locale and closes the dropdown.
   */
  function choose(next: TLocale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t.language.choose}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center text-jv-ink transition-colors hover:text-jv-accent"
      >
        <GlobeIcon />
      </button>

      {open ? (
        <ul
          role="menu"
          aria-label={t.language.choose}
          className="absolute right-0 z-[80] mt-1 min-w-[10.5rem] border border-black/5 bg-[#fdfcfb] py-1.5 shadow-[0_12px_32px_rgba(28,25,23,0.12)]"
        >
          {OPTIONS.map((option) => {
            const active = option.locale === locale;
            return (
              <li key={option.locale} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => choose(option.locale)}
                  className={cn(
                    "flex w-full px-4 py-2.5 text-left text-[12px] font-normal uppercase tracking-[0.14em] text-jv-ink transition-colors hover:text-jv-accent",
                    active && "font-semibold text-jv-accent"
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Line-drawn globe matching the header’s thin stroke icons.
 */
function GlobeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.2 12h17.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.1 7.4h13.8M5.1 16.6h13.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
