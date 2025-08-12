import { useEffect, useState } from "react";
import { getAllCountries } from "../api/restCountries";

export const CountriesListView = () => {
  const [status, setStatus] = useState("loading");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    setError(null);

    getAllCountries()
      .then((data) => {
        if (!alive) return;
        setCountries(Array.isArray(data) ? data : []);
        setStatus("success");
      })
      .catch((err) => {
        if (!alive) return;
        setError(err);
        setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, [reloadKey]);

  if (status === "loading") return <div>Hämtar…</div>;

  if (status === "error")
    return (
      <div role="alert">
        Något gick fel.{" "}
        <button onClick={() => setReloadKey((x) => x + 1)}>Försök igen</button>
      </div>
    );

  if (countries.length === 0) return <p>Inga träffar</p>;

  return (
    <main>
      <ul>
        {countries.map((c) => (
          <li key={c.cca3}>
            <a href={`/country/${c.cca3}`}>{c?.name?.common}</a>
          </li>
        ))}
      </ul>
    </main>
  );
};
