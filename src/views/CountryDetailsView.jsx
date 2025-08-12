import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../api/restCountries";

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

    getCountryByCode(code)
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
      });

    return () => {
      alive = false;
    };
  }, [code, reloadKey]);

  if (status === "loading") return <div>Hämtar…</div>;

  if (status === "error")
    return (
      <div role="alert">
        Något gick fel.{" "}
        <button onClick={() => setReloadKey((x) => x + 1)}>Försök igen</button>
      </div>
    );

  if (status === "notfound")
    return (
      <main>
        <p>
          Hittade inte landet med kod: <strong>{code}</strong>
        </p>
        <p>
          <Link to="/countries">Tillbaka till listan</Link>
        </p>
      </main>
    );

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
    <main>
      <button onClick={() => navigate(-1)} aria-label="Gå tillbaka">
        ← Tillbaka
      </button>

      <h1>{name}</h1>

      {flagSrc && (
        <img
          src={flagSrc}
          alt={`Flagga för ${name}`}
          loading="lazy"
          style={{
            maxWidth: 320,
            height: "auto",
            display: "block",
            marginBottom: 12,
          }}
        />
      )}

      <dl>
        <dt>Region</dt>
        <dd>{region}</dd>

        <dt>Huvudstad</dt>
        <dd>{capital}</dd>

        <dt>Befolkning</dt>
        <dd>{population}</dd>

        <dt>Språk</dt>
        <dd>{languages}</dd>

        <dt>Grannländer (koder)</dt>
        <dd>
          {borders.length === 0 ? (
            "—"
          ) : (
            <ul>
              {borders.map((b) => (
                <li key={b}>
                  {/* Enkel länk vidare – vi använder bara koden för att hålla det enkelt */}
                  <Link to={`/country/${b}`}>{b}</Link>
                </li>
              ))}
            </ul>
          )}
        </dd>
      </dl>
    </main>
  );
};
