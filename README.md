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
```

Deretter startes `produce-ny` fra `../.claude/launch.json` – den svarer på
`http://localhost:4321`.

**Serveren leser fra `C:\Ubicu\preview\produce-ny`, ikke fra `Z:`.** Den kopierer
`dist/` dit selv ved oppstart. Bygger du på nytt mens serveren kjører, oppdater
kopien og last om nettleseren – serveren trenger ikke restart:

```
npm run sync
```

Grunnen til kopisteget: en server som lever med åpne filhåndtak mot SMB-delingen
`Z:` henger når delingen ryker, og tar den MSIX-pakkede Claude-appen med seg i
fallet. Hele forklaringen står i `../.claude/preview/README.md`.

**`npm run serve` og `npm run preview` er fjernet.** Begge lot en langtlevende
prosess stå med arbeidsmappe på `Z:` – `npm run` holder i tillegg node og cmd i
live som foreldre, med samme arbeidsmappe. `astro preview` hang allerede i
praksis: målt 2026-08-12 band den aldri porten, skrev ingenting til konsollen og
måtte avbrytes etter 25 sekunder. De er fjernet framfor å stå igjen og se ut som
fungerende utveier.

**Ikke bruk `npm run dev` så lenge prosjektet ligger på `Z:`.** Astros
utviklingsserver er langtlevende og legger i tillegg en filovervåker på
delingen. Bygg i stedet – `npm run build` er kortlevd – og se på resultatet via
`produce-ny`-serveren.

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

## Logo og farger

Logoen er kundens egen, hentet fra logopakken i `../Produce AS/Logo/`.
Kurvene er ikke tegnet på nytt.

```
python tools/lag-logo.py
```

lager fire filer ut fra `../Produce AS/Logo/SVG/Untitled-1.svg`:

| Fil | Hva | Brukes av |
|---|---|---|
| `src/assets/produce-merke.svg` | av/på-merket alene | topplinja |
| `src/assets/produce-ordmerke.svg` | ordet PRODUCE alene | topplinja |
| `src/assets/produce-logo.svg` | hele logoen, stående | bunnteksten |
| `public/favicon.svg` | merket i mørk rute | fanen |

**Ikke rediger de fire filene for hånd** – kjør skriptet på nytt. Det gjør tre
ting originalen ikke kan: plukker logokurvene ut av det hvite bakgrunns-
rektangelet de er stanset ut av, setter ring og bokstaver til `currentColor`
så logoen virker på mørk bunn, og gir bokstavene `fill-rule="evenodd"` så
motformene i P, R, O og D blir hull og ikke massive flater.

**Den røde er logoens egen, `#ED1C24`**, målt ut av `Produce logo svart.png`.
Den står urørt i logofilene. Aksentfargene i `src/styles/global.css` er samme
røde justert i lyshet, fordi én rød ikke kan både være lys nok til å leses som
tekst på nesten svart og mørk nok til å ha hvit tekst oppå seg:

| Token | Verdi | Rolle |
|---|---|---|
| `--accent` | `#e51c23` | fylte flater – hvit tekst oppå holder 4,6:1 |
| `--accent-text` | `#f5555c` | rød tekst på mørk flate – 5,0:1 mot den lyseste flaten |
| `--accent-text-hover` | `#ff8a8f` | hover på lenker (lysere, ikke mørkere) |
| `--accent-strong` | `#b8151b` | hover på fylt flate |
| `--accent-ink` | `#ffffff` | tekst oppå rød flate |

Bruker du rød som **tekst**, bruk `--accent-text`. Bruker du rød som **flate**,
bruk `--accent` med `--accent-ink` oppå. Blander du dem, ryker AA.

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

## Hosting – GitHub Pages

Siden ligger på **GitHub Pages**, samme oppsett som `idebolig.ubicu.cloud`.
Kildekoden er på `main`; branchen `gh-pages` inneholder kun det ferdige bygget
og er den GitHub serverer.

```
npm run publiser
        │
        ├─ nekter hvis noe er ucommittet
        ├─ npm run build
        └─ dytter dist/ til gh-pages → produce.ubicu.cloud
```

**Hvorfor et skript og ikke en workflow.** Den riktige løsningen er å la GitHub
bygge selv ved push til `main`. Den workflowen er skrevet og ligger klar på den
**lokale** branchen `workflow-venter` (`.github/workflows/publiser.yml`) – den
finnes ikke på GitHub, for den kan ikke pushes dit: GitHub nekter OAuth-apper å
skrive under `.github/workflows/` uten `workflow`-scope, og innloggingen på
maskinen har det ikke.

Slik bytter du over den dagen tokenet har scopet
(`gh auth refresh -h github.com -s workflow`, kjørt fra Claude – tokenet ligger
i den MSIX-pakkede appens legitimasjonslager, ikke i din egen terminal):

```bash
git checkout main && git merge workflow-venter && git push origin main
```

Sett så Pages-kilden til «GitHub Actions» i repoinnstillingene, og slett
`tools/publiser.py` og denne seksjonen.

**To filer i `public/` holder siden oppe, og begge er lette å slette i vanvare:**

| Fil | Hva den gjør | Hvis den forsvinner |
|---|---|---|
| `CNAME` | holder på custom-domenet | siden faller tilbake til `ubicuas.github.io` |
| `.nojekyll` | slår av Jekyll-behandling | hele `_astro/`-mappa droppes, og siden lastes uten stil og skript |

Astro kopierer begge til `dist/` ved bygg, og `npm run publiser` nekter å legge
ut hvis en av dem mangler.

**DNS ligger hos Domeneshop**, ikke hos GitHub – `ubicu.cloud` bruker
navnetjenerne `ns1-3.hyp.net`. Underdomenet peker på GitHub Pages' fire
adresser. Kun den ene oppføringen er rørt; `ubicu.cloud` sine MX-, SPF- og
DMARC-oppføringer er andre oppføringstyper og skal ikke endres.

**Én begrensning verdt å kjenne til:** GitHub Pages kan ikke sette egne
HTTP-headere. Det betyr ingen CSP og ingen `X-Robots-Tag: noindex` på
tjenernivå. Skjulingen for søkemotorer hviler derfor på metataggen og
`robots.txt`, som begge følger `erForhandsvisning`-bryteren. Det er samme
situasjon som Idébolig-forhåndsvisningen står i. Trenger vi ekte headere
senere, må siden flyttes til Cloudflare Pages eller Workers – bygget er
statisk nettopp for at et slikt bytte skal være mulig.

Det gamle `npm run deploy`-skriptet kalte `wrangler deploy` uten at noen
wrangler-config fantes, og ville derfor alltid feilet. Det er fjernet framfor å
la det stå og se ut som en fungerende utvei.

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
