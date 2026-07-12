import { useRef } from "react";
import { Keyboard, X } from "lucide-react";
import { useShortcutsContext } from "../context/ShortcutsContext";
import { useShortcut } from "../hooks/useShortcut";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { formatShortcut } from "../utils/platform";

const SCOPE_ORDER = ["General", "Navigation", "Editor", "My Snippets", "Modal"];

export default function ShortcutsHelpModal() {
  const { shortcutList, helpOpen, setHelpOpen } = useShortcutsContext();
  const containerRef = useRef(null);

  useFocusTrap(containerRef, helpOpen);
  useShortcut("escape", () => setHelpOpen(false), {
    enabled: helpOpen,
    scope: "Modal",
    description: "Close this dialog",
  });

  if (!helpOpen) return null;

  // De-dupe by combo+description (a shortcut can be registered by more than
  // one currently-mounted component in rare edge cases) and drop the
  // internal ones without a description (e.g. chord-continuation bookkeeping).
  const seen = new Set();
  const visible = shortcutList.filter((s) => {
    if (!s.description) return false;
    const key = `${s.combo}-${s.description}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const grouped = SCOPE_ORDER.map((scope) => ({
    scope,
    items: visible.filter((s) => s.scope === scope),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setHelpOpen(false)}
      />
      <div
        ref={containerRef}
        className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl
                   border border-[var(--border)] bg-[var(--surface)] p-6
                   shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Keyboard size={18} className="text-[var(--primary)]" />
            <h2 className="text-[16px] font-semibold text-[var(--text)]">
              Keyboard shortcuts
            </h2>
          </div>
          <button
            onClick={() => setHelpOpen(false)}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]
                       hover:bg-[var(--surface-2)] transition-all duration-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {grouped.map(({ scope, items }) => (
            <div key={scope}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-2">
                {scope}
              </p>
              <div className="flex flex-col gap-1.5">
                {items.map((s) => (
                  <div
                    key={`${s.combo}-${s.description}`}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-[13.5px] text-[var(--text)]">{s.description}</span>
                    <kbd
                      className="shrink-0 px-2 py-1 rounded-md text-[11.5px] font-mono
                                 bg-[var(--surface-2)] border border-[var(--border)]
                                 text-[var(--text-muted)]"
                    >
                      {formatShortcut(s.combo)}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}