import { useState } from "react";
import api from "../services/api";
import { Categoria } from "@/types";

export default function MovimentacaoForm({ categorias }: { categorias: Categoria[] }) {
  const [formData, setFormData] = useState({
    quantia: "",
    descricao: "",
    data: "",
    categoriaId: 0,
    tipo: "Despesa",
    metodo: "",
  });

  const escrever = (evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      
      ...formData, 
      [evento.target.name]: evento.target.value,
      
    });
    
  }

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    console.log(formData);
    try {
      await api.post("/movimentacoes", formData)
      .then((resposta) => {
        console.log(resposta);
        alert("Movimentação adicionada com sucesso!");
      });
    } catch (erro) {
      console.error(erro);
      alert("Erro ao adicionar movimentação.");
    }
    
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
          name="categoriaId"
          value={formData.categoriaId}
          onChange={escrever}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        >
          <option>Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={escrever}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </select>
        
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Método
        </label>
        <select
          name="metodo"
          value={formData.metodo}
          onChange={escrever}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        >
          <option>Selecione um método</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Pix">Pix</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Cartão de Débito">Cartão de Débito</option>
          <option value="Transferência Bancária">Transferência</option>
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
