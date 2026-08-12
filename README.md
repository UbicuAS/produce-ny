# Produce AS – ny nettside (utkast)

Utkast til ny nettside for Produce AS, laget av Ubicu AS. Bygget som en ren
statisk Astro-side.

**Status: ikke publisert noe sted.** Målet er å legge den ut som
forhåndsvisning på `produce.ubicu.cloud` for kundegodkjenning. Se
«Forhåndsvisning kontra drift» under.

## Kom i gang

```
npm install
npm run build     # bygger til dist/
npm run serve     # serverer dist/ på http://localhost:4321
```

`npm run preview` (Astros egen preview-server) **henger** når prosjektet ligger
på SMB-delingen `Z:` – den binder aldri porten og skriver ingenting til
konsollen. Målt 2026-08-12: prosessen kjørte 25 sekunder uten output og måtte
avbrytes. Bruk `npm run serve` i stedet; den serverer nøyaktig de samme filene
fra `dist/`, som er det hostingen kommer til å gjøre uansett.

Lokal server er også registrert i `../.claude/launch.json` som `produce-ny`.

## Innhold

| Side | Fil | Rute |
|------|-----|------|
| Forside | `src/pages/index.astro` | `/` |
| Kontakt | `src/pages/kontakt.astro` | `/kontakt/` |
| 404 | `src/pages/404.astro` | `/404.html` |

Forsiden har seksjonene hero, nøkkeltall, tjenester, om oss, pakkeløsninger
(kort- og tabellvisning) og galleri.

All tekst, priser, bilder og kontaktopplysninger ligger samlet i
`src/data/site.ts`. Endre innhold der, ikke i malene.

## Forhåndsvisning kontra drift

`produce.ubicu.cloud` er en **forhåndsvisning for kundegodkjenning**, ikke
kundens side i drift. Kundens egen side er `produce.no` og skal ikke røres.

Fordi innholdet er nesten identisk med produce.no, må forhåndsvisningen aldri
kunne finnes i søk – to like sider konkurrerer om de samme søkeordene, til
skade for kundens egen synlighet.

Alt dette styres av **én bryter**: `erForhandsvisning` i `src/data/site.ts`.
Den slår av og på fire ting samtidig:

| # | Sperre | Hvor |
|---|--------|------|
| 1 | `noindex, nofollow, noarchive` | `src/layouts/Base.astro` |
| 2 | `Disallow: /` i robots.txt | `src/pages/robots.txt.ts` |
| 3 | Forhåndsvisningsbanner øverst | `src/layouts/Base.astro` |
| 4 | «ikke endelig godkjent» i footeren | `src/components/Footer.astro` |

### Flytteoppgaven, den dagen kunden godkjenner

To linjer:

1. `erForhandsvisning = false` i `src/data/site.ts`
2. `site: 'https://produce.no'` i `astro.config.mjs`

Alt annet følger etter. Adressen bor kun i `astro.config.mjs`; `Base.astro`
leser `Astro.site`, så canonical, `og:url` og `og:image` snur av seg selv.
Dette er verifisert ved å faktisk gjøre byttet og bygge – ikke antatt.

Husk i tillegg, utenfor koden: fjern DNS-oppføringen for
`produce.ubicu.cloud` når den ikke lenger skal brukes, så preview-en ikke
blir liggende åpen etter lansering.

## Hosting – ikke avklart

Bygget er med vilje helt statisk (`output: 'static'`, `format: 'directory'`),
slik at `dist/` kan serveres like godt fra Cloudflare Workers, Cloudflare Pages
eller et vanlig webhotell via FTP. Ingenting i prosjektet låser oss til én
leverandør, og det finnes **ingen** wrangler-config her – den legges først inn
når valget er tatt.

Det gamle `npm run deploy`-skriptet kalte `wrangler deploy` uten at noen
wrangler-config fantes, og ville derfor alltid feilet. Det er fjernet framfor å
la det stå og se ut som en fungerende utvei.

Merk at `produce.ubicu.cloud` krever en DNS-oppføring under `ubicu.cloud`.
Den skal ikke opprettes uten at Marius har godkjent det.

## Må avklares med kunden før lansering

- **Telefonnummeret.** `+47 666 99 666` i `src/data/site.ts` er nummeret som
  står på produce.no i dag, men det ser ut som et plassholdernummer. Må
  bekreftes.
- **Kontaktskjemaet** har ingen server å sende til. Det åpner i dag
  e-postprogrammet via `mailto:`. Ved lansering må det kobles til et ekte
  endepunkt med spamfilter.
- **Organisasjonsnummer, besøksadresse og personvernerklæring** mangler helt.
  En nettside for et norsk AS bør ha dette.
- **Bildene** er hentet fra produce.no og kundens egen mappe. Rettighetene bør
  bekreftes før publisering.
