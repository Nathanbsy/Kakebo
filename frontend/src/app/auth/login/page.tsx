"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../../components/css/Form.module.css";
import { useAuth } from "../../../../hooks/useAuth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const isUserLoggedIn = () => {
    const token = Cookies.get("access_token");
    return !!token;
  }

  if (isUserLoggedIn()) {
    window.location.href = "/";
  }
  
  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(user.email, user.password);
      window.location.href = "/";
    } catch (err) {
      setError("Falha ao realizar o login");
    } finally {
      setLoading(false);
    }
  };

  function escrever(evento: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [evento.target.name]: evento.target.value
    });
    setError(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entrar no Kakeibo
          </h2>
        </div>
        <form className="flex flex-col items-center justify-center gap-4 space-y-4" onSubmit={handleSubmit}>
          <div className={styles.formAuth}>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <div className={styles["input-container"]}>
              
              <input
                type="email"
                value={user.email}
                onChange={escrever}
                name="email"
                id="email"
                // className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.underline}></div>
            </div>
            
            <div className={styles["input-container"]}>
              
              <input
                type="password"
                value={user.password}
                onChange={escrever}
                name="password"
                id="password"
                required
              />
              <label htmlFor="password" className={styles.label}>Senha</label>
              <div className={styles.underline}></div>
            </div>
            <button
            type="submit"
            disabled={loading}
            className={styles["login-button"]}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem conta?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                Registre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
