# Country Explorer

En responsiv och tillgänglig React-app som hämtar länder från API:et REST Countries.

## Kör igång

```bash
npm i
npm run dev
npm test
```

## Arkitektur

src/api/restCountries.js – API (fetch)

src/views/\* – sidor (lista + detaljer)

src/components/\* – SearchBar, RegionFilter, CountriesList, Navbar

src/utils/validation.js – inputvalidering

## Funktioner

Sök + regionfilter (klientsidefiltrering)

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

Direkt efter uppgiften blivit förmedlad började jag kolla efter inspiration. Jag hittade ett API som jag ville bygga appen runt.
Därefter gjorde jag wireframes för mobil och surfplatta (finns att tillgå under mappen assets). Jag valde att stanna vid wireframes och inte göra mer detaljerade prototyper på grund av tidsramen som satts.
När jag skapat mig en bild av app-idéns utseende gick jag vidare och gjorde en mapp arkitektur. Därefter gjorde jag ett fungerande routersystem och såg till att mina tillfälliga view-filer gick att navigera till.
Jag avslutade första dagen med att se till att jag kunde hämta data från api:et.

Dag två skrev jag tester och här finns det plats för mycket självreflektion. Till en början ville jag köra end to end tester. Hade en idé om att använda bibloteket Playwright. Dock när jag läste på om bibloteket så verkade det något för komplicerat. Så då gick jag på plan B, Cypress. Det har jag lite erfarenhet av tänkte jag och gick tillbaka till vårens föreläsning. Jag hade svårt att minnas och trodde det skulle bli för svårt att skriva tester som jag sedan skulle få gröna utan allt för stort efterarbete. Jag ångrade nu att jag inte gjort ett bättre förarbete och gjort en tydligare projektbild med prototyper i figma.
Jag visste att jag ville ha en sökfunktion med validering och att jag skulle ha en debouncehook i mitt projekt, med detta i åtanke började jag luta mer och mer åt Vitest med enhets och komponentstester...

Arbetet fortgick med att jag skrev tester, en detaljvy samt filterfunktion. Jag var nöjd med funktionaliteten av min hemsida med började inse att min initiala vision av appen inte riktigt stämde överens med min nuvarande. Jag behöver ingen navbar...ska jag bortse från min wireframe eller stå fast vid min första vision?

Jag skrev en global css för att få hemsidan responsiv enligt de breakpoints jag bestämde initialt (finns i mappen assets) Jag blev relativt nöjd och ansåg att projektet flytit på bättre än väntat. Den nöjda känslan skulle snabbt ändras till frustration när nästa stopp i projektet var att få mina tester gröna. Jag fick skriva om testerna och komponenterna som testades flera gånger utan att få de grönt. Grönt blev rött och rött blev grönt och jag blev yr. Kändes som jag stirrade in i en disko-kula...jag spenderade dagar med att gräva min grop djupare och djupare i AI-träsket med försök att göra mina tester gröna. Till slut gick det. Jag kunde inte undvika att i min lättnad blicka tillbaka på end to end tester, undra om inte det hade varit smidigare ändå?

Jag gick vidare med att göra små förbättringar på hemsidan, en resultaträknare,
