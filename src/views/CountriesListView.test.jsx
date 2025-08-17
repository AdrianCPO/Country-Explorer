import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// Mocka API-modulen FÖRE komponentimporten
vi.mock("../api/restCountries", () => ({
  getAllCountries: vi.fn(),
}));
import { getAllCountries } from "../api/restCountries";

import { CountriesListView } from "./CountriesListView";

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

describe("CountriesListView – filtrering i minnet", () => {
  beforeEach(() => {
    vi.mocked(getAllCountries).mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("kan filtrera på region OCH sökfras samtidigt (t.ex. Europe + 'sw')", async () => {
    vi.mocked(getAllCountries).mockResolvedValueOnce(mockCountries);

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/countries"]}>
        <CountriesListView />
      </MemoryRouter>
    );

    // Vänta in startlistan
    await screen.findByRole("link", { name: /sweden/i });

    // Filtrera
    await user.selectOptions(screen.getByLabelText(/region/i), "Europe");
    const input = screen.getByRole("textbox", { name: /sök land/i });
    await user.clear(input);
    await user.type(input, "sw");

    // vänta ut debouncen (SearchBar använder 300ms)
    await new Promise((r) => setTimeout(r, 350));

    expect(screen.getByRole("link", { name: /sweden/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /switzerland/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /brazil/i })
    ).not.toBeInTheDocument();
  });

  it("visar 'Inga träffar' när sökfrasen inte matchar inom vald region", async () => {
    vi.mocked(getAllCountries).mockResolvedValueOnce(mockCountries);
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/countries"]}>
        <CountriesListView />
      </MemoryRouter>
    );

    await screen.findByRole("link", { name: /sweden/i });

    await user.selectOptions(screen.getByLabelText(/region/i), "Americas");
    const input = screen.getByRole("textbox", { name: /sök land/i });
    await user.clear(input);
    await user.type(input, "sw");
    await new Promise((r) => setTimeout(r, 350));

    expect(await screen.findByText(/inga träffar/i)).toBeInTheDocument();
  });

  it("kan återhämta sig från fel via 'Försök igen'-knappen", async () => {
    vi.mocked(getAllCountries)
      .mockRejectedValueOnce(new Error("500"))
      .mockResolvedValueOnce(mockCountries);

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/countries"]}>
        <CountriesListView />
      </MemoryRouter>
    );

    const retryBtn = await screen.findByRole("button", {
      name: /försök igen/i,
    });
    await user.click(retryBtn);

    expect(
      await screen.findByRole("link", { name: /sweden/i })
    ).toBeInTheDocument();
  });
});
