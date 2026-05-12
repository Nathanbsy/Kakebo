/**
 * Transaction form component
 */
import { useState } from "react";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    quantia: "",
    descricao: "",
    data: "",
    categoria: "",
    tipo: "despesa",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantia
        </label>
        <input
          type="number"
          name="quantia"
          value={formData.quantia}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        >
          <option>Selecione uma categoria</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Adicionar Movimentação
      </button>
    </form>
  );
}
