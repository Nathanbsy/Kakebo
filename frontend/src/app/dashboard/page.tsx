"use client";

import MensalSpending from "@/src/components/Charts/MensalSpending";
import CategoriaBreakdown from "@/src/components/Charts/CategoriaBreakdown";
import { useEffect, useState } from "react";
import { Categoria, Movimentacao, User } from "@/types";
import api from "@/src/services/api";
import styles from "@/src/components/css/Dashboard.module.css";

export default function DashboardPage() {
  const [ movimentacoes, setMovimentacoes ] = useState<Movimentacao[]>([]);
  const [ categorias, setCategorias ] = useState<Categoria[]>([]);
  const [ user, setUser ] = useState<User | null>(null);

  var totalGastoMes: number = Number(movimentacoes.reduce((sum: number, mov: Movimentacao) => sum + Number(mov.quantia), 0));

  var totalTransacoes: number = Number(movimentacoes.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/me")
        .then((resposta) => {
          console.log("Resposta da API /me:", resposta.data);
          if (!resposta || !resposta.data) {
            setUser(null);
            return;
          }
          setUser(resposta.data.user);
        });
        await api.get("/movimentacoes/gasto-mensal")
        .then((resposta) => {
          console.log("Resposta da API /movimentacoes/gasto-mensal:", resposta);
          if (!resposta || !resposta.data) {
            setMovimentacoes([]);
            return;
          }
          setMovimentacoes(resposta.data.data);
        });
        await api.get("/categorias")
        .then((resposta) => {
          console.log("Resposta da API /categorias:", resposta);
          if (!resposta || !resposta.data) {
            setCategorias([]);
            return;
          }
          setCategorias(resposta.data.data);
        });
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      {/* <div className={styles["di-radio-wrap"]}>
        <input
          type="radio"
          name="di-radio"
          id="r1"
          className={styles["di-radio-input"]}
          checked={true}
        />
        <input type="radio" name="di-radio" id="r2" className={styles["di-radio-input"]}  />
        <input type="radio" name="di-radio" id="r3" className={styles["di-radio-input"]} />

        <div className={styles["di-radio-island"]}>
          <label htmlFor="r1" className={styles["di-radio-btn"]}>Ano</label>
          <label htmlFor="r2" className={styles["di-radio-btn"]}>Mês</label>
          <label htmlFor="r3" className={styles["di-radio-btn"]}>Semana</label>
          <div className={styles["di-radio-indicator"]}></div>
        </div>
      </div> */}
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-card"]}>
          <p className="text-gray-600 text-sm">Sua Renda Mensal</p>
          <p className="text-3xl font-bold text-gray-900">R$ {Number(user?.rendaMensal)?.toFixed(2).replace('.', ',') ?? "0,00"}</p>
        </div>
        <div className={styles["dashboard-card"]}>
          <p className="text-gray-600 text-sm">Total Gasto Este Mês</p>
          <p className="text-3xl font-bold text-gray-900">R$ {Number(totalGastoMes)?.toFixed(2).replace('.', ',') ?? "0,00"}</p>
        </div>
        <div className={styles["dashboard-card"]}>
          <p className="text-gray-600 text-sm">Total de Transações</p>
          <p className="text-3xl font-bold text-gray-900">{Number(totalTransacoes) ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MensalSpending movimentacoes={movimentacoes} />
        <CategoriaBreakdown movimentacoes={movimentacoes} categorias={categorias} />
      </div>
    </div>
  );
}
