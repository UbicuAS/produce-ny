// @ts-check
import { defineConfig } from 'astro/config';

// Ren statisk build. Med vilje: da kan den samme dist/-mappa serveres
// like godt fra Cloudflare Workers (assets), Cloudflare Pages eller et
// vanlig webhotell via FTP. Hostingen for produce.ubicu.cloud var ikke
// avklart da siden ble bygget, og en statisk build laser oss ikke til
// en bestemt leverandor.
export default defineConfig({
  site: 'https://produce.ubicu.cloud',
  output: 'static',
  build: {
    // Gir /kontakt/index.html -> fungerer likt pa Workers, Pages og webhotell.
    format: 'directory',
  },
  compressHTML: true,
});
