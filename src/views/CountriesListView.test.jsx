import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountriesListView from "./CountriesListView";

const mockCountries = [
  {
    name: { common: "Sweden" },
    flags: { svg: "https://flagcdn.com/se.svg" },
    cca3: "SWE",
    region: "Europe",
    population: 10000000,
  },
  {
    name: { common: "Norway" },
    flags: { svg: "https://flagcdn.com/no.svg" },
    cca3: "NOR",
    region: "Europe",
    population: 5000000,
  },
];

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <CountriesListView />
    </MemoryRouter>
  );
}

describe("CountriesListView", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("visar länder efter lyckad hämtning", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCountries,
    });

    renderPage();

    // Vänta tills listan renderas
    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBe(2);

    // Länkar med landnamn
    expect(screen.getByRole("link", { name: /sweden/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /norway/i })).toBeInTheDocument();
  });

  it('visar error-state och "Försök igen"-knapp vid misslyckad hämtning', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });

    renderPage();

    const retryBtn = await screen.findByRole("button", {
      name: /försök igen/i,
    });
    expect(retryBtn).toBeInTheDocument();
  });

  it('visar "Inga träffar" när API svarar med tom lista', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderPage();

    const emptyText = await screen.findByText(/inga träffar/i);
    expect(emptyText).toBeInTheDocument();
  });
});
