/**
 * Transactions page
 */
"use client";

import { useState } from "react";
import MovimentacaoForm from "@/frontend/components/MovimentacaoForm";
import MovimentacaoList from "@/frontend/components/MovimentacaoList";

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [transactions] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nova Transação
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <MovimentacaoForm />
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <MovimentacaoList movimentacoes={transactions} />
      </div>
    </div>
  );
}
