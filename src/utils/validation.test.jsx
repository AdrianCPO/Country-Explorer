import { describe, it, expect } from "vitest";
import { validateQuery } from "./validation";

describe("validateQuery", () => {
  it("godkänner tom sträng (visa alla)", () => {
    expect(validateQuery("")).toEqual({ ok: true, value: "" });
    expect(validateQuery("   ")).toEqual({ ok: true, value: "" });
  });

  it("trimmar och kräver minst 2 tecken vid icke-tom inmatning", () => {
    expect(validateQuery(" s")).toEqual({
      ok: false,
      error: "Minst 2 tecken.",
    });
    expect(validateQuery("se")).toEqual({ ok: true, value: "se" });
  });

  it("underkänner för lång inmatning", () => {
    const fortyOne = "a".repeat(41);
    expect(validateQuery(fortyOne)).toEqual({
      ok: false,
      error: "Max 40 tecken.",
    });
  });

  it("tillåter bokstäver inkl. ÅÄÖ samt mellanslag och bindestreck", () => {
    expect(validateQuery("Åland")).toEqual({ ok: true, value: "Åland" });
    expect(validateQuery("Côte d’Azur")).toEqual({
      ok: false,
      error: "Endast bokstäver, mellanslag och bindestreck.",
    }); // apostrof ska EJ godkännas
    expect(validateQuery("Bosnien-Hercegovina")).toEqual({
      ok: true,
      value: "Bosnien-Hercegovina",
    });
  });

  it("underkänner siffror och andra tecken", () => {
    expect(validateQuery("sweden2")).toEqual({
      ok: false,
      error: "Endast bokstäver, mellanslag och bindestreck.",
    });
    expect(validateQuery("sweden!")).toEqual({
      ok: false,
      error: "Endast bokstäver, mellanslag och bindestreck.",
    });
  });
});
