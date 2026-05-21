"use client";

import { useState } from "react";

export default function RelatoriosPage() {
  const [relatorioTipo, setRelatorioTipo] = useState("mensal");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 mb-6">
          <select
            value={relatorioTipo}
            onChange={(e) => setRelatorioTipo(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
            <option value="semanal">Semanal</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Exportar
          </button>
        </div>

        <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Relatório será exibido aqui</p>
        </div>
      </div>
    </div>
  );
}
