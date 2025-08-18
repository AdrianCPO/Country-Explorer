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

Direkt efter uppgiften blivit förmedlad började jag kolla efter inspiration. Jag hittade ett API som jag ville bygga appen runt.
Därefter gjorde jag wireframes för mobil och surfplatta (finns att tillgå under mappen assets). Jag valde att stanna vid wireframes och inte göra mer detaljerade prototyper på grund av tidsramen som satts.
När jag skapat mig en bild av app-idéns utseende gick jag vidare och gjorde en mapp arkitektur. Därefter gjorde jag ett fungerande routersystem och såg till att mina tillfälliga view-filer gick att navigera till.
Jag avslutade första dagen med att se till att jag kunde hämta data från api:et.

Dag två skrev jag tester och här finns det plats för mycket självreflektion. Till en början ville jag köra end to end tester. Hade en idé om att använda bibloteket Playwright. Dock när jag läste på om bibloteket så verkade det något för komplicerat. Så då gick jag på plan B, Cypress. Det har jag lite erfarenhet av tänkte jag och gick tillbaka till vårens föreläsning. Jag hade svårt att minnas och trodde det skulle bli för svårt att skriva tester som jag sedan skulle få gröna utan allt för stort efterarbete. Jag ångrade nu att jag inte gjort ett bättre förarbete och gjort en tydligare projektbild med prototyper i figma.
Jag visste att jag ville ha en sökfunktion med validering och att jag skulle ha en debouncehook i mitt projekt, med detta i åtanke började jag luta mer och mer åt Vitest med enhets och komponentstester...

Arbetet fortgick med att jag skrev tester, en detaljvy samt filterfunktion. Jag var nöjd med funktionaliteten av min hemsida med började inse att min initiala vision av appen inte riktigt stämde överens med min nuvarande. Jag behöver ingen navbar...ska jag bortse från min wireframe eller stå fast vid min första vision?

Jag skrev en global css för att få hemsidan responsiv enligt de breakpoints jag bestämde initialt (finns i mappen assets) Jag blev relativt nöjd och ansåg att projektet flytit på bättre än väntat. Den nöjda känslan skulle snabbt ändras till frustration när nästa stopp i projektet var att få mina tester gröna. Jag fick skriva om testerna och komponenterna som testades flera gånger utan att få de grönt. Grönt blev rött och rött blev grönt och jag blev yr. Kändes som jag stirrade in i en disko-kula...jag spenderade dagar med att gräva min grop djupare och djupare i AI-träsket med försök att göra mina tester gröna. Till slut gick det. Jag kunde inte undvika att i min lättnad blicka tillbaka på end to end tester, undra om inte det hade varit smidigare ändå?

Jag gick vidare med att göra små förbättringar på hemsidan, en resultaträknare, abort och timeoutcontroller för ListView och DetailsView. Utöver global css gjorde jag komponentcss med fokus på a11y. Visste inte hur omfattande felhanteringen behövde vara så lade till ett nytt test i efterhand som testar felhantering i DetailsView.

## Reflektion

Det brukar vara så enkelt att vara efterklok, men jag vet inte riktigt om det är så enkelt i detta fallet. Det hade hjälpt mig enormt att göra ett ordentligt förarbete. Men med tanke på tidsplanen vet jag inte om den resursfördelningen hade varit bättre. Jag är för oerfaren inom sådana här projektarbeten för att veta vad rätt tillvägagångssätt är. Men något jag absolut hade gjort annorlunda hade varit att planerat veckan bättre. Jag visste ju att jag skulle vara borta i helgen, jag visste att det var malmöfestival och födelsedagsfirande under veckan. Jag hade kunnat planera ut min tillgängliga tid över dagarna mer jämt och med mer omsorg.
Jag hade väldigt gärna försökt använda Playwright bibloteket då jag tror att det hade varit ett testsystem jag hade haft nytta av i framtida projekt både som student men framförallt som yrkesman.

Jag hade nog skrivit mindre testkomponenter initialt och sedan byggt på dem. Även om det kanske inte blir rött till grönt på de sättet som det är tänkt hade det nog gett mig mer. Jag hade nog lärt mig det bättre och sparat en massa tid och frustration. Jag är helt enkelt inte tillräckligt bra för att göra korrekta och utförliga tester innan jag gjort koden. Inte ens om tidsplanen för samma projekt varit dubbelt så långt.

Utformningen på denna country-explorer app är väldigt snarlik andra projekt jag gjort. Jag gick direkt till en design och en kodstruktur jag var van och bekväm med. Jag tog till och med kodstycken från andra projekt. Jag hade gärna lämnat den tryggheten och testat något nytt. Hoppas att med lite mer erfarenhet och kompetens att jag vågar utmana mig själv.
Många gånger jag fastnade förlitade jag mig totalt på AI för hjälp. Ofta löste AI ett problem men gav mig ett eller flera nya. Jag borde vänt mig till min lärare istället för att gräva min grav djupare. Man vill klara det själv och inte vara till besvär...

Något jag dock är stolt över är hur mycket svett och tårar jag lagt på tillgängligheten i mitt projekt. Användaren har varit i fokus och tillgängligheten har varit central i all kod jag skrivit. Jag har även försökt se till att min kod är välstrukturerad och lättläst. Jag har get mig på 5testfiler med 14 tester totalt trots att det är nytt, främmande och svårt.
