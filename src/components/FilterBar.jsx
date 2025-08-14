import { SearchBar } from "./SearchBar";
import { RegionFilter } from "./RegionFilter";

export const FilterBar = ({
  query = "",
  onQueryChange = () => {},
  region = "",
  onRegionChange = () => {},
}) => {
  return (
    <div className="filters">
      <div style={{ flex: 1, minWidth: 220 }}>
        <label htmlFor="query" className="label">
          Sök land
        </label>
        <SearchBar
          query={query}
          onQueryChange={onQueryChange}
          debounceMs={300}
        />
      </div>
      <RegionFilter region={region} onRegionChange={onRegionChange} />
    </div>
  );
};
