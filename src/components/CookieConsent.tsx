"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/LocaleProvider";

const STORAGE_KEY = "jv-cookie-consent";

type TConsentValue = "accepted" | "necessary";

/**
 * Reads a stored consent choice without throwing if storage is blocked.
 */
function readConsent(): TConsentValue | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "necessary") return value;
  } catch {
    return null;
  }
  return null;
}

/**
 * Persists a consent choice so the popup does not return on later visits.
 */
function writeConsent(value: TConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode can block storage; the popup will simply reappear next visit.
  }
}

/**
 * Small bottom-right cookie notice. First visit only; Accept or Necessary
 * is stored in localStorage. Does not block the page.
 */
export function CookieConsent() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!readConsent());
  }, []);

  /**
   * Saves the visitor’s choice and dismisses the notice.
   */
  function choose(value: TConsentValue) {
    writeConsent(value);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-labelledby="jv-cookie-title"
          aria-describedby="jv-cookie-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-[60] w-[min(22.5rem,calc(100vw-2rem))] bg-jv-paper p-5 shadow-[0_12px_40px_rgba(28,25,23,0.12)] sm:bottom-6 sm:right-6 sm:p-6"
        >
          <p id="jv-cookie-title" className="jv-kicker mb-2">
            {t.cookies.title}
          </p>
          <p
            id="jv-cookie-copy"
            className="mb-5 text-[14px] font-light leading-6 text-jv-text"
          >
            {t.cookies.body}{" "}
            <Link
              href="https://jansenvorster.co.za/cookie-policy"
              className="text-jv-ink underline decoration-jv-accent/40 underline-offset-4 transition-colors hover:text-jv-accent"
            >
              {t.cookies.policy}
            </Link>
            .
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="jv-btn h-10 min-h-10 px-4 text-[11px]" onClick={() => choose("accepted")}>
              {t.cookies.accept}
            </button>
            <button
              type="button"
              className="jv-btn-outline h-10 min-h-10 px-4 text-[11px]"
              onClick={() => choose("necessary")}
            >
              {t.cookies.necessary}
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
