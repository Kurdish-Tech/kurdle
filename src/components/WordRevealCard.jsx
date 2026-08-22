// Shown once a game ends -- the "not just a game" hook: reveal today's
// word's actual dictionary definition from Ferheng, so a loss (or a win)
// still teaches a real Kurdish word. Links straight to that word's own
// page on Ferheng for the full entry (all senses, not just the first
// gloss shown here).

import { ferhengWordUrl } from '../lib/dialects';

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
        <p className={`text-sm text-slate-light dark:text-slate-dark mb-3 ${dialect.fontClass}`} dir={dialect.dir}>
          {gloss}
        </p>
      )}
      <a
        href={ferhengWordUrl(dialect.key, word)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-roj-deep dark:text-roj hover:underline"
      >
        Di ferhengê de wateyê bibîne →
      </a>
    </div>
  );
}
