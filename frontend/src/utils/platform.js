export function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
}

// Turns an internal combo string like "mod+s" or "g h" into a display
// label — "⌘S" on Mac, "Ctrl+S" elsewhere; "G then H" for chords.
export function formatShortcut(keys) {
  const mac = isMac();

  return keys
    .split(" ")
    .map((part) =>
      part
        .split("+")
        .map((token) => {
          if (token === "mod") return mac ? "⌘" : "Ctrl";
          if (token === "shift") return mac ? "⇧" : "Shift";
          if (token === "alt") return mac ? "⌥" : "Alt";
          if (token === "escape") return "Esc";
          if (token === "space") return "Space";
          return token.length === 1 ? token.toUpperCase() : token;
        })
        .join(mac ? "" : "+")
    )
    .join(mac ? " " : " then ");
}