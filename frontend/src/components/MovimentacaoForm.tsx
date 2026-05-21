import { useState } from "react";
import api from "../services/api";

export default function MovimentacaoForm() {
  const [formData, setFormData] = useState({
    quantia: "",
    descricao: "",
    data: "",
    categoria: "",
    tipo: "despesa",
  });

  //depois subistituir essa bomba por aquela coisinha do bao
  const escrever = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  }

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();
    console.log(formData);
    api.post("/movimentacao", formData)
      .then((resposta) => {
        console.log(resposta.data);
        alert("Movimentação adicionada com sucesso!");
      })
      .catch((erro) => {
        console.error(erro);
        alert("Erro ao adicionar movimentação.");
      });
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
          onChange={escrever}
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
          onChange={escrever}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={escrever}
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
          onChange={escrever}
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
