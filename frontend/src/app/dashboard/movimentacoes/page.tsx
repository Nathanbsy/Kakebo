"use client";

import { useState } from "react";
import MovimentacaoForm from "@/frontend/src/components/MovimentacaoForm";
import MovimentacaoList from "@/frontend/src/components/MovimentacaoList";

export default function MovimentacoesPage() {
  const [mostraForm, setMostraForm] = useState(false);
  const [movimentacoes] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Movimentações</h1>
        <button
          onClick={() => setMostraForm(!mostraForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nova Transação
        </button>
      </div>

      {mostraForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <MovimentacaoForm />
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <MovimentacaoList movimentacoes={movimentacoes} />
      </div>
    </div>
  );
}
