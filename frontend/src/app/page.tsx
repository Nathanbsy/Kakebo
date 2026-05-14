"use client";

import { BarChart, FileSpreadsheet, Settings, WalletMinimal } from 'lucide-react';
import './globals.css'
import Card from "@/src/components/Card";

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center space-y-6 p-6 ">
      <div className="w-full h-full flex justify-center items-center gap-6 flex-wrap">
        <Card titulo="Seus Gastos & Ganhos" pagina="/dashboard" corBg="#065F46" corBgLight="#10B981" corShadow="rgba(16, 185, 129, 0.45)" icon={<BarChart size={32} color='white'/>} />
        <Card titulo="Configurações" pagina="/dashboard/configuracoes" corBg="#334155" corBgLight="#94A3B8" corShadow="rgba(51, 65, 85, 0.45)" icon={<Settings size={32} color='white'/>} />
        <Card titulo="Relatórios" pagina="/dashboard/relatorios" corBg="#5B21B6" corBgLight="#A855F7" corShadow="rgba(168, 85, 247, 0.45)" icon={<FileSpreadsheet size={32} color='white'/>} />
        <Card titulo="Movimentações" pagina="/dashboard/movimentacoes" corBg="#B45309" corBgLight="#F59E0B" corShadow="rgba(245, 158, 11, 0.45)" icon={<WalletMinimal size={32} color='white'/>} />
      </div>
    </div>
  );
}
