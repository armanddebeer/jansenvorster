import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Turns stored all-caps labels into title case for the restyled UI
 * without changing the underlying copy in site-data.
 */
export function toDisplayHeading(value: string) {
  return value.toLowerCase().replace(/\b([a-z])/g, (char) => char.toUpperCase());
}
