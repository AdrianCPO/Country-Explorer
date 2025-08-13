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

  // Håll input i synk om prop ändras utifrån
  useEffect(() => {
    setValue(query);
  }, [query]);

  // Validera + debounce-anropa förälder endast när input är giltig
  useEffect(() => {
    const { ok, error, value: cleaned } = validateQuery(value);
    setError(ok ? null : error);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (ok) onQueryChange(cleaned);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs, onQueryChange]);

  return (
    <div>
      <label htmlFor="query">Sök land</label>
      <input
        id="query"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
