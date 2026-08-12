/**
 * Faktaopplysninger hentet fra produce.no (august 2026).
 *
 * MERK: telefonnummeret nedenfor er nummeret som står publisert på
 * produce.no i dag. Det ser ut som et plassholdernummer og bør bekreftes
 * med kunden før siden eventuelt settes i drift.
 */
export const site = {
  name: 'Produce AS',
  tagline: 'Din event-partner',
  phone: '+47 666 99 666',
  phoneHref: 'tel:+4766699666',
  email: 'post@produce.no',
  emailHref: 'mailto:post@produce.no',
  facebook: 'https://facebook.com/produceas',
  liveUrl: 'https://produce.no',
} as const;

/**
 * Bildene har ikke felles format: galleriet blander liggende 1920×1080 og
 * stående 1080×1420, og pakkebildene er brede 1080×420. Derfor bærer hvert
 * bilde sine egne mål her, i stedet for at malene hardkoder ett tall for
 * alle. Målene er lest ut av filene selv (august 2026), ikke antatt.
 *
 * Beholderne har aspect-ratio i CSS, så riktige mål gir ikke i seg selv
 * mindre layout-hopp – men attributtene skal ikke lyve om filene, og uten
 * dem må nettleseren gjette formatet på bildet inne i beholderen.
 */
export type Maal = { bredde: number; hoyde: number };

export type Tjeneste = Maal & {
  tittel: string;
  tekst: string;
  bilde: string;
  alt: string;
};

export const tjenester: Tjeneste[] = [
  {
    tittel: 'Festival og konserter',
    tekst:
      'Fra intime klubbkonserter til store utendørsfestivaler. Vi rigger PA, scenelys og backline, kjører lyd foran og på scenen, og sørger for at bandet møter et anlegg som er klart når de går på.',
    bilde: '/bilder/galleri/konsert.webp',
    alt: 'Publikum med hendene i været foran en opplyst konsertscene.',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    tittel: 'Idrettsarrangement',
    tekst:
      'Stemning bygges fra tribunen og opp. Vi leverer lyd som når hele hallen, effektlys til innmarsj og seiersøyeblikk, og teknisk crew som kjenner dramaturgien i et kampoppsett.',
    bilde: '/bilder/galleri/haakonshall.webp',
    alt: 'Håndballkamp i en full arena med blått og rødt effektlys over banen og tribunene.',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    tittel: 'Kurs og konferanse',
    tekst:
      'Profesjonell lyd, lys og bilde til fagdager, kick-off og årsmøter. Trådløse mikrofoner som ikke svikter, ryddig scenebilde og en tekniker i salen som løser ting før de blir et problem.',
    bilde: '/bilder/galleri/kurs-og-konferanse.webp',
    alt: 'Publikum sittende i en mørk konferansesal foran en opplyst storskjerm.',
    bredde: 1376,
    hoyde: 768,
  },
  {
    tittel: 'Privat og næringsliv',
    tekst:
      'Bryllup, jubileer, firmafester og produktlanseringer. Vi prosjekterer sammen med deg, leverer utstyret og stiller med folk – enten det er én høyttaler i et telt eller full produksjon.',
    bilde: '/bilder/galleri/firmafest.webp',
    alt: 'Festtelt med langbord og benker badet i lilla og rosa dekorlys.',
    bredde: 1920,
    hoyde: 1080,
  },
];

export type Pakke = Maal & {
  nr: number;
  navn: string;
  prisInkl: string;
  prisEks: string;
  innhold: string[];
  tekst: string;
  bilde: string;
  alt: string;
  fremhevet?: boolean;
};

