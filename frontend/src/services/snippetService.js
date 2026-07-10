// Temporary data layer using localStorage.
// Every function here mirrors what a real API call will look like later
// (createSnippet, getSnippets, updateSnippet, deleteSnippet) — so when the
// MySQL backend is ready, only the *inside* of these functions changes to
// fetch() calls. Nothing in the pages/components needs to change.

const STORAGE_KEY = "snipbox_snippets";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function getSnippets() {
  return readAll().sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

export function getSnippetById(id) {
  return readAll().find((s) => s.id === id) ?? null;
}

export function createSnippet({ title, language, code }) {
  const now = new Date().toISOString();
  const newSnippet = {
    id: crypto.randomUUID(),
    title,
    language,
    code,
    createdAt: now,
    updatedAt: now,
  };
  writeAll([newSnippet, ...readAll()]);
  return newSnippet;
}

export function updateSnippet(id, { title, language, code }) {
  const updated = readAll().map((s) =>
    s.id === id
      ? { ...s, title, language, code, updatedAt: new Date().toISOString() }
      : s
  );
  writeAll(updated);
  return updated.find((s) => s.id === id);
}

export function deleteSnippet(id) {
  writeAll(readAll().filter((s) => s.id !== id));
}