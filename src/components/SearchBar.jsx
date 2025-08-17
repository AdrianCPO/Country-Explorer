import { useEffect, useRef, useState } from "react";
import { validateQuery } from "../utils/validation";

export const SearchBar = ({
  query = "",
  onQueryChange = () => {},
  debounceMs = 300,
}) => {
  const [value, setValue] = useState(query);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  // Håll input i synk om prop ändras – anropa inte onQueryChange här.
  useEffect(() => {
    setValue(query);
    const { ok, error } = validateQuery(query);
    setError(ok ? null : error);
  }, [query]);

  // Debounce-läge: endast när debounceMs > 0
  useEffect(() => {
    if (debounceMs <= 0) return;

    const { ok, value: cleaned } = validateQuery(value);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (ok) onQueryChange(cleaned);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs, onQueryChange]);

  // Omedelbart läge: ring direkt i onChange
  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);

    const { ok, error, value: cleaned } = validateQuery(next);
    setError(ok ? null : error);

    if (debounceMs <= 0 && ok) {
      onQueryChange(cleaned);
    }
  };

  return (
    <div>
      <label htmlFor="query" className="label">
        Sök land
      </label>
      <input
        id="query"
        className="input"
        type="text"
        value={value}
        onChange={handleChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "query-error" : undefined}
      />
      {error && (
        <p id="query-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
