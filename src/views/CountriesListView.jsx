import { useEffect, useState } from "react";
import { getAllCountries } from "../api/restCountries";
import { FilterBar } from "../components/FilterBar";
import { CountriesList } from "../components/CountriesList";

export const CountriesListView = () => {
  const [status, setStatus] = useState("loading");
  const [allCountries, setAllCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s

    getAllCountries({ signal: controller.signal })
      .then((data) => {
        if (!alive) return;
        setAllCountries(Array.isArray(data) ? data : []);
        setStatus("success");
      })
      .catch(() => {
        if (!alive) return;
        setAllCountries([]);
        setStatus("error");
      })
      .finally(() => clearTimeout(timeoutId));
    return () => {
      alive = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [reloadKey]);

  const normalize = (s) =>
    (s ?? "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const filtered = allCountries
    .filter((c) => (region ? c?.region === region : true))
    .filter((c) =>
      query ? normalize(c?.name?.common).includes(normalize(query)) : true
    );
  const count = filtered.length;

  if (status === "loading") return <div>Hämtar…</div>;
  if (status === "error")
    return (
      <div role="alert">
        Något gick fel.{" "}
        <button className="button" onClick={() => setReloadKey((x) => x + 1)}>
          Försök igen
        </button>
      </div>
    );

  return (
    <>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
      />
      <p aria-live="polite" style={{ color: "var(--muted)", marginTop: 4 }}>
        {count} {count === 1 ? "land" : "länder"}
      </p>
      <CountriesList countries={filtered} />
    </>
  );
};
