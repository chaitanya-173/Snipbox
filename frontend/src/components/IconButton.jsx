import Tooltip from "./Tooltip";

export default function IconButton({ icon: Icon, label, onClick, variant = "default" }) {
  return (
    <Tooltip label={label}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]
                   transition-all duration-200 active:scale-90
                   ${
                     variant === "danger"
                       ? "text-[var(--text-muted)] hover:text-[var(--danger)] hover:border-[var(--danger)]/40 hover:bg-[var(--danger)]/5"
                       : "text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5"
                   }`}
      >
        <Icon size={15} />
      </button>
    </Tooltip>
  );
}