"use client";

import MensalSpending from "@/src/components/Charts/MensalSpending";
import CategoriaBreakdown from "@/src/components/Charts/CategoriaBreakdown";
import TrendAnalysis from "@/src/components/Charts/TrendAnalysis";
import Cookies from "js-cookie";

export default function DashboardPage() {
  
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

  var totalGastoMes: number = 0;

  var totalTransacoes: number = 0;

  var orcamentoDisponivel: number = 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Sua renda mensal</p>
          <p className="text-3xl font-bold text-gray-900">R$ {user?.rendaMensal?.toFixed(2) ?? "0,00"}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Gasto Este Mês</p>
          <p className="text-3xl font-bold text-gray-900">R$ {totalGastoMes?.toFixed(2) ?? "0,00"}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total de Transações</p>
          <p className="text-3xl font-bold text-gray-900">{totalTransacoes ?? 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Orçamento Disponível</p>
          <p className="text-3xl font-bold text-gray-900">R$ {orcamentoDisponivel?.toFixed(2) ?? "0,00"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MensalSpending />
        <CategoriaBreakdown />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendAnalysis />
      </div>
    </div>
  );
}
