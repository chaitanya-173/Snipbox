import { pool } from "../config/db.js";

export async function getSnippetsByUser(userId) {
  const [rows] = await pool.query(
    "SELECT * FROM snippets WHERE user_id = ? ORDER BY pinned DESC, updated_at DESC",
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

// Flips pinned on/off in one round trip (no read-then-write race), then
// returns the updated row — or null if it doesn't exist / isn't this
// user's, so the controller can 404 instead of silently no-op'ing.
export async function togglePinnedSnippet(id, userId) {
  const [result] = await pool.query(
    "UPDATE snippets SET pinned = NOT pinned WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  if (result.affectedRows === 0) return null;
  return getSnippetByIdForUser(id, userId);
}
