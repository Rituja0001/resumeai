const RAW_API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
const API_BASE = RAW_API_BASE.endsWith("/") ? RAW_API_BASE.slice(0, -1) : RAW_API_BASE;

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(`${API_BASE}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth_user");
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json();
  if (data.access) {
    localStorage.setItem("access_token", data.access);
  }
  return data.access;
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // If 401 Unauthorized and not already calling auth endpoints, attempt token refresh once
  if (res.status === 401 && !path.startsWith("/auth/login") && !path.startsWith("/auth/register") && !path.startsWith("/auth/refresh")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        onRefreshed(newToken);
        // Retry original request with new token
        return apiFetch(path, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      } catch (err) {
        isRefreshing = false;
        window.dispatchEvent(new Event("auth:logout"));
        throw err;
      }
    } else {
      // Queue requests until refresh completes
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          apiFetch(path, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          })
            .then(resolve)
            .catch(reject);
        });
      });
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `API error ${res.status}` }));
    const errorMsg = err.detail || (err.non_field_errors ? err.non_field_errors[0] : null) || (typeof err === "object" ? Object.values(err)[0] : null) || `API error ${res.status}`;
    throw new Error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
  }

  // Handle 204 No Content for DELETE
  if (res.status === 204) {
    return null;
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
    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }
  }
  return data;
}

export async function register(email, username, password) {
  const data = await apiFetch("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  });
  if (data.access) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }
  }
  return data;
}

export async function googleLogin(credential) {
  const data = await apiFetch("/auth/google/", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  if (data.access) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }
  }
  return data;
}

export async function getMe() {
  return apiFetch("/auth/me/");
}

export async function updateProfile(data) {
  return apiFetch("/auth/me/", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function changePassword(currentPassword, newPassword) {
  return apiFetch("/auth/change-password/", {
    method: "POST",
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
}

export async function getResumes() {
  return apiFetch("/resumes/");
}

export async function getResume(id) {
  return apiFetch(`/resumes/${id}/`);
}

export async function deleteResume(id) {
  return apiFetch(`/resumes/${id}/`, {
    method: "DELETE",
  });
}

export async function submitFeedback(message, rating) {
  return apiFetch("/feedback/", {
    method: "POST",
    body: JSON.stringify({ message, rating }),
  });
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  let token = localStorage.getItem("access_token");
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(`${API_BASE}/resumes/upload/`, {
    method: "POST",
    headers,
    body: formData,
  });

  // If 401 Unauthorized, attempt token refresh and retry upload once
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        onRefreshed(newToken);
        res = await fetch(`${API_BASE}/resumes/upload/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
          body: formData,
        });
      } catch (err) {
        isRefreshing = false;
        window.dispatchEvent(new Event("auth:logout"));
        throw new Error("Session expired. Please log in again.");
      }
    } else {
      token = await new Promise((resolve, reject) => {
        subscribeTokenRefresh(resolve);
      });
      res = await fetch(`${API_BASE}/resumes/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `Upload failed (${res.status})` }));
    const errorMsg =
      err.detail ||
      (err.file ? (Array.isArray(err.file) ? err.file[0] : err.file) : null) ||
      (err.non_field_errors ? err.non_field_errors[0] : null) ||
      (typeof err === "object" ? Object.values(err)[0] : null) ||
      `Upload failed (${res.status})`;
    throw new Error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
  }

  return res.json();
}
