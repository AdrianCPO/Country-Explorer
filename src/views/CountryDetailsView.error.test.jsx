import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CountryDetailsView } from "./CountryDetailsView";

vi.mock("../api/restCountries", () => ({ getCountryByCode: vi.fn() }));
import { getCountryByCode } from "../api/restCountries";

describe("CountryDetailsView error", () => {
  it("visar fel och kan återhämta sig via 'Försök igen'", async () => {
    getCountryByCode
      .mockRejectedValueOnce(new Error("500"))
      .mockResolvedValueOnce({
        name: { common: "Sweden" },
        flags: { svg: "" },
        cca3: "SWE",
      });

    render(
      <MemoryRouter initialEntries={["/country/SWE"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsView />} />
        </Routes>
      </MemoryRouter>
    );

    const retry = await screen.findByRole("button", { name: /försök igen/i });
    await retry.click();
    expect(
      await screen.findByRole("heading", { name: /sweden/i })
    ).toBeInTheDocument();
  });
});
