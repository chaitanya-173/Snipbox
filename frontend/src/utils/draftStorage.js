// Home.jsx used to hold its draft only in useState — fine while you stay on
// the page, but React unmounts Home entirely when you navigate to
// /snippets, so that state (and whatever you'd typed) was gone for good by
// the time you came back. This persists the *unsaved create-mode draft*
// to localStorage so it survives navigating away, refreshing, or even
// closing the tab, and gets restored the next time /create is opened fresh.
//
// Scoped to create mode only — editing an existing snippet already carries
// its full state via router location.state each time you open it, so there
// is nothing to "lose" there, and mixing the two would risk a stale draft
// clobbering a snippet you're actively editing.

const DRAFT_KEY = "snipbox_create_draft_v1";

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage full/unavailable — losing draft-persistence silently beats
    // crashing the editor over it.
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // no-op
  }
}

// A draft counts as "worth restoring" only if it has an actual title or
// body — an all-empty draft isn't worth a toast telling the user we
// "restored" nothing.
export function isDraftMeaningful(draft) {
  if (!draft) return false;
  const title = (draft.title || "").trim();
  const code = (draft.code || "").trim();
  return title.length > 0 || code.length > 0;
}
