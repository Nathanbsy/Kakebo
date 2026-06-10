"use client";

import api from "@/src/services/api";
import { useState } from "react";


export default function RelatoriosPage() {
  const [ formData, setFormData ] = useState({
    dataInicio: "",
    dataFim: "",
    sepadadoPor: "mes"
  });
  const [loading, setLoading] = useState(false);

  function escrever(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value
    });
  }

  async function exportarCSV() {
    if (!formData.dataInicio || !formData.dataFim) {
      alert("Por favor, selecione as datas inicial e final");
      return;
    }

    try {
      setLoading(true);
      
      const response = await api.get("/relatorios/exportar", {
        params: {
          dataInicio: formData.dataInicio,
          dataFim: formData.dataFim,
          sepadadoPor: formData.sepadadoPor,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio_${formData.dataInicio}_${formData.dataFim}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao exportar relatório");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-center items-center gap-12 m-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="dataInicio" className="text-gray-700">
              Data inicial:
            </label>
            <input
              name="dataInicio"
              type="date"
              className="px-4 py-2 border rounded-md"
              value={formData.dataInicio}
              onChange={escrever}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dataFim" className="text-gray-700">
              Data final:
            </label>
            <input
              name="dataFim"
              type="date"
              className="px-4 py-2 border rounded-md"
              value={formData.dataFim}
              onChange={escrever}
              required
            />
          </div>
          <div className="mt-4">
            <button 
            onClick={exportarCSV}
            disabled={loading}
            className="bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Exportando..." : "Exportar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
