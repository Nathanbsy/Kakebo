/**
 * Authentication hook
 */
import { useState, useEffect } from "react";
import { User } from "../types";
import axios from "axios";
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
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
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data.data;
      Cookies.set("access_token", token, {
        httpOnly: true,
        secure: true,
        // strict e utilizado para quando o cookie e enviado se a navegacao vier do mesmo site
        // lax e utilizado para quando o cookie e enviado se a navegacao vier de outro site, ou seja, em cross-site e bloqueia a maioria das requisições cross-site preigosas
        sameSite: "lax",
        expires: 1, 
      });
      Cookies.set("user", JSON.stringify(user));
      setError(null);
    } catch (err) {
      setError("Falha ao realizar o login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    setUser(null);
  };

  return { user, loading, error, login, logout };
}
