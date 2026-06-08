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
  const [movimentacaoParaEditar, setMovimentacaoParaEditar] = useState<Movimentacao | undefined>(undefined);

  const totalGasto: number = Number(movimentacoes.reduce((sum: number, mov: Movimentacao) => sum + (mov.tipo == "Despesa" ? Number(mov.quantia) : 0), 0));
  const totalGanho: number = Number(movimentacoes.reduce((sum: number, mov: Movimentacao) => sum + (mov.tipo == "Receita" ? Number(mov.quantia) : 0), 0));
  
  const fetchMovimentacoes = async () => {
    try {
      const resposta = await api.get("/movimentacoes");
      if(!resposta || !resposta.data) {
        setMovimentacoes([]);
        setMensagemRetorno("Nenhuma movimentação encontrada.");
        return;
      }
      setMovimentacoes(resposta.data.data);
    } catch (erro) {
      console.error(erro);
    }
  };

  const fetchCategorias = async () => {
    try {
      const resposta = await api.get("/categorias");
      if (!resposta || !resposta.data) {
        setCategorias([]);
        return;
      }
      setCategorias(resposta.data.data);
    } catch (erro) {
      console.error("Erro ao buscar categorias:", erro);
    }
  };

  useEffect(() => {
    fetchMovimentacoes();
    fetchCategorias();
  }, []);

  const handleEdit = (movimentacao: Movimentacao) => {
    setMovimentacaoParaEditar(movimentacao);
    setMostraForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/movimentacoes/${id}`);
      alert("Movimentação excluída com sucesso!");
      fetchMovimentacoes();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir movimentação.");
    }
  };

  const handleSucesso = () => {
    setMostraForm(false);
    setMovimentacaoParaEditar(undefined);
    fetchMovimentacoes();
  };

  const handleCancelar = () => {
    setMostraForm(false);
    setMovimentacaoParaEditar(undefined);
  };

  return (
    <div className="space-y-6 p-6">
      <div className={styles.head + " flex items-center justify-between bg-white"}>
        <h1 className="text-3xl font-bold text-gray-900">Movimentações</h1>
        <button
          onClick={() => {
            setMovimentacaoParaEditar(undefined);
            setMostraForm(!mostraForm);
          }}
          className={styles.btn}
        >
          Nova Movimentação
        </button>
      </div>

      {mostraForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <MovimentacaoForm 
            categorias={categorias} 
            movimentacaoParaEditar={movimentacaoParaEditar}
            onSucesso={handleSucesso}
            onCancelar={handleCancelar}
          />
        </div>
      )}
      <div>
        <div className="bg-white rounded-lg shadow">
          <MovimentacaoList 
            movimentacoes={movimentacoes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="text-center text-gray-600">
          <p>{mensagemRetorno}</p>
        </div>
        <div className="flex justify-between mt-4">
          <div>
             <p>Total gasto: R$ {totalGasto.toFixed(2).replace('.', ',')}</p>
              <p>Total ganho: R$ {totalGanho.toFixed(2).replace('.', ',')}</p>
          </div>
          <button
            onClick={() => (console.log(movimentacoes))}
            className={styles.btn}
          >
            Importar OFX
          </button>
        </div>
      </div>
    </div>
  );
}
