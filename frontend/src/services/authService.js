// Now wired to the real Express + MySQL backend. Public function names
// are unchanged from the localStorage version — AuthContext.jsx didn't
// need to change at all because of that.

import { apiFetch } from "../utils/apiClient";
import { getStoredUser, saveAuth, clearAuth } from "../utils/authStorage";

export async function registerUser({ email, password }) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: { email, password },
  });
  saveAuth(data);
  return data.user;
}

export async function loginUser({ email, password }) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  saveAuth(data);
  return data.user;
}

export function logoutUser() {
  clearAuth();
}

export function getSession() {
  return getStoredUser();
}