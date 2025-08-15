const BASE = "https://restcountries.com/v3.1";
const FIELDS =
  "fields=name,flags,cca3,region,population,capital,languages,borders";

export async function getAllCountries({ signal } = {}) {
  const res = await fetch(`${BASE}/all?${FIELDS}`, { signal });
  if (!res.ok) throw new Error("Kunde inte hämta länder");
  return await res.json(); // Array
}

export async function getCountriesByName(q) {
  if (!q) return getAllCountries();
  const res = await fetch(`${BASE}/name/${encodeURIComponent(q)}?${FIELDS}`);
  if (res.status === 404) return []; // inget hittat
  if (!res.ok) throw new Error("Kunde inte söka länder");
  return await res.json(); // Array
}

export async function getCountriesByRegion(region) {
  if (!region) return getAllCountries();
  const res = await fetch(
    `${BASE}/region/${encodeURIComponent(region)}?${FIELDS}`
  );
  if (!res.ok) throw new Error("Kunde inte hämta region");
  return await res.json();
}

export async function getCountryByCode(code) {
  const res = await fetch(
    `${BASE}/alpha/${encodeURIComponent(code)}?${FIELDS}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Kunde inte hämta landet");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}
