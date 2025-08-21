# Country Explorer

En responsiv och tillgänglig React-app som hämtar länder från API:et REST Countries och låter dig filtrera och söka.

## Demo & skärmdumpar

- Wireframes/skisser finns i `assets/`

## Kör igång

```bash
npm i
npm run dev
npm test
```

## Arkitektur

src/api/restCountries.js – API (fetch)

src/views/\* – sidor (lista + detaljer + about)

src/components/\* – SearchBar, RegionFilter, CountriesList, Navbar

src/utils/validation.js – inputvalidering

## Funktioner

Sök + regionfilter

Detaljsida per land

Loading/empty/error + retry

aria-live-räknare, labels, skip-link

Mobil-först grid

## Felhantering & säkerhet

Validering (längd/tecken), ingen innerHTML

Timeout + abort på hämtningar

(Prod-idé) Content Security Policy (CSP)

## Teststrategi

validation (unit)

SearchBar (komponent)

CountriesListView (filtrering, empty, error+retry, aria-live)

CountryDetailsView (success, 404, error+retry)

## Dokumentation

||

## Tekniska val och varför

• React + React Router

Jag valde React för att jag är bekväm i det systemet och för att komponenttänk passar uppgiften. React Router ger enkel navigering mellan lista och detaljsida utan extra komplexitet.

• REST Countries + specifika fält

Jag använder REST Countries och begränsar payload via fields= (t.ex. name,flags,cca3,region,population,capital,languages,borders). Det minskar datamängd och gör appen effektivare.

• Klientsidsfiltrering

Jag hämtar alla länder en gång och filtrerar lokalt på region och sökfras. Med så många länder känns filtreringen väldigt responsiv. Hade data mängden varit stort hade jag gjort serversök eller delat upp resultatet på flera sidor (paginering).

• Söklogik: validering + debounce + normalisering

Jag validerar inmatningen (min/max längd, teckenuppsättning; stöd för Å/Ä/Ö), använder debounce för att undvika “spam” mot föräldern, och normaliserar strängar (lowercase + ta bort diakritiska tecken) så att sökningen känns tolerant.

• Nätverkssäkerhet & robusthet

Jag använder AbortController + timeout (10s) i både list- och detaljvyer för att undvika hängande förfrågningar. Jag undviker innerHTML och renderar defensivt (null-checks) för att minska risker.

• Tillgänglighet & responsivitet

Mobil-först CSS med design tokens (CSS-variabler) och tydliga brytpunkter. Jag har skip-link, kopplade label→input, tydlig fokusring, aria-live för resultaträknare, prefers-reduced-motion och prefers-color-scheme.

• Testning med Vitest + Testing Library

Jag valde enhets- och komponenttester (snabb loop, lätt att mocka API) framför E2E inom tidsramen. Jag mockar fetch/API-lagret för att testa filtrering, empty, error+retry, 404 och validering utan nätverk. Med mer tid hade jag lagt till 1–2 E2E-röktester.

• Struktur & Git

Tydlig mappstruktur (api/, views/, components/, utils/, styles/) och små, beskrivande commits. Det gör det lätt att följa förändringar och resonemang.

||

Styrkor i min lösning

• Snabb och enkel UX: Hämta en gång, filtrera i minnet, debounce och normalisering gör sökningen mjuk.
• A11y på plats: Semantik, aria-live, fokusindikator och skip-link.
• Robust nätverkslogik: Loading/empty/error, retry, AbortController + timeout.
• Tester där det märks: Validering, sök/filtrering, error/404 och detaljvyns flöden.

||

Svagheter och kompromisser i min lösning:

• Ingen caching/persistens: Allt hämtas på nytt per session.
• Ingen pagination/server-sök: Skalar inte lika bra om datasetet blir stort.
• Inga E2E-tester: Jag valde bort det för att hinna få grönt på de viktigaste enhets- och komponenttesten.

||

Vad jag hade gjort annorlunda med mer tid

• E2E (Playwright/Cypress): Minst två röktester: “lista → filtrera → gå till detalj” och “fel → retry”.
• TanStack Query: Caching, refetch, retry-policy och mer robust felhantering “gratis”.
• Pagination/virtuell lista: Bättre prestanda för stora datamängder.
• i18n och a11y-automation: Axe i CI, samt stöd för fler språk.
• CSP & CI/CD: Strikt Content Security Policy och enkel pipeline som kör lint/test/axe.

||

Vad jag lärde mig och tar med mig

• TDD är lättare i små bitar: För mig funkade det bäst att börja med validering/sök och bygga på stegvis.
• Mocka API tidigt: Det gör testerna stabilare och snabbare.
• A11y görs bäst löpande: Små beslut (labels, aria-live, fokus) är enklare än stora fixar i slutet.
• Hålla mig till en enkel stack: Jag tjänade på att inte överdesigna (ingen state manager, ingen CSS-ram, inget E2E först).
• Bättre planering: Jag behöver planera kalendern ärligare och sätta tydliga “sista-datum” för nice-to-have.
Kort sagt: jag valde en enkel, testbar och användbar lösning som möter kraven väl. Jag ser tydligt var den bör växa (caching, E2E, pagination) och jag vet hur jag skulle göra det nästa gång.J ag lärde mig mycket om min egen process och vad som gör mig mest effektiv som junior utvecklare.
