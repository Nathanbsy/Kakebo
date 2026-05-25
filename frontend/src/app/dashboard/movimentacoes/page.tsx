"use client";

import { useEffect, useState } from "react";
import MovimentacaoForm from "@/src/components/MovimentacaoForm";
import MovimentacaoList from "@/src/components/MovimentacaoList";
import api from "@/src/services/api";
import { Categoria, Movimentacao } from "@/types";
import styles from "@/src/components/css/Movimentacoes.module.css";

export default function MovimentacoesPage() {
  const [mostraForm, setMostraForm] = useState(false);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [mensagemRetorno, setMensagemRetorno] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  useEffect(() => {
    api.get("/movimentacoes")
      .then((resposta) => {
        if(!resposta || !resposta.data) {
          setMovimentacoes([]);
          setMensagemRetorno("Nenhuma movimentação encontrada.");
          return;
        }
        setMovimentacoes(resposta.data.data);
      })
      .catch((erro) => {
        console.error(erro);
      });
    api.get("/categorias")
      .then((resposta) => {
        if (!resposta || !resposta.data) {
          setCategorias([]);
          return;
        }
        setCategorias(resposta.data.data);
      })
      .catch((erro) => {
        console.error(erro);
      });
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className={styles.head + " flex items-center justify-between bg-white"}>
        <h1 className="text-3xl font-bold text-gray-900">Movimentações</h1>
        <button
          onClick={() => setMostraForm(!mostraForm)}
          className={styles.btn}
        >
          Nova Transação
        </button>
      </div>

      {mostraForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <MovimentacaoForm categorias={categorias} />
        </div>
      )}
      <div>
        <div className="bg-white rounded-lg shadow">
          <MovimentacaoList movimentacoes={movimentacoes} />
        </div>

        <div className="text-center text-gray-600">
          <p>{mensagemRetorno}</p>
        </div>
      </div>
    </div>
  );
}
