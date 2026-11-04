import { expect, test } from "@playwright/test";

test("redirects root to a localized route and renders the home page", async ({
  page,
}) => {
  // next-intl detects the browser's Accept-Language and prefixes the URL.
  await page.goto("/");
  await expect(page).toHaveURL(/\/(cs|en)(\/|$)/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("switches locale from cs to en", async ({ page }) => {
  await page.goto("/cs");
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en/);
});
