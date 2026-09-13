import { LOCATIONS } from "@/lib/site-data";

/**
 * Maps a practice label to the live inbox already published on the site.
 */
export function emailForPractice(practice: string) {
  const match = LOCATIONS.find(
    (loc) => loc.name.toLowerCase() === practice.trim().toLowerCase()
  );
  return match?.email ?? null;
}
