// Shown once a game ends -- the "not just a game" hook: reveal today's
// word's actual dictionary definition from Ferheng, so a loss (or a win)
// still teaches a real Kurdish word.

export default function WordRevealCard({ word, gloss, dialect, won }) {
  return (
    <div className="w-full max-w-xs mx-auto mt-4 p-4 rounded-lg bg-paper-raised dark:bg-ink-raised border border-paper-border dark:border-ink-border">
      <p className={`text-xs uppercase tracking-wide text-slate-light dark:text-slate-dark mb-1`}>
        {won ? 'Peyva îro' : 'Peyva rast'}
      </p>
      <p className={`text-2xl font-display font-bold mb-2 ${dialect.fontClass}`} dir={dialect.dir}>
        {word}
      </p>
      {gloss && (
        <p className={`text-sm text-slate-light dark:text-slate-dark ${dialect.fontClass}`} dir={dialect.dir}>
          {gloss}
        </p>
      )}
    </div>
  );
}
