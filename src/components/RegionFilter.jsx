export const RegionFilter = ({ region = "", onRegionChange = () => {} }) => {
  return (
    <div style={{ width: 220 }}>
      <label htmlFor="region">Region</label>
      <select
        id="region"
        value={region}
        className="select"
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Alla</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
    </div>
  );
};
