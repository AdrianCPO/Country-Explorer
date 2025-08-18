const BASE = "https://restcountries.com/v3.1";
const FIELDS =
  "fields=name,flags,cca3,region,population,capital,languages,borders";

export async function getAllCountries(init) {
  const res = await fetch(`${BASE}/all?${FIELDS}`, init);
  if (!res.ok) throw new Error("Kunde inte hämta länder");
  return await res.json();
}

export async function getCountriesByName(q, init) {
  if (!q) return getAllCountries(init);
  const res = await fetch(
    `${BASE}/name/${encodeURIComponent(q)}?${FIELDS}`,
    init
  );
  if (res.status === 404) return [];
  if (!res.ok) throw new Error("Kunde inte söka länder");
  return await res.json();
}

export async function getCountriesByRegion(region, init) {
  if (!region) return getAllCountries(init);
  const res = await fetch(
    `${BASE}/region/${encodeURIComponent(region)}?${FIELDS}`,
    init
  );
  if (!res.ok) throw new Error("Kunde inte hämta region");
  return await res.json();
}

export async function getCountryByCode(code, init) {
  const res = await fetch(
    `${BASE}/alpha/${encodeURIComponent(code)}?${FIELDS}`,
    init
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Kunde inte hämta landet");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}
