import { env } from "@/env";

/**
 * Central place for brand/SEO metadata consumed by layout metadata,
 * sitemap, robots and the web manifest. Edit these for your project.
 */
export const siteConfig = {
  name: "Next.js Template",
  url: env.NEXT_PUBLIC_SITE_URL,
  twitter: "@yourhandle",
} as const;

export type SiteConfig = typeof siteConfig;
