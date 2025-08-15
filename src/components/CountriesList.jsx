import { Link } from "react-router-dom";

export const CountriesList = ({ countries = [] }) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>Inga träffar</p>;
  }

  return (
    <ul className="grid">
      {countries.map((c) => (
        <li key={c.cca3} className="card">
          {c.flags?.svg && (
            <img
              className="flag"
              src={c.flags.svg}
              alt={`Flagga för ${c.name?.common}`}
              loading="lazy"
            />
          )}
          <Link to={`/country/${c.cca3}`}>{c.name?.common}</Link>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>{c.region}</div>
        </li>
      ))}
    </ul>
  );
};
