import crypto from "crypto";
import {
  getSnippetsByUser,
  getSnippetByIdForUser,
  createSnippet as createSnippetModel,
  updateSnippet as updateSnippetModel,
  deleteSnippet as deleteSnippetModel,
  togglePinnedSnippet,
} from "../models/snippetModel.js";

export async function getSnippets(req, res, next) {
  try {
    const snippets = await getSnippetsByUser(req.userId);
    res.json({ snippets });
  } catch (err) {
    next(err);
  }
}

export async function getSnippet(req, res, next) {
  try {
    const snippet = await getSnippetByIdForUser(req.params.id, req.userId);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });
    res.json({ snippet });
  } catch (err) {
    next(err);
  }
}

export async function createSnippet(req, res, next) {
  try {
    const { title, type, language, code } = req.body;
    const id = crypto.randomUUID();
    const snippet = await createSnippetModel({
      id,
      userId: req.userId,
      title,
      type,
      language,
      code,
    });
    res.status(201).json({ snippet });
  } catch (err) {
    next(err);
  }
}

export async function updateSnippet(req, res, next) {
  try {
    const existing = await getSnippetByIdForUser(req.params.id, req.userId);
    if (!existing) return res.status(404).json({ message: "Snippet not found" });

    const { title, type, language, code } = req.body;
    const snippet = await updateSnippetModel(req.params.id, req.userId, {
      title,
      type,
      language,
      code,
    });
    res.json({ snippet });
  } catch (err) {
    next(err);
  }
}

export async function deleteSnippet(req, res, next) {
  try {
    const deleted = await deleteSnippetModel(req.params.id, req.userId);
    if (!deleted) return res.status(404).json({ message: "Snippet not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function togglePin(req, res, next) {
  try {
    const snippet = await togglePinnedSnippet(req.params.id, req.userId);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });
    res.json({ snippet });
  } catch (err) {
    next(err);
  }
}