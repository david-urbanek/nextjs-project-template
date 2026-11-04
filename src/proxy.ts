import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next internals and files with an
  // extension (robots.txt, sitemap.xml, manifest.webmanifest, assets, ...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
