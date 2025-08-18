import { useEffect, useRef, useState } from "react";
import { validateQuery } from "../utils/validation";
import { useDebounce } from "../hooks/useDebounce";

export const SearchBar = ({
  query = "",
  onQueryChange = () => {},
  debounceMs = 300,
}) => {
  const [value, setValue] = useState(query);
  const [error, setError] = useState(null);

  // se till att input följer prop om den ändras utifrån
  useEffect(() => {
    setValue(query);
    const { ok, error } = validateQuery(query);
    setError(ok ? null : error);
  }, [query]);

  // debounced value
  const debouncedValue = useDebounce(value, debounceMs);

  // validera + skicka uppåt när debounced ändras
  useEffect(() => {
    if (debounceMs > 0) {
      const { ok, value: cleaned } = validateQuery(debouncedValue);
      if (ok) {
        onQueryChange(cleaned);
      }
    }
  }, [debouncedValue, debounceMs, onQueryChange]);

  // direktläge (utan debounce)
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
