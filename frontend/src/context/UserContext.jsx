// ============================================================
// 🧠 UserContext.jsx — Manejo global de autenticación JWT
// ============================================================
// - Persiste el accessToken y opcionalmente el refreshToken
// - Interactúa con apiClient (Axios con interceptores)
// - Provee user, isLoggedIn, login, register, logout, loadUser
// ============================================================

import React, { createContext, useState, useContext, useEffect } from "react";
import { apiClient } from "../lib/apiClient"; // cliente axios con interceptores JWT

// ------------------------------------------------------------
// Contexto de Usuario
// ------------------------------------------------------------
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(() => readStored());
  const [isLoggedIn, setIsLoggedIn] = useState(!!userInfo?.accessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ============================================================
  // 🧱 Funciones internas
  // ============================================================

  // 🧩 Recupera sesión almacenada desde localStorage
  function readStored() {
    try {
      const raw = localStorage.getItem("userInfo");
      if (!raw) return null;
      const parsed = JSON.parse(raw);

      // ✅ Mejora mínima: soporte opcional a refreshToken
      if (parsed?.refreshToken) {
        return { ...parsed }; // se mantiene por si el backend lo entrega
      }

      return parsed;
    } catch {
      return null;
    }
  }

  // 🧩 Persiste datos del usuario autenticado
  function persist(obj) {
    const toSave = { ...obj };

    // ✅ Mejora mínima: guardar refreshToken si el backend lo devuelve
    if (obj?.refreshToken) {
      toSave.refreshToken = obj.refreshToken;
    }

    localStorage.setItem("userInfo", JSON.stringify(toSave));
    setUserInfo(toSave);
    setIsLoggedIn(!!obj?.accessToken);
  }

  // ============================================================
  // 🧭 Autenticación
  // ============================================================

 async function register(name, email, password) {
  try {
    setLoading(true);
    setError(null);

    // Payload correcto en JSON
    const payload = { name, email, password };

    const res = await apiClient.post("/auth/register", payload, {
      headers: { "Content-Type": "application/json" },
    });

    const info = res.data;
    persist(info);
    await loadUser();
    return info;
  } catch (err) {
    console.error("Error en register:", err);
    setError(err.response?.data?.message || err.message);
    throw err;
  } finally {
    setLoading(false);
  }
}


  async function login(credentials) {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.post("/auth/login", credentials);
      const info = res.data;
      persist(info);
      await loadUser();
      return info;
    } catch (err) {
      console.error("Error en login:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await apiClient.post("/auth/logout"); // elimina cookie refresh
    } catch (err) {
      console.warn("Error en logout:", err);
    } finally {
      localStorage.removeItem("userInfo");
      setUser(null);
      setUserInfo(null);
      setIsLoggedIn(false);
      setLoading(false);
    }
  }

  async function loadUser() {
    try {
      if (!userInfo?.accessToken) return;
      setLoading(true);
      const res = await apiClient.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error al cargar usuario:", err);
      if (err.response?.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // 🚀 Efecto inicial
  // ============================================================
  useEffect(() => {
    if (userInfo?.accessToken && !user) {
      loadUser();
    }
  }, []);

  // ============================================================
  // 📦 Valor del contexto
  // ============================================================
  const value = {
    user,
    userInfo,
    isLoggedIn,
    loading,
    error,
    login,
    register,
    logout,
    loadUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook para consumir el contexto
export function useUser() {
  return useContext(UserContext);
}
