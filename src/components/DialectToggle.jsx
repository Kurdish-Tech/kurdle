import { DIALECTS, DIALECT_ORDER } from '../lib/dialects';

export default function DialectToggle({ current, onChange, disabled }) {
  return (
    <div className="flex gap-1 p-1 bg-paper-raised dark:bg-ink-raised border border-paper-border dark:border-ink-border rounded-full w-fit mx-auto">
      {DIALECT_ORDER.map((key) => {
        const d = DIALECTS[key];
        const active = key === current;
        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(key)}
            className={[
              'px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors',
              d.fontClass,
              active
                ? 'bg-roj text-ink'
                : 'text-slate-light dark:text-slate-dark hover:text-ink dark:hover:text-paper',
              disabled ? 'opacity-50 cursor-not-allowed' : '',
            ].join(' ')}
          >
            {d.nativeLabel}
          </button>
        );
      })}
    </div>
  );
}
