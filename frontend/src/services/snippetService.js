// Temporary data layer using localStorage.
// Every function here mirrors what a real API call will look like later
// (createSnippet, getSnippets, updateSnippet, deleteSnippet) — so when the
// MySQL backend is ready, only the *inside* of these functions changes to
// fetch() calls. Nothing in the pages/components needs to change.
//
// Snippets are scoped to the logged-in user (via authService's session),
// same way the real backend will scope rows by user_id.

import { getSession } from "./authService";

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

function currentUserId() {
  return getSession()?.id ?? null;
}

export function getSnippets() {
  const userId = currentUserId();
  return readAll()
    .filter((s) => s.userId === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getSnippetById(id) {
  const userId = currentUserId();
  return readAll().find((s) => s.id === id && s.userId === userId) ?? null;
}

export function createSnippet({ title, language, code, type = "code" }) {
  const now = new Date().toISOString();
  const newSnippet = {
    id: crypto.randomUUID(),
    userId: currentUserId(),
    title,
    language,
    code,
    type,
    createdAt: now,
    updatedAt: now,
  };
  writeAll([newSnippet, ...readAll()]);
  return newSnippet;
}

export function updateSnippet(id, { title, language, code, type = "code" }) {
  const userId = currentUserId();
  const updated = readAll().map((s) =>
    s.id === id && s.userId === userId
      ? { ...s, title, language, code, type, updatedAt: new Date().toISOString() }
      : s
  );
  writeAll(updated);
  return updated.find((s) => s.id === id);
}

export function deleteSnippet(id) {
  const userId = currentUserId();
  writeAll(readAll().filter((s) => !(s.id === id && s.userId === userId)));
}