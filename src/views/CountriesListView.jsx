import { useEffect, useState } from "react";
import { getAllCountries } from "../api/restCountries"; // samma som tidigare
import { FilterBar } from "../components/FilterBar"; // SearchBar + RegionFilter
import { CountriesList } from "../components/CountriesList"; // renderar <ul>/<li>

export const CountriesListView = () => {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [reloadKey, setReloadKey] = useState(0); // för "Försök igen"

  // 1) Hämta ALLA länder EN gång (eller vid retry)
  useEffect(() => {
    let alive = true;
    setStatus("loading");

    getAllCountries()
      .then((data) => {
        if (!alive) return;
        setAllCountries(Array.isArray(data) ? data : []);
        setStatus("success");
      })
      .catch(() => {
        if (!alive) return;
        setAllCountries([]);
        setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, [reloadKey]);

  // Små hjälpfunktioner för enkel, trevlig sökning
  const normalize = (s) =>
    (s ?? "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // tar bort accenter (é -> e, å -> a funkar sällan, men räcker)

  const matchesQuery = (country, q) => {
    if (!q) return true;
    const hay = normalize(country?.name?.common);
    const needle = normalize(q);
    return hay.includes(needle);
  };

  // 2) Filtrera i minnet: först region, sedan sök
  const filtered = allCountries
    .filter((c) => (region ? c?.region === region : true))
    .filter((c) => matchesQuery(c, query));

  // UI-states
  if (status === "loading") return <div>Hämtar…</div>;
  if (status === "error")
    return (
      <div role="alert">
        Något gick fel.{" "}
        <button onClick={() => setReloadKey((x) => x + 1)}>Försök igen</button>
      </div>
    );

  return (
    <main>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
      />
      <CountriesList countries={filtered} />
    </main>
  );
};
