import { MAX_GUESSES } from '../lib/dialects';

function StatBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-display font-bold">{value}</span>
      <span className="text-xs text-slate-light dark:text-slate-dark text-center">{label}</span>
    </div>
  );
}

export default function StatsModal({ stats, onClose, onShare, shareEnabled, shareState }) {
  const winPct = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
  const maxDist = Math.max(1, ...stats.guessDistribution);

  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper dark:bg-ink rounded-xl p-6 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-display text-xl font-bold mb-4">Amar</h2>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <StatBlock value={stats.played} label="Lîstin" />
          <StatBlock value={winPct} label="% Serkeftin" />
          <StatBlock value={stats.currentStreak} label="Rêze niha" />
          <StatBlock value={stats.maxStreak} label="Rêza herî dirêj" />
        </div>

        <p className="text-xs uppercase tracking-wide text-slate-light dark:text-slate-dark mb-2">
          Belavbûna texmînan
        </p>
        <div className="flex flex-col gap-1 mb-6">
          {stats.guessDistribution.map((count, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-xs font-body">{i + 1}</span>
              <div
                className="h-5 bg-tile-correct rounded-sm text-white text-xs flex items-center justify-end px-1.5 min-w-[1.5rem]"
                style={{ width: `${Math.max(8, (count / maxDist) * 100)}%` }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>

        {shareEnabled && (
          <button
            type="button"
            onClick={onShare}
            className="w-full py-2.5 rounded-lg bg-roj hover:bg-roj-deep text-ink font-semibold transition-colors"
          >
            {shareState === 'copied'
              ? 'Hate kopîkirin!'
              : shareState === 'shared'
                ? 'Hate parvekirin!'
                : 'Parve bike'}
          </button>
        )}

        <p className="text-center mt-4 text-xs text-slate-light dark:text-slate-dark">
          Kurdle #{stats.puzzleNumber} — ji aliyê{' '}
          <a href="https://github.com/Kurdish-Tech" className="underline">
            Kurdish-Tech
          </a>{' '}
          ve
        </p>
      </div>
    </div>
  );
}
