// Per-dialect stats in localStorage -- no server, no accounts. Matches how
// the original Wordle worked before login/cloud sync existed.

const KEY_PREFIX = 'kurdle:stats:';
const STATE_KEY_PREFIX = 'kurdle:today:';

const EMPTY_STATS = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0], // index 0 = won in 1 guess ... index 5 = won in 6
  lastPuzzleNumber: null,
};

export function loadStats(dialectKey) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + dialectKey);
    if (!raw) return { ...EMPTY_STATS, guessDistribution: [...EMPTY_STATS.guessDistribution] };
    const parsed = JSON.parse(raw);
    return { ...EMPTY_STATS, ...parsed };
  } catch {
    return { ...EMPTY_STATS, guessDistribution: [...EMPTY_STATS.guessDistribution] };
  }
}

export function recordResult(dialectKey, { puzzleNumber, won, guessCount }) {
  const stats = loadStats(dialectKey);

  // Guard against double-counting: e.g. a re-render replaying the same
  // finished game, or the same tab reopened on the same puzzle.
  if (stats.lastPuzzleNumber === puzzleNumber) return stats;

  stats.played += 1;
  if (won) {
    stats.wins += 1;
    stats.currentStreak += 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    stats.guessDistribution[guessCount - 1] += 1;
  } else {
    stats.currentStreak = 0;
  }
  stats.lastPuzzleNumber = puzzleNumber;

  localStorage.setItem(KEY_PREFIX + dialectKey, JSON.stringify(stats));
  return stats;
}

// In-progress game state (today's guesses so far), so a reload/close mid-
// puzzle doesn't lose progress. Keyed by puzzle number, so tomorrow's visit
// naturally starts fresh without needing an explicit "new day" reset.
export function loadTodayState(dialectKey, puzzleNumber) {
  try {
    const raw = localStorage.getItem(STATE_KEY_PREFIX + dialectKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.puzzleNumber !== puzzleNumber) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveTodayState(dialectKey, puzzleNumber, state) {
  localStorage.setItem(
    STATE_KEY_PREFIX + dialectKey,
    JSON.stringify({ puzzleNumber, ...state })
  );
}
