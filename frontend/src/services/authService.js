// Temporary auth layer using localStorage — mirrors snippetService.js's
// pattern. Once the Express + MySQL backend exists, only the *inside* of
// these functions changes to real fetch() calls with JWT; AuthContext and
// every page stay the same.
//
// ⚠️ NOT secure — passwords are stored in plain text in localStorage. This
// is purely a placeholder to wire up the UI before the real backend exists.

const USERS_KEY = "snipbox_users";
const SESSION_KEY = "snipbox_session";

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ email, password }) {
  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("An account with this email already exists");

  const newUser = { id: crypto.randomUUID(), email, password };
  writeUsers([...users, newUser]);

  const session = { id: newUser.id, email: newUser.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function loginUser({ email, password }) {
  const users = readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) throw new Error("Invalid email or password");

  const session = { id: user.id, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}