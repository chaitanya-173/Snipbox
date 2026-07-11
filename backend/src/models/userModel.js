import { pool } from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] ?? null;
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
}

export async function createUser({ id, email, passwordHash }) {
  await pool.query(
    "INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)",
    [id, email, passwordHash]
  );
  return { id, email };
}