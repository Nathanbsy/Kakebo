/**
 * Dashboard page
 */
"use client";

import MonthlySpending from "@/components/Charts/MonthlySpending";
import CategoryBreakdown from "@/components/Charts/CategoryBreakdown";
import TrendAnalysis from "@/components/Charts/TrendAnalysis";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Gasto Este Mês</p>
          <p className="text-3xl font-bold text-gray-900">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total de Transações</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Orçamento Disponível</p>
          <p className="text-3xl font-bold text-gray-900">R$ 0,00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlySpending />
        <CategoryBreakdown />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendAnalysis />
      </div>
    </div>
  );
}
