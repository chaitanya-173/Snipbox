import { pool } from "../config/db.js";

export async function getSnippetsByUser(userId) {
  const [rows] = await pool.query(
    "SELECT * FROM snippets WHERE user_id = ? ORDER BY updated_at DESC",
    [userId]
  );
  return rows;
}

export async function getSnippetByIdForUser(id, userId) {
  const [rows] = await pool.query(
    "SELECT * FROM snippets WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return rows[0] ?? null;
}

export async function createSnippet({ id, userId, title, type, language, code }) {
  await pool.query(
    `INSERT INTO snippets (id, user_id, title, type, language, code)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, userId, title, type, language, code]
  );
  return getSnippetByIdForUser(id, userId);
}

export async function updateSnippet(id, userId, { title, type, language, code }) {
  await pool.query(
    `UPDATE snippets
     SET title = ?, type = ?, language = ?, code = ?
     WHERE id = ? AND user_id = ?`,
    [title, type, language, code, id, userId]
  );
  return getSnippetByIdForUser(id, userId);
}

export async function deleteSnippet(id, userId) {
  const [result] = await pool.query(
    "DELETE FROM snippets WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return result.affectedRows > 0;
}