import { WORD_LENGTH, MAX_GUESSES } from '../lib/dialects';

const STATUS_CLASS = {
  correct: 'bg-tile-correct border-tile-correct text-white',
  present: 'bg-tile-present border-tile-present text-white',
  absent: 'bg-ink-border/60 border-ink-border/60 text-white dark:bg-ink-border dark:border-ink-border',
};

function Tile({ letter, status, justSubmitted, delay }) {
  const filled = letter !== '';
  const base =
    'flex items-center justify-center w-full aspect-square rounded-md border-2 font-display font-semibold text-2xl sm:text-3xl select-none';
  const stateClass = status
    ? STATUS_CLASS[status]
    : filled
      ? 'border-slate-light dark:border-slate-dark bg-transparent'
      : 'border-ink-border/50 dark:border-ink-border bg-transparent';

  return (
    <div
      className={`${base} ${stateClass} ${justSubmitted ? 'animate-flip' : filled ? 'animate-pop-in' : ''}`}
      style={justSubmitted ? { animationDelay: `${delay}ms` } : undefined}
    >
      {letter}
    </div>
  );
}

/**
 * history: array of { letters: string[], evaluation: (status[]|null) } for
 * every submitted row. currentGuess: letters typed for the in-progress row
 * (only shown on the first not-yet-submitted row).
 */
export default function Board({ history, currentGuess, shakeRow, dir }) {
  const rows = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < history.length) {
      rows.push(history[i]);
    } else if (i === history.length) {
      const letters = currentGuess.split('');
      while (letters.length < WORD_LENGTH) letters.push('');
      rows.push({ letters, evaluation: null, isCurrent: true });
    } else {
      rows.push({ letters: new Array(WORD_LENGTH).fill(''), evaluation: null });
    }
  }

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs mx-auto" dir={dir}>
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`grid grid-cols-5 gap-1.5 ${row.isCurrent && shakeRow ? 'animate-shake' : ''}`}
        >
          {row.letters.map((letter, i) => (
            <Tile
              key={i}
              letter={letter}
              status={row.evaluation ? row.evaluation[i] : null}
              justSubmitted={!!row.evaluation}
              delay={i * 250}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
