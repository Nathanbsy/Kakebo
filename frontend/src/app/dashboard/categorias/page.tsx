"use client";

import { useState, useEffect } from "react";
import CategoryManager from "@/src/components/CategoriaManager";
import api from "@/src/services/api";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api.get("/categorias")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryManager categorias={categorias} />
      </div>
    </div>
  );
}
