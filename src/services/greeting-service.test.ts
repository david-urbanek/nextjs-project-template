import { describe, expect, it } from "vitest";
import { buildGreeting } from "./greeting-service";

describe("buildGreeting", () => {
  it("greets a named person per locale", () => {
    expect(buildGreeting("Dave", "en")).toBe("Hello, Dave!");
    expect(buildGreeting("Dave", "cs")).toBe("Ahoj, Dave!");
  });

  it("falls back to a locale default when the name is blank", () => {
    expect(buildGreeting("   ", "en")).toBe("Hello, world!");
    expect(buildGreeting("", "cs")).toBe("Ahoj, světe!");
  });
});
