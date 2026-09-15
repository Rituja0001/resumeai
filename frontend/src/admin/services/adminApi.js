const RAW_API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD
    ? "https://resumeai-backend-kzcn.onrender.com/api"
    : "http://127.0.0.1:8000/api");
const CLEAN_BASE = RAW_API_BASE.endsWith("/") ? RAW_API_BASE.slice(0, -1) : RAW_API_BASE;
const API_BASE = CLEAN_BASE.endsWith("/admin") ? CLEAN_BASE : `${CLEAN_BASE}/admin`;

export const getAdminToken = () => localStorage.getItem("tatkal_admin_token");
export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem("tatkal_admin_user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setAdminSession = (token, user) => {
  localStorage.setItem("tatkal_admin_token", token);
  localStorage.setItem("tatkal_admin_user", JSON.stringify(user));
};

export const clearAdminSession = () => {
  localStorage.removeItem("tatkal_admin_token");
  localStorage.removeItem("tatkal_admin_user");
};

export const isAdminAuthenticated = () => {
  return !!getAdminToken();
};

async function adminRequest(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    if (!endpoint.includes("/login/")) {
      clearAdminSession();
      window.location.href = "/admin/login";
    }
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || data.message || "An error occurred with the request.";
    throw new Error(errorMsg);
  }

  return data;
}

export const adminApi = {
  login: async (email, password) => {
    const data = await adminRequest("/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAdminSession(data.access, data.user);
    return data;
  },

  logout: () => {
    clearAdminSession();
  },

  getDashboardStats: (period = "all", startDate = "", endDate = "") => {
    let url = `/dashboard-stats/?period=${encodeURIComponent(period)}`;
    if (period === "custom" && startDate) {
      url += `&start_date=${encodeURIComponent(startDate)}`;
      if (endDate) {
        url += `&end_date=${encodeURIComponent(endDate)}`;
      }
    }
    return adminRequest(url);
  },

  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return adminRequest(`/users/?${query}`);
  },

  getUser: (id) => {
    return adminRequest(`/users/${id}/`);
  },

  updateUser: (id, payload) => {
    return adminRequest(`/users/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  deleteUser: (id) => {
    return adminRequest(`/users/${id}/`, {
      method: "DELETE",
    });
  },

  getResumes: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return adminRequest(`/resumes/?${query}`);
  },

  getResume: (id) => {
    return adminRequest(`/resumes/${id}/`);
  },

  deleteResume: (id) => {
    return adminRequest(`/resumes/${id}/`, {
      method: "DELETE",
    });
  },

  getDownloads: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return adminRequest(`/downloads/?${query}`);
  },

  deleteDownload: (id) => {
    return adminRequest(`/downloads/${id}/`, {
      method: "DELETE",
    });
  },

  getFeedback: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return adminRequest(`/feedback/?${query}`);
  },

  deleteFeedback: (id) => {
    return adminRequest(`/feedback/${id}/`, {
      method: "DELETE",
    });
  },
};
