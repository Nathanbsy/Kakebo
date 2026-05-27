"use client";

import { useState, useEffect } from "react";
import CategoryManager from "@/src/components/CategoriaManager";
import api from "@/src/services/api";
import { Categoria } from "@/types";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        await api.get("/categorias").then((resposta) => {
          if (!resposta) {
            return resposta;
          }
          setCategorias(resposta.data.data);
        });
      } catch (erro) {
        console.error(erro);
      }
      
    };
    fetchCategorias();
  }, []);
  // useEffect(() => {
  //   api.get("/categorias")
  //     .then((resposta) => {
  //       setCategorias(resposta.data);
  //     })
  //     .catch((erro) => {
  //       console.error(erro);
  //     });
  // }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryManager categorias={categorias} />
      </div>
    </div>
  );
}
