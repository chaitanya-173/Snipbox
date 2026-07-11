import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function LanguageSelect({ options, value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-48">
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5
                   rounded-xl border border-[var(--border)] bg-[var(--surface)]
                   text-[14px] text-[var(--text)] transition-all duration-200
                   ${
                     disabled
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:border-[var(--primary)]/50"
                   }`}
      >
        <span>{selected?.label ?? "Select language"}</span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-muted)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto
                     rounded-xl border border-[var(--border)] bg-[var(--surface)]
                     shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] p-1.5"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2
                         rounded-lg text-[13px] transition-colors duration-150
                         ${
                           opt.value === value
                             ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                             : "text-[var(--text)] hover:bg-[var(--surface-2)]"
                         }`}
            >
              {opt.label}
              {opt.value === value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}