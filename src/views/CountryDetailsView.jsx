import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../api/restCountries";
import "../styles/CountryDetails.css";

export const CountryDetailsView = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [country, setCountry] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    setCountry(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    getCountryByCode(code, { signal: controller.signal })
      .then((data) => {
        if (!alive) return;
        if (!data) {
          setStatus("notfound");
        } else {
          setCountry(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!alive) return;
        setStatus("error");
      })
      .finally(() => clearTimeout(timeoutId));

    return () => {
      alive = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [code, reloadKey]);

  if (status === "loading") {
    return (
      <main className="CountryDetails">
        <div className="CountryDetails__state" aria-busy="true">
          Hämtar…
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="CountryDetails">
        <div className="CountryDetails__state" role="alert">
          Något gick fel.
          <button
            className="Button Button--ghost"
            onClick={() => setReloadKey((x) => x + 1)}
          >
            Försök igen
          </button>
        </div>
      </main>
    );
  }

  if (status === "notfound") {
    return (
      <main className="CountryDetails">
        <div className="CountryDetails__state">
          <p>
            Hittade inte landet med kod: <strong>{code}</strong>
          </p>
          <p>
            <Link className="Link" to="/countries">
              Tillbaka till listan
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // success
  const name = country?.name?.common ?? "Okänt";
  const flagSrc = country?.flags?.svg || country?.flags?.png;
  const capital = Array.isArray(country?.capital)
    ? country.capital.join(", ")
    : (country?.capital ?? "—");
  const region = country?.region ?? "—";
  const population =
    typeof country?.population === "number"
      ? country.population.toLocaleString("sv-SE")
      : "—";
  const languages = country?.languages
    ? Object.values(country.languages).join(", ")
    : "—";
  const borders = Array.isArray(country?.borders) ? country.borders : [];

  return (
    <main className="CountryDetails container">
      <div className="CountryDetails__header">
        <button
          className="BackButton"
          onClick={() => navigate(-1)}
          aria-label="Gå tillbaka"
        >
          ← Tillbaka
        </button>
        <h1 className="CountryDetails__title">{name}</h1>
      </div>

      <section className="CountryDetails__card">
        {flagSrc && (
          <img
            className="CountryDetails__flag"
            src={flagSrc}
            alt={`Flagga för ${name}`}
            loading="lazy"
          />
        )}

        <dl className="CountryDetails__meta">
          <div className="MetaRow">
            <dt>Region</dt>
            <dd>{region}</dd>
          </div>

          <div className="MetaRow">
            <dt>Huvudstad</dt>
            <dd>{capital}</dd>
          </div>

          <div className="MetaRow">
            <dt>Befolkning</dt>
            <dd>{population}</dd>
          </div>

          <div className="MetaRow">
            <dt>Språk</dt>
            <dd>{languages}</dd>
          </div>

          <div className="MetaRow">
            <dt>Grannländer</dt>
            <dd>
              {borders.length === 0 ? (
                "—"
              ) : (
                <ul className="ChipList" aria-label="Grannländer (koder)">
                  {borders.map((b) => (
                    <li key={b}>
                      <Link className="Chip" to={`/country/${b}`}>
                        {b}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
};
