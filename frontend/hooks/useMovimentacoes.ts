import { useState, useCallback } from "react";
import { Movimentacao } from "@/types";

export function useMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovimentacoes = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await api.get("/movimentacoes");
      // setMovimentacoes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movimentacoes");
    } finally {
      setLoading(false);
    }
  }, []);

  const createMovimentacao = useCallback(async (data: Partial<Movimentacao>) => {
    try {
      setLoading(true);
      // const response = await api.post("/movimentacoes", data);
      // setMovimentacoes([...movimentacoes, response.data]);
      setError(null);
    } catch (err) {
      setError("Failed to create movimentacao");
    } finally {
      setLoading(false);
    }
  }, [movimentacoes]);

  const deleteMovimentacao = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // await api.delete(`/movimentacoes/${id}`);
      // setMovimentacoes(movimentacoes.filter(m => m.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete movimentacao");
    } finally {
      setLoading(false);
    }
  }, [movimentacoes]);

  return {
    movimentacoes,
    loading,
    error,
    fetchMovimentacoes,
    createMovimentacao,
    deleteMovimentacao,
  };
}
