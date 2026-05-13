import { useState } from "react";
import { Categoria } from "../types";

interface Props {
  categorias: Categoria[];
}

export default function CategoriaManager({ categorias }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nova Categoria
        </button>
      </div>

      {showForm && (
        <form className="mb-4 p-4 bg-gray-50 rounded-md">
          <input
            type="text"
            placeholder="Nome da categoria"
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Adicionar
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-semibold">{categoria.nome}</h3>
            <p className="text-sm text-gray-600">
              {/* depois adicionar a exibicao do icon */}
              {categoria.icon}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
