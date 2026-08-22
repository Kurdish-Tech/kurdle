const EXAMPLES = [
  {
    letters: ['k', 'i', 'r', 'i', 'n'],
    highlight: 0,
    status: 'correct',
    title: 'Kesk = tîp rast e, cîh rast e',
    desc: '"k" di peyva rast de jî di cîhê yekem de ye.',
  },
  {
    letters: ['b', 'a', 'r', 'a', 'n'],
    highlight: 1,
    status: 'present',
    title: 'Zer = tîp rast e, cîh ne rast e',
    desc: '"a" di peyvê de heye, lê ne di cîhê duyem de.',
  },
  {
    letters: ['g', 'e', 'l', 'e', 'k'],
    highlight: 2,
    status: 'absent',
    title: 'Gewr = tîp qet nayê de',
    desc: '"l" di peyva rast de qet nîne.',
  },
];

const STATUS_CLASS = {
  correct: 'bg-tile-correct border-tile-correct text-white',
  present: 'bg-tile-present border-tile-present text-white',
  absent: 'bg-ink-border/70 border-ink-border/70 text-white dark:bg-ink-border dark:border-ink-border',
};

export default function HowToPlayModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-paper dark:bg-ink rounded-xl p-6 w-full max-w-sm shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        <h2 className="text-center font-display text-xl font-bold mb-1">Çawa tê lîstin?</h2>
        <p className="text-center text-sm text-slate-light dark:text-slate-dark mb-5">
          Her roj peyvek nû ya Kurdî ya 5 tîpan texmîn bike. Tu 6 firset î.
        </p>

        <div className="flex flex-col gap-4 mb-5">
          {EXAMPLES.map((ex, i) => (
            <div key={i}>
              <div className="grid grid-cols-5 gap-1 max-w-[220px] mb-1.5">
                {ex.letters.map((letter, j) => (
                  <div
                    key={j}
                    className={[
                      'flex items-center justify-center aspect-square rounded-md border-2 font-display font-semibold text-base',
                      j === ex.highlight ? STATUS_CLASS[ex.status] : 'border-ink-border/50 dark:border-ink-border bg-transparent',
                    ].join(' ')}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold">{ex.title}</p>
              <p className="text-xs text-slate-light dark:text-slate-dark">{ex.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-paper-border dark:border-ink-border pt-4 mb-5 flex flex-col gap-2 text-sm text-slate-light dark:text-slate-dark">
          <p>🌐 Tu dikarî di navbera <b className="text-ink dark:text-paper">Kurmancî, Soranî, û Zazakî</b> de biguherînî — her zaravayek peyveke xwe ya rojê heye.</p>
          <p>📖 Piştî her lîstikê, wateya rastî ya peyvê ji <b className="text-ink dark:text-paper">Ferheng</b>ê tê xuyakirin — tu her tim tiştekî nû fêr dibî.</p>
          <p>🔁 Peyv her roj diguhere, ji bo her kesî heman peyv e.</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-roj hover:bg-roj-deep text-ink font-semibold transition-colors"
        >
          Destpê bike
        </button>
      </div>
    </div>
  );
}
