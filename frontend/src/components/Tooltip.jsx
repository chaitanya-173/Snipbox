export default function Tooltip({ label, children }) {
  return (
    <div className="relative group/tooltip inline-flex">
      {children}
      <span
        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2
                   whitespace-nowrap rounded-md bg-[var(--text)] text-[var(--bg)]
                   text-[11px] font-medium px-2 py-1 opacity-0 scale-95
                   group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100
                   transition-all duration-150 z-20"
      >
        {label}
      </span>
    </div>
  );
}