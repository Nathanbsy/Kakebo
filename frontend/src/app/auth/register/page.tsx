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
    router.push("/home");
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
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex justify-center flex-col gap-4 items-center space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Registrar no Kakeibo
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles["formAuth"] + ' flex justify-center items-center flex-col w-82 h-fit mb-4'}>
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
            >
                {loading ? "Registrando..." : "Registrar"}
            </button>
            
          </div>
          <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem conta?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                  Entrar
                </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
}
