// Generic sliding segmented control — pass any 2+ options.
// Used here for Code/Notes, reusable later for search/filter toggles.
export default function SegmentedToggle({ options, value, onChange, className = "" }) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const count = options.length;

  return (
    <div
      className={`relative flex p-1 rounded-xl border border-[var(--border)]
                  bg-[var(--surface-2)]/60 shrink-0 ${className}`}
    >
      {/* Sliding pill */}
      <div
        className="absolute top-1 bottom-1 left-1 rounded-lg bg-[var(--primary)]
                   transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${count})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex-1 px-4 py-1.5 rounded-lg text-[13px] font-medium
                     text-center whitespace-nowrap transition-colors duration-200
                     ${
                       opt.value === value
                         ? "text-white"
                         : "text-[var(--text-muted)] hover:text-[var(--text)]"
                     }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}