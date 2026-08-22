const STATUS_RANK = { absent: 0, present: 1, correct: 2 };

const KEY_STATUS_CLASS = {
  correct: 'bg-tile-correct text-white',
  present: 'bg-tile-present text-white',
  absent: 'bg-ink-border/70 text-white dark:bg-ink-border',
  default: 'bg-paper-border text-ink hover:bg-slate-dark/30 dark:bg-ink-raised dark:text-paper',
};

function Key({ label, onClick, status, wide, children, dir }) {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={[
        'h-12 rounded-md font-body font-semibold text-sm sm:text-base',
        'transition-colors active:scale-95 duration-100',
        wide ? 'px-3 flex-[1.6]' : 'flex-1',
        KEY_STATUS_CLASS[status || 'default'],
      ].join(' ')}
      dir={dir}
    >
      {children ?? label}
    </button>
  );
}

/**
 * letterStatus: { [letter]: 'correct' | 'present' | 'absent' } — the best
 * status seen for each letter across all guesses so far.
 */
export default function Keyboard({ rows, letterStatus, onKey, onEnter, onBackspace, dir, enterLabel, backLabel }) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-1.5 select-none" dir={dir}>
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1 sm:gap-1.5">
          {i === rows.length - 1 && (
            <Key label="ENTER" wide onClick={onEnter} dir={dir}>
              {enterLabel}
            </Key>
          )}
          {row.map((letter) => (
            <Key key={letter} label={letter} onClick={onKey} status={letterStatus[letter]} />
          ))}
          {i === rows.length - 1 && (
            <Key label="BACKSPACE" wide onClick={onBackspace} dir={dir}>
              {backLabel}
            </Key>
          )}
        </div>
      ))}
    </div>
  );
}

export function computeLetterStatus(history) {
  const status = {};
  for (const row of history) {
    if (!row.evaluation) continue;
    row.letters.forEach((letter, i) => {
      const s = row.evaluation[i];
      if (!(letter in status) || STATUS_RANK[s] > STATUS_RANK[status[letter]]) {
        status[letter] = s;
      }
    });
  }
  return status;
}
