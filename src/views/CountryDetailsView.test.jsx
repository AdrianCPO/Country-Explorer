import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CountryDetailsView } from "./CountryDetailsView";
vi.mock("../api/restCountries", () => ({
  getCountryByCode: vi.fn(),
}));
import { getCountryByCode } from "../api/restCountries";

const ok = (data) => ({ ok: true, json: async () => data });

describe("CountryDetailsView", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renderar land vid success", async () => {
    vi.mocked(getCountryByCode).mockResolvedValueOnce({
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
    expect(
      await screen.findByRole("heading", { name: /sweden/i })
    ).toBeInTheDocument();
  });

  it("visar notfound vid 404", async () => {
    vi.mocked(getCountryByCode).mockResolvedValueOnce(null);
    render(
      <MemoryRouter initialEntries={["/country/XXX"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailsView />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/hittade inte landet/i)).toBeInTheDocument();
  });
});
