import type { APIRoute } from 'astro';
import { erForhandsvisning } from '../data/site';

/**
 * robots.txt genereres, den ligger ikke som statisk fil i public/.
 *
 * Grunnen: så lenge den var en fil for seg, kunne noen skru av
 * `noindex`-metaen ved lansering og likevel etterlate `Disallow: /` her –
 * eller motsatt, fjerne denne og glemme metaen. Da har man en side som
 * enten er usynlig uten å vite det, eller åpen uten å ville det.
 *
 * Nå følger den samme bryter som resten: `erForhandsvisning` i
 * src/data/site.ts.
 */
export const GET: APIRoute = ({ site }) => {
  const linjer = erForhandsvisning
    ? [
        '# FORHÅNDSVISNING for kundegodkjenning – ikke kundens side i drift.',
        '#',
        '# Hele siden er sperret med vilje. Innholdet er nesten identisk med',
        '# produce.no, og to like sider ville konkurrert om de samme søkeordene',
        '# til skade for kundens egen synlighet.',
        '#',
        '# Åpnes ved å sette erForhandsvisning = false i src/data/site.ts.',
        'User-agent: *',
        'Disallow: /',
      ]
    : [
        '# Produce AS',
        'User-agent: *',
        'Allow: /',
        '',
        // Sitemap-linjen skal kun stå når siden faktisk skal indekseres.
        // Å peke søkemotorer mot et sitemap på en sperret preview er å be
        // om at den blir crawlet likevel.
        site ? `Sitemap: ${new URL('sitemap-index.xml', site).href}` : '',
      ];

  return new Response(linjer.filter(Boolean).join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
