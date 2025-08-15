import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CountryDetailsView } from "./CountryDetailsView";

const ok = (data) => ({ ok: true, json: async () => data });

describe("CountryDetailsView", () => {
  beforeEach(() => vi.spyOn(global, "fetch"));
  afterEach(() => vi.restoreAllMocks());

  it("renderar land vid success", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      ok([{ name: { common: "Sweden" }, flags: { svg: "" }, cca3: "SWE" }])
    );
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
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => null,
    });
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
