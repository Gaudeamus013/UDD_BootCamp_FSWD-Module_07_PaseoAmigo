// ============================================================
// 🧠 CONTEXTO GLOBAL DE USUARIO – Paseo Amigo v4.1
// ============================================================
// Maneja:
// • Registro, login y logout
// • Persistencia de sesión (localStorage)
// • Verificación del perfil autenticado (JWT)
// • Compatible con PayPalCheckout.jsx (user?._id, user?.token)
// ============================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/api";

// Crear el contexto
export const UserContext = createContext();

// ============================================================
// 🧩 Provider principal
// ============================================================
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // ------------------------------------------------------------
  // 📋 Registrar nuevo usuario
  // ------------------------------------------------------------
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
        setIsLoggedIn(true);
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "No se pudo crear la cuenta. Intenta nuevamente.",
      };
    }
  };

  // ------------------------------------------------------------
  // 🔐 Iniciar sesión
  // ------------------------------------------------------------
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
        setIsLoggedIn(true);
      }

      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales.",
      };
    }
  };

  // ------------------------------------------------------------
  // 🚪 Cerrar sesión
  // ------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsLoggedIn(false);
  };

  // ------------------------------------------------------------
  // 👤 Obtener perfil autenticado
  // ------------------------------------------------------------
  const fetchProfile = async () => {
    if (!user?.token) return null;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return data;
    } catch (error) {
      console.error("⚠️ Error al obtener perfil:", error);
      return null;
    }
  };

  // ------------------------------------------------------------
  // ♻️ Persistencia entre sesiones
  // ------------------------------------------------------------
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // ============================================================
  // 📡 Exportar valores globales
  // ============================================================
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        register,
        login,
        logout,
        fetchProfile,
        setUser,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ============================================================
// 🎯 Hook personalizado (compatibilidad PayPalCheckout.jsx)
// ============================================================
export const useUser = () => useContext(UserContext);
