"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  isLocale,
  localeFromBrowserLanguage,
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  type TLocale,
} from "@/lib/i18n/locales";
import { messages, type TMessages } from "@/lib/i18n/messages";

type TLocaleContext = {
  locale: TLocale;
  t: TMessages;
  setLocale: (locale: TLocale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<TLocaleContext | null>(null);

/**
 * Writes the locale to localStorage and a cookie so the choice survives reloads.
 */
function persistLocale(locale: TLocale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

/**
 * Site-wide English / Afrikaans dictionary. First visit follows `af*` browser
 * language; afterwards the stored choice wins.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<TLocale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next: TLocale = "en";
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) {
        next = stored;
      } else {
        next = localeFromBrowserLanguage(
          navigator.language || navigator.languages?.[0]
        );
      }
    } catch {
      next = localeFromBrowserLanguage(
        typeof navigator === "undefined" ? undefined : navigator.language
      );
    }
    setLocaleState(next);
    persistLocale(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
  }, [locale, ready]);

  const setLocale = useCallback((next: TLocale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next: TLocale = current === "en" ? "af" : "en";
      persistLocale(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t: messages[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/**
 * Access the current locale and translated copy. Must sit inside LocaleProvider.
 */
export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}
