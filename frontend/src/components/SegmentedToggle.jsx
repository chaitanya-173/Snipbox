import { useRef } from "react";

// Generic sliding segmented control — pass any 2+ options.
// Implements the standard ARIA radiogroup keyboard pattern: only the
// active option sits in the tab order, and Left/Right arrows move both
// focus and selection between options.
export default function SegmentedToggle({ options, value, onChange, className = "" }) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const count = options.length;
  const buttonRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const nextIndex =
      e.key === "ArrowRight" ? (index + 1) % count : (index - 1 + count) % count;
    onChange(options[nextIndex].value);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
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

      {options.map((opt, index) => (
        <button
          key={opt.value}
          ref={(el) => (buttonRefs.current[index] = el)}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          tabIndex={opt.value === value ? 0 : -1}
          onClick={() => onChange(opt.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
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