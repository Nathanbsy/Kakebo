/**
 * Reports hook
 */
import { useState, useCallback } from "react";

export function useReports() {
  const [relatorioMensal, setRelatorioMensal] = useState(null);
  const [relatorioAnual, setRelatorioAnual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthlyReport = useCallback(async (month: number, year: number) => {
    try {
      setLoading(true);
      // const response = await api.get(`/reports/monthly?month=${month}&year=${year}`);
      // setRelatorioMensal(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch monthly report");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchYearlyReport = useCallback(async (year: number) => {
    try {
      setLoading(true);
      // const response = await api.get(`/reports/yearly?year=${year}`);
      // setRelatorioAnual(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch yearly report");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    relatorioMensal,
    relatorioAnual,
    loading,
    error,
    fetchMonthlyReport,
    fetchYearlyReport,
  };
}
