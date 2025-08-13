import { SearchBar } from "./SearchBar";
import { RegionFilter } from "./RegionFilter";

export const FilterBar = ({
  query = "",
  onQueryChange = () => {},
  region = "",
  onRegionChange = () => {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginBottom: 12,
      }}
    >
      <SearchBar query={query} onQueryChange={onQueryChange} debounceMs={300} />
      <RegionFilter region={region} onRegionChange={onRegionChange} />
    </div>
  );
};
