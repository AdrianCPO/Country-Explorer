import { Link } from "react-router-dom";
import "../styles/CountriesList.css";

export const CountriesList = ({ countries = [] }) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p className="CountriesList__empty">Inga träffar</p>;
  }

  return (
    <ul className="CountriesList grid" role="list">
      {countries.map((c) => {
        const name = c?.name?.common ?? "Okänt land";
        const code = c?.cca3 ?? "";
        const flag = c?.flags?.svg || c?.flags?.png || "";
        const region = c?.region ?? "—";

        return (
          <li key={code} className="CountryCard card">
            <Link
              to={`/country/${code}`}
              className="CountryCard__link"
              aria-label={`Visa detaljer för ${name}`}
            >
              {flag && (
                <img
                  className="CountryCard__flag"
                  src={flag}
                  alt={`Flagga för ${name}`}
                  loading="lazy"
                />
              )}

              <h3 className="CountryCard__title">{name}</h3>
              <div className="CountryCard__meta">{region}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
