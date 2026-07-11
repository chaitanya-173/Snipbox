// Now wired to the real Express + MySQL backend. Public function names
// (getSnippets, getSnippetById, createSnippet, updateSnippet, deleteSnippet)
// are unchanged from the localStorage version — but every one of them is
// now async, since it's a real network call. Pages already await these.

import { apiFetch } from "../utils/apiClient";

export async function getSnippets() {
  const data = await apiFetch("/snippets");
  return data.snippets;
}

export async function getSnippetById(id) {
  const data = await apiFetch(`/snippets/${id}`);
  return data.snippet;
}

export async function createSnippet({ title, language, code, type = "code" }) {
  const data = await apiFetch("/snippets", {
    method: "POST",
    body: { title, language, code, type },
  });
  return data.snippet;
}

export async function updateSnippet(id, { title, language, code, type = "code" }) {
  const data = await apiFetch(`/snippets/${id}`, {
    method: "PUT",
    body: { title, language, code, type },
  });
  return data.snippet;
}

export async function deleteSnippet(id) {
  await apiFetch(`/snippets/${id}`, { method: "DELETE" });
}