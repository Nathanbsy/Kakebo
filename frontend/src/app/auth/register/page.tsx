
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const escrever = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle registration
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registrar no Kakeibo
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={escrever}
              placeholder="Nome"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={escrever}
              placeholder="Email"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={escrever}
              placeholder="Senha"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={escrever}
              placeholder="Confirmar Senha"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem conta?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-500">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
