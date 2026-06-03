
import { useState } from "react";
import { Categoria } from "../../types";
import api from "../services/api";
import styles from "./css/CategoriaManager.module.css";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoriaManager({ categorias }: { categorias: Categoria[] }): void {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    icon: "",
    color: "#000000"
  });

  const escrever = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [evento.target.name]: evento.target.value 
    });
  }

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();
    console.log(formData);
    
    if (editingId) {
      // Atualizar categoria existente
      api.put(`/categorias/${editingId}`, formData)
        .then((resposta) => {
          console.log(resposta.data);
          alert("Categoria atualizada com sucesso!");
          setEditingId(null);
          setFormData({ nome: "", icon: "", color: "#000000" });
          setShowForm(false);
        })
        .catch((erro) => {
          console.error(erro);
          alert("Erro ao atualizar categoria.");
        });
    } else {
      // Criar nova categoria
      api.post("/categorias", formData)
        .then((resposta) => {
          console.log(resposta.data);
          alert("Categoria adicionada com sucesso!");
          setFormData({ nome: "", icon: "", color: "#000000" });
          setShowForm(false);
        })
        .catch((erro) => {
          console.error(erro);
          alert("Erro ao adicionar categoria.");
        });
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingId(categoria.id);
    setFormData({
      nome: categoria.nome,
      icon: categoria.icon?.toString() || "",
      color: categoria.color || "#000000"
    });
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ nome: "", icon: "", color: "#000000" });
    setShowForm(false);
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      api.delete(`/categorias/${id}`)
        .then(() => {
          alert("Categoria excluída com sucesso!");
        })
        .catch((erro) => {
          console.error(erro);
          alert("Erro ao excluir categoria.");
        });
    }
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {editingId ? "Atualizar" : "Adicionar"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
            )}
          </div>

    return (
      <div>
        <div className={styles["categorias-header"]}>
          <h2 className="text-xl font-bold">Categorias</h2>

          {/* depois alterar estilo do botao */}
          <button
            onClick={() => setShowForm(!showForm)}
            className=""
          >
            Nova Categoria
          </button>
        </div>

        {showForm && (
          <form className="mb-4 p-4 bg-gray-50 rounded-md" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome da categoria"
              className="w-full mb-2 p-2 border rounded"
              value={formData.nome}
              name="nome"
              onChange={escrever}
              required
            />
            <input
              type="text"
              placeholder="Ícone da categoria"
              className="w-full mb-2 p-2 border rounded"
              value={formData.icon}
              name="icon"
              onChange={escrever}
            />
            <input
              type="color"
              className="w-full mb-2 p-2 border rounded"
              value={formData.color}
              name="color"
              onChange={escrever}
            >
            
            </input>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {editingId ? "Atualizar" : "Adicionar"}
            </button>
          </form>
        )}

      <div className={styles["categorias-list"]}>
        {/* depois adicionar a cor do card dependendo da cor no banco de dados */}
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={styles["categoria-item"]}
          >
            <div className={styles["categoria-info"]}>
              <h3 className="font-semibold">{categoria.nome}</h3>
              <p className="text-sm text-gray-600">
                {categoria.icon}
              </p>
            </div>
            <div className={styles["categoria-actions"]}>
              {/* BOTAO EXCLUIR */}
              <button 
                onClick={() => handleDelete(categoria.id)}
                className="text-red-600 cursor-pointer transition-all hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
              {/* BOTAO EDITAR */}
              <button 
                onClick={() => handleEdit(categoria)}
                className="text-blue-500 cursor-pointer transition-all hover:text-blue-700"
              >
                <Pencil size={20} />
              </button>
              <form>
                {/* BOTAO EDITAR */}
                <button 
                  type="submit"
                  className="text-blue-500 cursor-pointer transition-all hover:text-blue-700"
                  >
                  <Pencil size={20} />
                </button>
              </form>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
}
