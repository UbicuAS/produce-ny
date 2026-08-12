#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Lager logofilene til nettsiden ut fra den ekte logopakken.

    python tools/lag-logo.py

Kilde:  ../Produce AS/Logo/SVG/Untitled-1.svg  (kundens logopakke)
Lager:  src/assets/produce-merke.svg      av/på-merket alene
        src/assets/produce-ordmerke.svg   ordet PRODUCE alene
        src/assets/produce-logo.svg       hele logoen, stående
        public/favicon.svg                merket i en mørk, avrundet rute

Kurvene er hentet rett fra logopakken - ingenting er tegnet på nytt. Det som
gjøres er tre ting, og de er grunnen til at dette skriptet finnes:

1. Originalen er laget for hvit bakgrunn: den maler et hvitt rektangel med
   logoen stanset ut. Her plukkes selve logokurvene ut, slik at logoen kan
   ligge på hva som helst.
2. Ringen og bokstavene får `currentColor` - da følger de tekstfargen og
   virker på både lys og mørk bunn. Den røde streken beholder logoens egen
   #ED1C24 og skal ikke endres.
3. Motformene i P, R, O og D ligger som subpaths i bokstavkurvene. De må ha
   fill-rule="evenodd", ellers blir bokstavene massive. Originalen slapp unna
   med å male dem hvite oppå - det virker bare mot hvit bakgrunn.

Utsnittene (viewBox) er målt med getBBox() i nettleser, ikke gjettet.
"""

import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
ROT = os.path.dirname(HER)
KILDE = os.path.join(ROT, "..", "Produce AS", "Logo", "SVG", "Untitled-1.svg")

ROD = "#ed1c24"          # målt ut av Logo/Produce logo svart.png
MERKE_BOKS = "25.71 0.26 164.01 172.82"
ORD_BOKS = "4.48 191.26 207.93 35.08"
FULL_BOKS = "4.48 0.26 207.93 226.08"

MERKNAD = """<!-- Produce AS. Generert av tools/lag-logo.py fra logopakken - ikke rediger
     for hånd, og ikke tegn kurvene på nytt. Ringen og bokstavene bruker
     currentColor; den røde streken er logoens egen og skal stå. -->"""


def les_kurver():
    with open(KILDE, encoding="utf-8") as f:
        s = f.read()
    paths = [(m.group(1), m.group(2)) for m in
             re.finditer(r'<path[^>]*?class="([^"]+)"[^>]*?d="([^"]+)"', s)]
    if len(paths) != 14:
        raise SystemExit(
            "Logopakken ser annerledes ut enn ventet (%d kurver, ventet 14). "
            "Sjekk %s før du stoler på resultatet." % (len(paths), KILDE))
    ring = paths[1][1]
    strek = paths[2][1]
    # paths[3:10] = P R O D U C E. paths[10:] er de samme motformene en gang
    # til, malt hvite i originalen - de skal IKKE med her.
    bokstaver = " ".join(d for _, d in paths[3:10])
    return ring, strek, bokstaver


def svg(viewbox, kropp):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" fill="none"\n'
            '     aria-hidden="true" focusable="false">\n%s\n%s\n</svg>\n'
            % (viewbox, MERKNAD, kropp))


def main():
    ring, strek, bokstaver = les_kurver()

    p_ring = '  <path fill="currentColor" d="%s"/>' % ring
    p_strek = '  <path fill="%s" d="%s"/>' % (ROD, strek)
    p_ord = '  <path fill="currentColor" fill-rule="evenodd" d="%s"/>' % bokstaver

    filer = {
        os.path.join(ROT, "src", "assets", "produce-merke.svg"):
            svg(MERKE_BOKS, p_ring + "\n" + p_strek),
        os.path.join(ROT, "src", "assets", "produce-ordmerke.svg"):
            svg(ORD_BOKS, p_ord),
        os.path.join(ROT, "src", "assets", "produce-logo.svg"):
            svg(FULL_BOKS, p_ring + "\n" + p_strek + "\n" + p_ord),
    }

    # Favicon: merket sentrert i 32x32 med 5 px luft. Regnet ut fra den målte
    # boksen, ikke prøvd seg fram.
    skala = 22.0 / 172.82
    dx = (32 - 164.01 * skala) / 2 - 25.71 * skala
    dy = 5 - 0.26 * skala
    filer[os.path.join(ROT, "public", "favicon.svg")] = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">\n'
        '  <rect width="32" height="32" rx="7" fill="#0a0a0e"/>\n'
        '  <g transform="translate(%.3f %.3f) scale(%.5f)">\n'
        '    <path fill="#f5f5f7" d="%s"/>\n'
        '    <path fill="%s" d="%s"/>\n'
        '  </g>\n</svg>\n' % (dx, dy, skala, ring, ROD, strek)
    )

    for sti, innhold in filer.items():
        os.makedirs(os.path.dirname(sti), exist_ok=True)
        with open(sti, "w", encoding="utf-8", newline="\n") as f:
            f.write(innhold)
        print("skrev %s (%d byte)" % (os.path.relpath(sti, ROT), len(innhold)))


if __name__ == "__main__":
    main()
