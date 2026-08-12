#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bygger siden og legger den ut på produce.ubicu.cloud.

    npm run publiser

Bygger `dist/` og dytter innholdet til branchen `gh-pages`, som GitHub Pages
serverer. Kildekoden ligger på `main`; `gh-pages` inneholder kun det ferdige
bygget og har sin egen, flate historikk.

HVORFOR IKKE EN WORKFLOW: den riktige løsningen er å la GitHub bygge selv ved
push til `main`, og den workflowen ligger ferdig i `.github/workflows/`. Den
kan bare ikke pushes: GitHub nekter OAuth-apper å skrive under
`.github/workflows/` uten `workflow`-scope, og innloggingen på denne maskinen
har det ikke. Får tokenet det scopet, push workflowen og sett Pages tilbake
til «GitHub Actions» som kilde - da kan dette skriptet slettes.

Skriptet nekter å legge ut hvis arbeidsmappa har ucommittede endringer. Det
som ligger ute skal alltid svare til en commit på `main`.
"""

import os
import shutil
import subprocess
import sys

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRANCH = "gh-pages"
ARBEIDSTRE = os.path.join(ROT, ".gh-pages-arbeidstre")


def kjor(*kommando, **kvarg):
    """Kjør en kommando i prosjektroten og stopp hvis den feiler."""
    mappe = kvarg.pop("mappe", ROT)
    stille = kvarg.pop("stille", False)
    # npm er npm.cmd på Windows, og CreateProcess finner den ikke uten at vi
    # slår opp full sti først.
    program = shutil.which(kommando[0])
    if not program:
        raise SystemExit("finner ikke %s i PATH" % kommando[0])
    r = subprocess.run((program,) + kommando[1:], cwd=mappe,
                       capture_output=stille, text=True)
    if r.returncode != 0:
        if stille and r.stderr:
            sys.stderr.write(r.stderr)
        raise SystemExit("stoppet: %s ga %d" % (" ".join(kommando), r.returncode))
    return (r.stdout or "").strip()


def main():
    skitten = kjor("git", "status", "--porcelain", stille=True)
    if skitten:
        print("Arbeidsmappa har endringer som ikke er committet:\n")
        print(skitten)
        raise SystemExit(
            "\nCommit dem foerst. Det som ligger ute skal svare til en commit.")

    commit = kjor("git", "rev-parse", "--short", "HEAD", stille=True)
    gren = kjor("git", "rev-parse", "--abbrev-ref", "HEAD", stille=True)
    if gren != "main":
        print("ADVARSEL: du staar paa '%s', ikke 'main'." % gren)

    print("Bygger ...")
    kjor("npm", "run", "build")

    dist = os.path.join(ROT, "dist")
    for maa_finnes in ("index.html", "CNAME", ".nojekyll"):
        if not os.path.exists(os.path.join(dist, maa_finnes)):
            raise SystemExit(
                "dist/%s mangler - legger ikke ut. CNAME holder paa domenet, "
                "og uten .nojekyll dropper GitHub Pages hele _astro/-mappa."
                % maa_finnes)

    # Eget arbeidstre for gh-pages, saa main-mappa aldri roeres.
    if os.path.isdir(ARBEIDSTRE):
        kjor("git", "worktree", "remove", "--force", ARBEIDSTRE, stille=True)
    finnes = kjor("git", "branch", "--list", BRANCH, stille=True)
    if finnes:
        kjor("git", "worktree", "add", ARBEIDSTRE, BRANCH, stille=True)
    else:
        kjor("git", "worktree", "add", "--orphan", "-b", BRANCH, ARBEIDSTRE,
             stille=True)

    try:
        # Toem alt unntatt .git-pekeren, og legg inn det ferske bygget.
        for navn in os.listdir(ARBEIDSTRE):
            if navn == ".git":
                continue
            sti = os.path.join(ARBEIDSTRE, navn)
            shutil.rmtree(sti) if os.path.isdir(sti) else os.remove(sti)
        shutil.copytree(dist, ARBEIDSTRE, dirs_exist_ok=True)

        kjor("git", "add", "-A", mappe=ARBEIDSTRE)
        if not kjor("git", "status", "--porcelain", mappe=ARBEIDSTRE, stille=True):
            print("Ingen endring i bygget - ingenting aa legge ut.")
            return
        kjor("git", "commit", "-m", "Bygget fra main %s" % commit,
             mappe=ARBEIDSTRE, stille=True)
        print("Legger ut ...")
        kjor("git", "push", "origin", BRANCH, mappe=ARBEIDSTRE)
    finally:
        kjor("git", "worktree", "remove", "--force", ARBEIDSTRE, stille=True)

    print("\nLagt ut fra main %s. Siden er https://produce.ubicu.cloud/" % commit)
    print("GitHub Pages bruker et minutt eller to paa aa oppdatere seg.")


if __name__ == "__main__":
    main()
