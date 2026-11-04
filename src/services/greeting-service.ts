import type { Locale } from "@/i18n/routing";

/**
 * Example of the business-logic layer. Services hold domain logic and
 * data access (API/DB clients); they stay free of React and UI concerns so
 * they are easy to unit-test. Components call services, never the reverse.
 */
export function buildGreeting(name: string, locale: Locale): string {
  const trimmed = name.trim();
  const target =
    trimmed.length > 0 ? trimmed : locale === "cs" ? "světe" : "world";
  return locale === "cs" ? `Ahoj, ${target}!` : `Hello, ${target}!`;
}
