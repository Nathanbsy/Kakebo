/**
 * Transactions hook
 */
import { useState, useCallback } from "react";
import { Transaction } from "@/types";
import api from "@/services/api";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await api.get("/transactions");
      // setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (data: Partial<Transaction>) => {
    try {
      setLoading(true);
      // const response = await api.post("/transactions", data);
      // setTransactions([...transactions, response.data]);
      setError(null);
    } catch (err) {
      setError("Failed to create transaction");
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // await api.delete(`/transactions/${id}`);
      // setTransactions(transactions.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete transaction");
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
  };
}
