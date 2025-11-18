import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validar token al montar
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      api
        .get("/api/usuarios/perfil")
        .then((res) => {
          setUser(res.data.user || JSON.parse(storedUser));
        })
        .catch(() => {
          logout(false);
        })
        .finally(() => setLoading(false));
    } else {
      logout(false);
      setLoading(false);
    }
  }, []);

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

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/usuarios/login", { email, password });
      const { user: userResp, token: tokenResp } = res.data;

      setUser(userResp);
      setToken(tokenResp);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      throw new Error(err?.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      await api.post("/api/usuarios/register", { name, email, password });
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      throw new Error(err?.response?.data?.message || "Error al registrar");
    }
  };

  const logout = (redirect = true) => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    if (redirect) navigate("/home");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}