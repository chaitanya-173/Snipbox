import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function LanguageSelect({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select language",
  widthClassName = "w-full sm:w-48",
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);
  const optionRefs = useRef([]);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Moves *actual* keyboard focus (not just the highlight color) as arrow
  // keys change the highlighted option — React's autoFocus prop only fires
  // once on mount, so it can't be used here for re-renders.
  useEffect(() => {
    if (open) {
      optionRefs.current[highlighted]?.focus();
      optionRefs.current[highlighted]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlighted]);

  const openAt = (index) => {
    setHighlighted(index);
    setOpen(true);
  };

  const commit = (index) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const handleTriggerKeyDown = (e) => {
    if (disabled) return;
    if (["Enter", " ", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      const startIndex = options.findIndex((o) => o.value === value);
      openAt(startIndex >= 0 ? startIndex : 0);
    }
  };

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlighted((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlighted((i) => (i - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(highlighted);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={ref} className={`relative ${widthClassName}`}>
      <button
        type="button"
        onClick={() => !disabled && (open ? setOpen(false) : openAt(Math.max(0, options.findIndex((o) => o.value === value))))}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5
                   rounded-xl border border-[var(--border)] bg-[var(--surface)]
                   text-[14px] text-[var(--text)] transition-all duration-200
                   ${
                     disabled
                       ? "opacity-50 cursor-not-allowed"
                       : "hover:border-[var(--primary)]/50"
                   }`}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-muted)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          onKeyDown={handleListKeyDown}
          className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto
                     rounded-xl border border-[var(--border)] bg-[var(--surface)]
                     shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] p-1.5"
        >
          {options.map((opt, index) => (
            <button
              key={opt.value}
              ref={(el) => (optionRefs.current[index] = el)}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onMouseEnter={() => setHighlighted(index)}
              onClick={() => commit(index)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2
                         rounded-lg text-[13px] transition-colors duration-150 outline-none
                         ${
                           index === highlighted
                             ? "bg-[var(--surface-2)]"
                             : ""
                         }
                         ${
                           opt.value === value
                             ? "text-[var(--primary)]"
                             : "text-[var(--text)]"
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