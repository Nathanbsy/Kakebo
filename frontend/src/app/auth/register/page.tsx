"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../../services/api";
import styles from "../../../components/css/Form.module.css";
import Cookies from "js-cookie";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUserLoggedIn = () => {
    const token = Cookies.get("access_token");
    return !!token;
  }

  if (isUserLoggedIn()) {
    router.push("/");
  }

  const escrever = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value,
    });
    setError(null);
  };

  const comparaSenhas = () => {
    if (formData.password !== formData.confirmPassword) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    
    if (!comparaSenhas()) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
      });
      
      if (res.status === 200 || res.status === 201) {
        setError(null);
        router.push("/auth/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col gap-8 items-center max-w-md w-full h-full space-y-8">
        <div>
          <h2 className="py-16 text-center text-3xl font-extrabold text-gray-900">
            Registrar no Kakeibo
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles["formulario"] + ' flex justify-center items-center flex-col w-82 h-fit'}>
            <div className={styles["input-container"]}>
              <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={escrever}
              required
            />
            <label htmlFor="nome" className={styles.label}>
              Nome
            </label>
            <div className={styles.underline}></div>
            </div>
            <div className={styles["input-container"]}>
              
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={escrever}
                required
              />
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.underline}></div>
            </div>
            
            <div className={styles["input-container"]}>
              <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={escrever}
              required
              />
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <div className={styles.underline}></div>
            </div>
            
            <div className={styles["input-container"]}>
              <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={escrever}
              required
            />
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Senha
            </label>
            <div className={styles.underline}></div>
            </div>
            

            <div className={styles.popup + ' ' + styles["error-popup"] + (error ? '' : ' ' + styles.escondido)}>
              <div className={styles["error-message"]}>{error || "Erro ao registrar"}</div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-8.5 flex justify-center items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {loading ? "Registrando..." : "Registrar"}
            </button>
            <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem conta?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                Entrar
              </Link>
            </p>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}
