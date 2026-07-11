// Manages the JWT + a cached copy of the user object in localStorage.
// This is just local *session* bookkeeping — the actual snippet/user data
// now lives in MySQL, reached through apiClient.js.

const TOKEN_KEY = "snipbox_token";
const USER_KEY = "snipbox_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAuth({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}