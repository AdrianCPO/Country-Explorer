export const CountriesList = ({ countries = [] }) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>Inga träffar, försök igen</p>;
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
          <a href={`/country/${c.cca3}`}>{c.name?.common}</a>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>{c.region}</div>
        </li>
      ))}
    </ul>
  );
};
