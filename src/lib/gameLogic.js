// Core Kurdle game logic: deterministic word-of-the-day selection and
// guess evaluation. No randomness at runtime -- the same date always
// produces the same word for a given dialect's answer list, so every
// player sees the same puzzle without needing a server.

const EPOCH = new Date('2026-08-22T00:00:00Z'); // Kurdle's launch day = puzzle #1
const MS_PER_DAY = 86_400_000;

/** Days since launch, using UTC calendar days (not local time) so every
 * player worldwide gets the same puzzle number on the same UTC date. */
export function getPuzzleNumber(date = new Date()) {
  const today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const epochDay = Date.UTC(EPOCH.getUTCFullYear(), EPOCH.getUTCMonth(), EPOCH.getUTCDate());
  return Math.floor((today - epochDay) / MS_PER_DAY) + 1;
}

/** Picks today's answer for a dialect. `answers` must be a non-empty,
 * stable-ordered array -- changing its order changes history, so word
 * lists are append-only in practice once puzzles have shipped. */
export function getWordOfDay(answers, date = new Date()) {
  const n = getPuzzleNumber(date);
  const idx = ((n - 1) % answers.length + answers.length) % answers.length;
  return { word: answers[idx], puzzleNumber: n };
}

/**
 * Wordle-style evaluation with correct duplicate-letter handling:
 *   1st pass: mark exact-position matches as 'correct', consuming that
 *             letter from the answer's remaining pool.
 *   2nd pass: for each non-correct guess letter, mark 'present' only if
 *             the answer still has an unconsumed copy of it, else 'absent'.
 * This is what makes e.g. guessing "sassy" against answer "sooty" mark
 * only one 's' as present, not both.
 */
export function evaluateGuess(guess, answer) {
  const guessLetters = [...guess];
  const answerLetters = [...answer];
  const result = new Array(guessLetters.length).fill('absent');
  const remaining = [...answerLetters];

  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i] = 'correct';
      remaining[remaining.indexOf(guessLetters[i])] = null;
    }
  }
  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i] === 'correct') continue;
    const pos = remaining.indexOf(guessLetters[i]);
    if (pos !== -1) {
      result[i] = 'present';
      remaining[pos] = null;
    }
  }
  return result;
}

export function isWin(evaluation) {
  return evaluation.every((s) => s === 'correct');
}