export const pakker: Pakke[] = [
  {
    nr: 1,
    navn: 'Pakke 1',
    prisInkl: '1.500,-',
    prisEks: '1.200,-',
    innhold: ['Trådløs mikrofon', '1 × Bose L1 Pro8'],
    tekst:
      'Superportabel PA med klar, kraftig lyd og 180° dekning. Innebygde EQ-innstillinger for både live og avspilt musikk, og Bluetooth. Perfekt for små og mellomstore arrangementer.',
    bilde: '/bilder/pakker/pakke-1.webp',
    alt: 'Pakke 1: trådløs mikrofon og én Bose L1 Pro8 søylehøyttaler.',
    bredde: 1080,
    hoyde: 420,
  },
  {
    nr: 2,
    navn: 'Pakke 2',
    prisInkl: '2.800,-',
    prisEks: '2.240,-',
    innhold: ['Discolys', 'Trådløs mikrofon', '2 × Bose Pro16'],
    tekst:
      'To søylehøyttalere gir bredere dekning og mer trøkk, og discolyset løfter rommet så snart dansegulvet åpner. Bluetooth og innebygde EQ-innstillinger.',
    bilde: '/bilder/pakker/pakke-2.webp',
    alt: 'Pakke 2: discolys, trådløs mikrofon og to Bose Pro16 søylehøyttalere.',
    bredde: 1080,
    hoyde: 420,
  },
  {
    nr: 3,
    navn: 'Pakke 3',
    prisInkl: '3.500,-',
    prisEks: '2.800,-',
    innhold: [
      '4 kraftige discolys',
      'Hazer med væske',
      'Trådløs mikrofon',
      '2 × Bose Pro16',
    ],
    tekst:
      'Vår mest komplette festpakke. Fire kraftige discolys og hazer gjør lysstrålene synlige i luften, og gir kvelden et helt annet uttrykk. Normalt forbruk av hazervæske er inkludert.',
    bilde: '/bilder/pakker/pakke-3.webp',
    alt: 'Pakke 3: fire discolys, hazer, trådløs mikrofon og to Bose Pro16 søylehøyttalere.',
    bredde: 1080,
    hoyde: 420,
    fremhevet: true,
  },
  {
    nr: 4,
    navn: 'Pakke 4',
    prisInkl: '2.800,-',
    prisEks: '2.240,-',
    innhold: ['Dekorlys', 'Trådløs mikrofon', '2 × Bose Pro16'],
    tekst:
      'Samme lydløsning som pakke 2, men med dempet dekorlys i stedet for discolys. Et rolig, stemningsfullt uttrykk som kler bryllup og jubileer.',
    bilde: '/bilder/pakker/pakke-4.webp',
    alt: 'Pakke 4: dekorlys, trådløs mikrofon og to Bose Pro16 søylehøyttalere.',
    bredde: 1080,
    hoyde: 420,
  },
];

export type GalleriBilde = Maal & { src: string; alt: string; tekst: string };

export const galleri: GalleriBilde[] = [
  {
    src: '/bilder/galleri/staysman.webp',
    alt: 'Bandet Staysman på en fullriggeet scene med truss, spotlights og røyk, foran et tett publikum.',
    tekst: 'Staysman – full scenerigg med truss og effektlys',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/pride.webp',
    alt: 'Utendørsscene i dagslys med lyskastere i regnbuens farger over et band og publikum.',
    tekst: 'Pride – utendørs scene med farget lysdesign',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/haakonshall.webp',
    alt: 'Håndballkamp i en full arena med blått og rødt lys og projeksjon på banen.',
    tekst: 'Arenaproduksjon – lys og projeksjon på bane',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/lansering-mustang.webp',
    alt: 'Rød elbil avduket i CO2-røyk og rosa scenelys foran et sittende publikum.',
    tekst: 'Billansering – avduking med røykeffekt og lys',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/gullfest.webp',
    alt: 'Band på scene foran et stjernedrapert bakteppe med blått scenelys.',
    tekst: 'Gullfest – scene med stjernebakteppe',
    bredde: 1080,
    hoyde: 1420,
  },
  {
    src: '/bilder/galleri/rigg-konferanse.webp',
    alt: 'Konferansesal med stolrader og trussrigg med lyskastere over en lav scene.',
    tekst: 'Konferanse – trussrigg og scene under montering',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/dansegalla.webp',
    alt: 'Dansegalla i telt sett fra lydbordet, med Yamaha-mikser i forgrunnen og opplyst scene bak publikum.',
    tekst: 'Dansegalla – sett fra lydbordet',
    bredde: 1080,
    hoyde: 1420,
  },
  {
    src: '/bilder/galleri/portal.webp',
    alt: 'Lastebil under en trussportal med farget effektlys, fotografert på snø om kvelden.',
    tekst: 'Trussportal med effektlys',
    bredde: 1080,
    hoyde: 1420,
  },
  {
    src: '/bilder/galleri/skjermhengere.webp',
    alt: 'To mobile LED-skjermer montert på tilhengere, utendørs i dagslys.',
    tekst: 'Mobile LED-skjermer på tilhenger',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/firmafest.webp',
    alt: 'Festtelt med langbord og benker badet i lilla og rosa dekorlys.',
    tekst: 'Firmafest – dekorlys i telt',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/redneks.webp',
    alt: 'Artister på scenen omgitt av høye flammesøyler, foran et publikum med hendene i været.',
    tekst: 'Redneks – konsert med flammeeffekter',
    bredde: 1920,
    hoyde: 1080,
  },
  {
    src: '/bilder/galleri/tom-scene.webp',
    alt: 'Ferdig rigget utendørsscene med tak i skumringen, med line array-høyttalere på hver side og rødt og lilla scenelys.',
    tekst: 'Mobil utendørsscene, ferdig rigget før dørene åpner',
    bredde: 1920,
    hoyde: 1080,
  },
];
