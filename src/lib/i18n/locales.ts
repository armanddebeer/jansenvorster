export const LOCALES = ["en", "af"] as const;

export type TLocale = (typeof LOCALES)[number];

export const LOCALE_STORAGE_KEY = "jv-locale";
export const LOCALE_COOKIE = "jv-locale";

/**
 * Reads a browser language tag and returns Afrikaans only when it is clearly `af`.
 */
export function localeFromBrowserLanguage(tag: string | undefined): TLocale {
  const normalised = tag?.trim().toLowerCase() ?? "";
  return normalised === "af" || normalised.startsWith("af-") ? "af" : "en";
}

/**
 * True when the value is a supported site locale.
 */
export function isLocale(value: string | null | undefined): value is TLocale {
  return value === "en" || value === "af";
}
