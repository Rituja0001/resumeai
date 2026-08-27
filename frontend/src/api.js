const API_BASE = "http://127.0.0.1:8000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `API error ${res.status}` }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

export async function login(email, password) {
  const data = await apiFetch("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.access) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
  }
  return data;
}

export async function register(email, username, password) {
  return apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  });
}

