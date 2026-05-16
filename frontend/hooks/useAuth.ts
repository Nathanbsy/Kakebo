"use client";
import { useState, useEffect } from "react";
import { User } from "../types";
import api from "@/src/services/api";
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // verifica se o usuario ja esta logado nos cookies
    const token = Cookies.get("access_token");
    const userData = Cookies.get("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data.data;
      
      // Armazena o usuário no estado
      setUser(user);
      
      // Armazena o token e user nos cookies (axios já armazena automaticamente)
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("access_token", token);
      
      return { success: true, user };
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Falha ao realizar o login";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return { user, loading, error, login, logout };
}
