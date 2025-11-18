import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("auth_token") || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("auth_token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      console.log("AuthContext.login -> payload", { email, passwordProvided: !!password });
      const res = await api.post("/api/usuarios/login", { email, password });
      const { user: userResp, token: tokenResp } = res.data;

      setUser(userResp);
      setToken(tokenResp);
      setLoading(false);
      return userResp;
    } catch (err) {
      setLoading(false);
      const message = err?.response?.data?.message || err.message || "Error al iniciar sesión";
      console.error("AuthContext.login error:", err?.response?.data || err);
      throw new Error(message);
    }
  };

  // REGISTER
  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      console.log("AuthContext.register -> payload", { name, email, passwordProvided: !!password });
      const res = await api.post("/api/usuarios/register", { name, email, password });
      const { user: userResp } = res.data;
      setLoading(false);
      return userResp;
    } catch (err) {
      setLoading(false);
      const message = err?.response?.data?.message || err.message || "Error al registrar";
      console.error("AuthContext.register error:", err?.response?.data || err);
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}