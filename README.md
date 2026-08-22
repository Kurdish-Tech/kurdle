# Kurdle

A daily Kurdish word-guessing game — Wordle rules, three dialects.

**[Play it](https://kurdish-tech.github.io/kurdle/)** · built by [Kurdish-Tech](https://github.com/Kurdish-Tech)

## What makes it Kurdish, not just a Wordle reskin

- **Kurmancî, Soranî, and Zazakî**, switchable per game — Soranî uses a real
  RTL Arabic-script keyboard, not a Latin transliteration.
- Every finished game reveals the word's **actual dictionary definition**
  from [Ferheng](https://kurdish-tech.github.io/) — win or lose, you learn a
  real word.
- Answer words are cross-checked against real usage frequency in
  [KurdishCorpus-clean](https://huggingface.co/datasets/kurdish-tech/KurdishCorpus-clean)
  (2.97B tokens), so the daily word is something an actual speaker would
  recognize — not just any 5-letter dictionary headword.

## How it works — no server, no accounts

Everything runs client-side. Today's word is picked deterministically from
the puzzle-number-since-launch (same word for everyone, everywhere, on a
given UTC date) — the same technique the original Wordle used before it had
a backend. Stats and in-progress state live in `localStorage`.

## Word lists

`public/words/{kmr,ckb,zza}.json`, each `{ guesses, answers, glosses }`:

- `guesses` — every clean 5-letter headword from Ferheng's dictionary,
  proper nouns excluded (POS-tagged `Serenav`, plus a lowercase-only filter
  for the Latin dialects), accepted as valid input.
- `answers` — the subset of `guesses` with real occurrences in
  KurdishCorpus-clean's training split (Kurmancî ≥15, Soranî ≥8, Zazakî ≥2 —
  thresholds tuned per dialect's much smaller corpus share), deterministically
  shuffled so the sequence isn't alphabetical.
- `glosses` — first dictionary sense per answer word, shown after the game.

Regenerating them requires both a Ferheng dictionary checkout and the
KurdishCorpus-clean training corpus locally; see `scripts/` in the corpus
project for the extraction pipeline. Word lists are append-only in practice
once puzzles have shipped — reordering `answers` changes which word ships on
an already-played date.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173/kurdle/
npm run build     # -> dist/
```

Deploys automatically to GitHub Pages on push to `main` (see
`.github/workflows/deploy.yml`).

## Known limitations

- **Zazakî's answer pool is small** (188 words ≈ 6 months of daily puzzles)
  — Zazakî has the least dictionary and corpus coverage of the three
  dialects across every Kurdish-Tech project, not something specific to
  this game.
- Physical-keyboard typing is Latin-dialect only (Kurmancî/Zazakî); Soranî
  play is on-screen-keyboard or an OS-level Kurdish/Arabic IME.
- No cross-device sync — stats are per-browser (`localStorage`), by design,
  to keep this free to run indefinitely.

## License

Code: MIT. Word lists: CC BY-SA 4.0, inherited from
[Ferheng](https://kurdish-tech.github.io/)'s Wîkîferheng data.

---

*Built by [Kurdish-Tech](https://github.com/Kurdish-Tech) — open-source digital
infrastructure for the Kurdish language. Maintained by Alan Hesen.*
