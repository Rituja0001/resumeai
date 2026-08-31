import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin, register as apiRegister, googleLogin as apiGoogleLogin, getMe } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    setToken(null);
  }, []);

  // Validate session / load fresh user details on startup
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        try {
          const userData = await getMe();
          setUser((prev) => {
            const updated = {
              ...(prev || {}),
              ...userData,
              picture: prev?.picture || userData.picture || "",
              name: prev?.name || userData.first_name || userData.username || "",
            };
            localStorage.setItem("auth_user", JSON.stringify(updated));
            return updated;
          });
          setToken(storedToken);
        } catch (err) {
          console.warn("Session check failed:", err.message);
          if (!localStorage.getItem("auth_user")) {
            logout();
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const handleAutoLogout = () => logout();
    window.addEventListener("auth:logout", handleAutoLogout);
    return () => window.removeEventListener("auth:logout", handleAutoLogout);
  }, [logout]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    const currentUser = data.user || { email, username: email.split("@")[0] };
    setUser(currentUser);
    setToken(data.access);
    localStorage.setItem("auth_user", JSON.stringify(currentUser));
    return data;
  };

  const signup = async (email, username, password) => {
    const data = await apiRegister(email, username, password);
    const currentUser = data.user || { email, username };
    setUser(currentUser);
    setToken(data.access);
    localStorage.setItem("auth_user", JSON.stringify(currentUser));
    return data;
  };

  const loginWithGoogle = async (credential) => {
    const data = await apiGoogleLogin(credential);
    const currentUser = data.user || { email: "google_user", username: "Google User" };
    setUser(currentUser);
    setToken(data.access);
    localStorage.setItem("auth_user", JSON.stringify(currentUser));
    return data;
  };

  const updateUser = (partial) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...partial };
      localStorage.setItem("auth_user", JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
