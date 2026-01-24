import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser as apiLogin, logoutUser as apiLogout } from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedRole = localStorage.getItem("role");

    setIsAuthenticated(!!token);
    setRole(savedRole);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);

      const data = response.detail.data;
      const tokens = data.tokens;

      // ✅ SAVE TOKENS
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);

      // ✅ SAVE ROLE (CRITICAL)
      localStorage.setItem("role", data.role);

      setIsAuthenticated(true);
      setRole(data.role);

      // ❌ DO NOT navigate here
      return {
        success: true,
        role: data.role,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.warn("Logout API failed, clearing tokens locally");
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");

      setIsAuthenticated(false);
      setRole(null);
    }
  };

  const value = {
    isAuthenticated,
    role,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
