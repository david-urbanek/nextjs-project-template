import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

// Unmatched top-level paths get sent to the default locale.
export default function GlobalNotFound() {
  redirect(`/${routing.defaultLocale}`);
}
