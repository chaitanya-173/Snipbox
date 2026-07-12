import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ShortcutsContext = createContext(null);

// --- combo normalization ------------------------------------------------
// Turns a KeyboardEvent into a stable string like "mod+s", "?", "g h"
// (chords are joined with a space by the caller/registry, not here).
function normalizeCombo(e) {
  const parts = [];
  if (e.ctrlKey || e.metaKey) parts.push("mod"); // treat Ctrl and Cmd as the same
  if (e.altKey) parts.push("alt");

  const key = e.key;
  const isNamedKey = key.length > 1; // "Enter", "Escape", "ArrowUp", "Tab"...
  // For printable characters (letters, digits, punctuation), the *character*
  // e.key gives us already reflects Shift (e.g. Shift+/ -> "?", Shift+a -> "A"),
  // so we only add "shift" as an explicit modifier for named keys where it
  // changes behavior rather than the character itself (Shift+Tab, Shift+Enter).
  if (isNamedKey && e.shiftKey) parts.push("shift");

  parts.push(key === " " ? "space" : key.toLowerCase());
  return parts.join("+");
}

function isEditableTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true; // covers CodeMirror's content area
  return false;
}

// Mod/Alt combos and Escape never type a character, so they're safe to fire
// even while the user is typing in a field. Anything else (plain letters,
// "?", chord starters) must never fire while typing.
function isSafeWhileEditable(combo) {
  return combo.startsWith("mod+") || combo.startsWith("alt+") || combo === "escape";
}

const CHORD_WINDOW_MS = 700;

export function ShortcutsProvider({ children }) {
  // combo string -> stack of registered shortcuts (last registered wins,
  // which naturally means "the topmost open modal" beats "the page behind it").
  const registryRef = useRef(new Map());
  const [shortcutList, setShortcutList] = useState([]);
  const chordRef = useRef({ key: null, timestamp: 0 });
  const [helpOpen, setHelpOpen] = useState(false);

  const register = useCallback((shortcut) => {
    const id = Symbol("shortcut");
    const combo = shortcut.keys.toLowerCase();
    const entry = { id, ...shortcut, combo };

    const stack = registryRef.current.get(combo) ?? [];
    registryRef.current.set(combo, [...stack, entry]);
    setShortcutList((prev) => [...prev, entry]);

    return () => {
      const current = registryRef.current.get(combo) ?? [];
      registryRef.current.set(
        combo,
        current.filter((s) => s.id !== id)
      );
      setShortcutList((prev) => prev.filter((s) => s.id !== id));
    };
  }, []);

  // Built-in: "?" always opens the shortcuts help modal.
  useEffect(
    () =>
      register({
        keys: "?",
        handler: () => setHelpOpen(true),
        description: "Show keyboard shortcuts",
        scope: "General",
      }),
    [register]
  );

  useEffect(() => {
    function handleKeyDown(e) {
      const combo = normalizeCombo(e);
      const editable = isEditableTarget(e.target);

      // --- chord sequences (e.g. "g" then "h") ---
      // Only ever tracked for a bare letter with no modifiers, and never
      // while the user is typing.
      if (!editable && /^[a-z]$/.test(combo)) {
        const now = Date.now();
        const chord = chordRef.current;

        if (chord.key && now - chord.timestamp < CHORD_WINDOW_MS) {
          const sequence = `${chord.key} ${combo}`;
          const stack = registryRef.current.get(sequence);
          chordRef.current = { key: null, timestamp: 0 };
          if (stack?.length) {
            e.preventDefault();
            stack[stack.length - 1].handler(e);
            return;
          }
        }

        const startsAChord = [...registryRef.current.keys()].some((k) =>
          k.startsWith(`${combo} `)
        );
        if (startsAChord) {
          chordRef.current = { key: combo, timestamp: now };
          return;
        }
      }

      if (editable && !isSafeWhileEditable(combo)) return;

      const stack = registryRef.current.get(combo);
      if (!stack?.length) return;

      const top = stack[stack.length - 1];
      if (top.preventDefault !== false) e.preventDefault();
      top.handler(e);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ShortcutsContext.Provider value={{ register, shortcutList, helpOpen, setHelpOpen }}>
      {children}
    </ShortcutsContext.Provider>
  );
}

export function useShortcutsContext() {
  const ctx = useContext(ShortcutsContext);
  if (!ctx) throw new Error("useShortcutsContext must be used inside <ShortcutsProvider>");
  return ctx;
}