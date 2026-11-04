import { describe, expect, it } from "vitest";
import cs from "../../messages/cs.json";
import en from "../../messages/en.json";
import { routing } from "@/i18n/routing";

type Json = { [key: string]: Json | string };

/** Flatten a nested message catalog into dot-separated key paths. */
function keyPaths(obj: Json, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [path] : keyPaths(value, path);
  });
}

describe("message catalogs", () => {
  it("defines a catalog for every configured locale", () => {
    expect(routing.locales).toEqual(["cs", "en"]);
  });

  it("cs and en expose an identical set of keys (no missing translations)", () => {
    const csKeys = keyPaths(cs as Json).sort();
    const enKeys = keyPaths(en as Json).sort();
    expect(csKeys).toEqual(enKeys);
  });
});
