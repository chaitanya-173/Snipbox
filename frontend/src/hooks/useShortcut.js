import { useEffect, useRef } from "react";
import { useShortcutsContext } from "../context/ShortcutsContext";

/**
 * Registers a keyboard shortcut for as long as the calling component is
 * mounted (and `enabled` is true) — this is what makes shortcuts
 * "route-aware" for free: a page's shortcuts only exist while that page
 * (or open modal) is on screen.
 *
 * @param {string} keys - e.g. "mod+s", "?", "escape", "g h" (chord)
 * @param {(e: KeyboardEvent) => void} handler
 * @param {{ description?: string, scope?: string, enabled?: boolean, preventDefault?: boolean }} options
 */
export function useShortcut(keys, handler, options = {}) {
  const { register } = useShortcutsContext();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const { description, scope = "General", enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled || !keys) return undefined;
    return register({
      keys,
      handler: (e) => handlerRef.current(e),
      description,
      scope,
      preventDefault,
    });
    // handler is intentionally excluded — handlerRef keeps it fresh without
    // needing to re-register on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys, enabled, description, scope, register, preventDefault]);
}