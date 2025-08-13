export const CountriesList = ({ countries = [] }) => {
  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>Inga träffar</p>;
  }

  return (
    <ul>
      {countries.map((c) => (
        <li key={c.cca3}>
          {/* Gör det enkelt: länk med landets namn */}
          <a href={`/country/${c.cca3}`}>{c?.name?.common}</a>
        </li>
      ))}
    </ul>
  );
};
