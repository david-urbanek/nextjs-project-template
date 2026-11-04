import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-lg">{t("description")}</p>
      <div className="flex items-center gap-4">
        <Button size="lg">{t("cta")}</Button>
        <LocaleSwitcher />
      </div>
    </main>
  );
}
