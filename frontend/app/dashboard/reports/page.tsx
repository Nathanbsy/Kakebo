/**
 * Reports page
 */
"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 mb-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="monthly">Mensal</option>
            <option value="yearly">Anual</option>
            <option value="custom">Personalizado</option>
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
