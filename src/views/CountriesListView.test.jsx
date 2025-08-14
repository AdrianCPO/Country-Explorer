import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CountriesListView } from "./CountriesListView";

// Liten dataset för tydliga filterträffar
const mockCountries = [
  {
    name: { common: "Sweden" },
    flags: { svg: "https://flagcdn.com/se.svg" },
    cca3: "SWE",
    region: "Europe",
  },
  {
    name: { common: "Switzerland" },
    flags: { svg: "https://flagcdn.com/ch.svg" },
    cca3: "CHE",
    region: "Europe",
  },
  {
    name: { common: "Brazil" },
    flags: { svg: "https://flagcdn.com/br.svg" },
    cca3: "BRA",
    region: "Americas",
  },
];

function okResponse(data) {
  return { ok: true, json: async () => data };
}

describe("CountriesListView – filtrering i minnet", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("kan filtrera på region OCH sökfras samtidigt (t.ex. Europe + 'sw')", async () => {
    global.fetch.mockResolvedValueOnce(okResponse(mockCountries));

    // setup så att timers avanceras av user-event vid debounce
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<CountriesListView />);

    // Vänta tills listan laddats (minst en länk syns)
    await screen.findByRole("link", { name: /sweden/i });

    // 1) Välj region Europe
    const regionSelect = screen.getByLabelText(/region/i);
    await user.selectOptions(regionSelect, "Europe");

    // 2) Skriv 'sw' i sökrutan
    const input = screen.getByRole("textbox", { name: /sök land/i });
    await user.clear(input);
    await user.type(input, "sw");

    // Debounce i SearchBar är 300ms i dina komponenter → avancera tid
    vi.advanceTimersByTime(350);

    // Förvänta: Sweden + Switzerland visas, Brazil ska inte synas
    expect(screen.getByRole("link", { name: /sweden/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /switzerland/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /brazil/i })
    ).not.toBeInTheDocument();
  });

  it("visar 'Inga träffar' när sökfrasen inte matchar inom vald region", async () => {
    global.fetch.mockResolvedValueOnce(okResponse(mockCountries));
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<CountriesListView />);

    await screen.findByRole("link", { name: /sweden/i });

    // Välj Americas och sök 'sw' (ska inte hitta något där)
    await user.selectOptions(screen.getByLabelText(/region/i), "Americas");
    const input = screen.getByRole("textbox", { name: /sök land/i });
    await user.clear(input);
    await user.type(input, "sw");
    vi.advanceTimersByTime(350);

    expect(await screen.findByText(/inga träffar/i)).toBeInTheDocument();
  });

  it("kan återhämta sig från fel via 'Försök igen'-knappen", async () => {
    // 1:a anrop: fel
    global.fetch
      .mockResolvedValueOnce({ ok: false, status: 500 })
      // 2:a anrop (efter retry): OK
      .mockResolvedValueOnce(okResponse(mockCountries));

    const user = userEvent.setup();

    render(<CountriesListView />);

    // Fel-state syns
    const retryBtn = await screen.findByRole("button", {
      name: /försök igen/i,
    });
    expect(retryBtn).toBeInTheDocument();

    // Klicka – komponenten gör ett nytt fetch-anrop
    await user.click(retryBtn);

    // Nu ska listan renderas
    expect(
      await screen.findByRole("link", { name: /sweden/i })
    ).toBeInTheDocument();
  });
});
