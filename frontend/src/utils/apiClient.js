import { getToken, clearAuth } from "./authStorage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Every service file (authService, snippetService) calls through this —
// one place that knows how to talk to the backend, attach the JWT, and
// turn failed responses into thrown Errors with a readable message.
export async function apiFetch(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Token missing/expired/invalid — clear the stale session and bounce
  // to login rather than showing a confusing in-app error.
  if (response.status === 401) {
    clearAuth();
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    throw new Error("Session expired — please log in again");
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}