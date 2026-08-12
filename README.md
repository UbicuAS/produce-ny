# Produce AS – ny nettside (utkast)

Utkast til ny nettside for Produce AS, laget av Ubicu AS. Bygget som en ren
statisk Astro-side.

**Status: ikke publisert.** Siden ligger ingen steder i drift. Den er merket
`noindex` i `<head>` og sperret i `robots.txt`, og har en tydelig
forhåndsvisningsbanner øverst på hver side. Alle tre sperrene skal fjernes
samtidig – og først når kunden har godkjent innholdet og hostingen er avklart.

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
