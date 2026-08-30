import { useState } from 'react';

const EXAMPLES = [
  {
    letters: ['k', 'i', 'r', 'i', 'n'],
    highlight: 0,
    status: 'correct',
    title: {
      ku: 'Kesk = tîp rast e, û cihê wê jî rast e',
      ar: 'أخضر = الحرف صحيح ومكانه صحيح',
    },
    desc: {
      ku: '"k" di peyvê de heye û di cîhê yekem de ye.',
      ar: '"k" موجود بالكلمة، وبمكانه الأول الصحيح.',
    },
  },
  {
    letters: ['b', 'a', 'r', 'a', 'n'],
    highlight: 1,
    status: 'present',
    title: {
      ku: 'Zer = tîp heye di peyvê de, lê cihê wê ne rast e',
      ar: 'أصفر = الحرف موجود بالكلمة لكن بمكان غلط',
    },
    desc: {
      ku: '"a" di peyvê de heye, lê ne di cîhê duyem de.',
      ar: '"a" موجود بالكلمة، بس مو بالمكان الثاني.',
    },
  },
  {
    letters: ['g', 'e', 'l', 'e', 'k'],
    highlight: 2,
    status: 'absent',
    title: {
      ku: 'Gewr = tîp ne di peyvê de ye',
      ar: 'رمادي = الحرف غير موجود بالكلمة إطلاقاً',
    },
    desc: {
      ku: '"l" di peyva rast de qet nîne.',
      ar: '"l" غير موجود إطلاقاً بالكلمة الصحيحة.',
    },
  },
];

const STATUS_CLASS = {
  correct: 'bg-tile-correct border-tile-correct text-white',
  present: 'bg-tile-present border-tile-present text-white',
  absent: 'bg-ink-border/70 border-ink-border/70 text-white dark:bg-ink-border dark:border-ink-border',
};

const TEXT = {
  ku: {
    langName: 'Kurdî',
    title: 'Çawa tê lîstin?',
    subtitle:
      'Her roj peyvek nû heye ji 5 tîpan pêk tê gereke tu texmîn bike peyva îro çiye. 6 firset tenê bi tere hene heya tu texmîn bikî.',
    button: 'Destpê bike',
  },
  ar: {
    langName: 'عربي',
    title: 'كيف تُلعب؟',
    subtitle:
      'كل يوم في كلمة كردية جديدة مؤلفة من 5 حروف، وعليك تخمين كلمة اليوم. عندك 6 محاولات بس.',
    button: 'ابدأ اللعب',
  },
};

export default function HowToPlayModal({ onClose }) {
  const [lang, setLang] = useState('ar');
  const t = TEXT[lang];
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-paper dark:bg-ink rounded-xl p-6 w-full max-w-sm shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        <div className="flex justify-center gap-1 mb-4">
          {Object.keys(TEXT).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={[
                'px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
                lang === code
                  ? 'bg-roj border-roj text-ink'
                  : 'border-paper-border dark:border-ink-border text-slate-light dark:text-slate-dark hover:bg-paper-raised dark:hover:bg-ink-raised',
              ].join(' ')}
            >
              {TEXT[code].langName}
            </button>
          ))}
        </div>

        <h2 className="text-center font-display text-xl font-bold mb-1" dir={isAr ? 'rtl' : 'ltr'}>
          {t.title}
        </h2>
        <p
          className="text-center text-sm text-slate-light dark:text-slate-dark mb-5"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {t.subtitle}
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
              <p className="text-sm font-semibold" dir={isAr ? 'rtl' : 'ltr'}>
                {ex.title[lang]}
              </p>
              <p className="text-xs text-slate-light dark:text-slate-dark" dir={isAr ? 'rtl' : 'ltr'}>
                {ex.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-paper-border dark:border-ink-border pt-4 mb-5 flex flex-col gap-2 text-sm text-slate-light dark:text-slate-dark">
          {isAr ? (
            <>
              <p dir="rtl">
                🌐 فيك تبدّل بين <b className="text-ink dark:text-paper">الكرمانجية والسورانية والزازاكية</b> — كل لهجة إلها كلمة يومية خاصة فيها.
              </p>
              <p dir="rtl">
                📖 بعد كل لعبة، بيظهرلك معنى الكلمة الصحيحة من <b className="text-ink dark:text-paper">القاموس</b> مباشرة — دايماً بتتعلم شي جديد.
              </p>
              <p dir="rtl">🔁 الكلمة بتتغير كل يوم، ونفس الكلمة لجميع اللاعبين.</p>
            </>
          ) : (
            <>
              <p>🌐 Tu dikarî di navbera <b className="text-ink dark:text-paper">Kurmancî, Soranî, û Zazakî</b> de biguherînî — her zaravayek peyveke xwe ya rojê heye.</p>
              <p>📖 Piştî her lîstikê, wateya rastî ya peyvê ji <b className="text-ink dark:text-paper">Ferheng</b>ê tê xuyakirin — tu her tim tiştekî nû fêr dibî.</p>
              <p>🔁 Peyv her roj tên guhertin, ji bo her kesî heman peyv e.</p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-roj hover:bg-roj-deep text-ink font-semibold transition-colors"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}
