// Small helpers for working with the HTML content produced by the TipTap
// notes editor — used anywhere we need plain text instead of markup
// (card previews, clipboard copy, search matching).

let scratchEl = null;

function getScratchEl() {
  if (!scratchEl && typeof document !== "undefined") {
    scratchEl = document.createElement("div");
  }
  return scratchEl;
}

// Converts note HTML into readable plain text. Uses the DOM when available
// (accurate, handles entities/nesting correctly) and falls back to a regex
// strip for non-browser contexts.
export function stripHtml(html) {
  if (!html) return "";
  const el = getScratchEl();
  if (el) {
    el.innerHTML = html;
    return (el.textContent || el.innerText || "").replace(/\s+\n/g, "\n").trim();
  }
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// TipTap's "empty" doc still serializes as "<p></p>", which is truthy for
// a plain .trim() check — this treats that (and its variants) as empty too.
export function isRichTextEmpty(html) {
  return stripHtml(html).length === 0;
}
