// Builds the shareable emoji-grid result text, and copies/shares it without
// ever revealing the actual word -- the entire point of the format.

const EMOJI = { correct: '🟩', present: '🟨', absent: '⬜' };

export function buildShareText({ dialectLabel, puzzleNumber, history, won, maxGuesses }) {
  const grid = history
    .map((row) => row.map((cell) => EMOJI[cell]).join(''))
    .join('\n');
  const score = won ? `${history.length}/${maxGuesses}` : `X/${maxGuesses}`;
  return `Kurdle ${dialectLabel} #${puzzleNumber} ${score}\n\n${grid}\n\nkurdish-tech.github.io/kurdle`;
}

export async function shareResult(text) {
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
      // fall through to clipboard on any other share failure
    }
  }
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return 'copied';
  }
  return 'unsupported';
}
