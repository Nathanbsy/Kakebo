/**
 * Categories page
 */
"use client";

import { useState } from "react";
import CategoryManager from "@/components/CategoryManager";

export default function CategoriesPage() {
  const [categories] = useState([]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
