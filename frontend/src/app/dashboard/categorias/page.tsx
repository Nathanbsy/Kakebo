"use client";

import { useState } from "react";
import CategoryManager from "@/frontend/src/components/CategoriaManager";

export default function CategoriasPage() {
  const [categorias] = useState([]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryManager categorias={categorias} />
      </div>
    </div>
  );
}
