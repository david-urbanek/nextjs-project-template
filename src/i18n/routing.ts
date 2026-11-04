import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales. `cs` = Czech, `en` = English (ISO 639-1 language codes).
  locales: ["cs", "en"],
  defaultLocale: "cs",
  // Every route is prefixed, incl. the default locale: /cs/..., /en/...
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
