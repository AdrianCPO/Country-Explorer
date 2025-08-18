import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../api/restCountries";
import { FilterBar } from "../components/FilterBar";
import { CountriesList } from "../components/CountriesList";
import "../styles/CountriesListView.css";

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

  const filtered = useMemo(() => {
    return allCountries
      .filter((c) => (region ? c?.region === region : true))
      .filter((c) =>
        query ? normalize(c?.name?.common).includes(normalize(query)) : true
      );
  }, [allCountries, query, region]);

  const count = filtered.length;
  const hasActiveFilters = query.trim() !== "" || region.trim() !== "";

  if (status === "loading") {
    return (
      <main className="CountriesView container">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          region={region}
          onRegionChange={setRegion}
        />

        <div className="CountRow" aria-live="polite">
          <span className="CountRow__text">Hämtar…</span>
        </div>

        <div className="SkeletonGrid" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="SkeletonCard" key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="CountriesView container">
        <div className="StatusCard" role="alert">
          <div>
            <strong>Något gick fel.</strong>
            <div className="StatusCard__muted">Kunde inte hämta länder.</div>
          </div>
          <button className="button" onClick={() => setReloadKey((x) => x + 1)}>
            Försök igen
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="CountriesView container">
      <header className="CountriesView__header">
        <h1 className="CountriesView__title">Länder</h1>
      </header>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
      />

      <div className="CountRow" aria-live="polite">
        <span className="CountRow__text">
          {count} {count === 1 ? "land" : "länder"}
        </span>

        {hasActiveFilters && (
          <button
            className="CountRow__clear"
            onClick={() => {
              setQuery("");
              setRegion("");
            }}
            aria-label="Rensa filter"
          >
            Rensa filter
          </button>
        )}
      </div>

      {count === 0 ? (
        <section className="EmptyState" aria-live="polite">
          <div className="EmptyState__emoji" aria-hidden="true">
            🔍
          </div>
          <h2 className="EmptyState__title">Inga träffar</h2>{" "}
          <p className="EmptyState__text">
            Prova ett annat sökord eller välj en annan region.
          </p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setRegion("");
            }}
          >
            Rensa filter
          </button>
        </section>
      ) : (
        <CountriesList countries={filtered} />
      )}
    </main>
  );
};
