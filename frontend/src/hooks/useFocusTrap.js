import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Keeps Tab/Shift+Tab cycling within a modal's own focusable elements while
// it's open, instead of letting focus escape into the page behind it.
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined;
    const container = containerRef.current;

    function handleKeyDown(e) {
      if (e.key !== "Tab") return;
      const items = container.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [active, containerRef]);
}