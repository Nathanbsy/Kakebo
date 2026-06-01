"use client";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import styles from "../../../components/css/Form.module.css";

export default function ConfiguracoesPage() {

  const [user, setUser] = useState({
    nome: "",
    email: "",
    rendaMensal: 0,
    metaEconomiaMensal: 0,
  });

  async function pegarDadosUsuario() {
    try {
      const res = await api.get("/me");
      console.log("Resposta da API /me:", res);
      if (res.data.success) {
        const userData = res.data.user;
        setUser({
          nome: userData.nome,
          email: userData.email,
          rendaMensal: userData.rendaMensal,
          metaEconomiaMensal: userData.metaEconomiaMensal,
        });
      } else {
        console.error("Erro ao buscar dados do usuário:", res.data.error);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }

  useEffect(() => {
    pegarDadosUsuario();
  }, []);

  function escrever(evento: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [evento.target.name]: evento.target.value
    });
  }

  async function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault();
    try {
      const res = await api.put("/me", {
        nome: user.nome,
        email: user.email,
        rendaMensal: user.rendaMensal,
        metaEconomiaMensal: user.metaEconomiaMensal,
      });
      if (res.data.success) {
        console.log("Dados do usuário atualizados com sucesso!");
      } else {
        console.error("Erro ao atualizar dados do usuário:", res.data.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
    
  } 
  

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>

      <div className={styles.formAuth}>
        <section >
          <h2 className="text-xl font-semibold mb-4">Perfil</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
              
              <input
                type="text"
                name="nome"
                className="mt-1 block w-full rounded-md border-gray-300"
                value={user.nome}
                onChange={escrever}
              />
              <label className={styles.label}>
                Nome
              </label>
            </div>
            <div className={styles["input-container"]}>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300"
                value={user.email}
                onChange={escrever}
              />
              <label className={styles.label}>
                Email
              </label>
            </div>
            <div className={styles["input-container"]}>
              <input
                type="text"
                name="rendaMensal"
                className="mt-1 block w-full rounded-md border-gray-300"
                value={user.rendaMensal}
                onChange={escrever}
              />
              <label className={styles.label}>
                Renda Mensal
              </label>
            </div>
            <div className={styles["input-container"]}>
              <input
                type="number"
                name="metaEconomiaMensal"
                className="mt-1 block w-full rounded-md border-gray-300"
                value={user.metaEconomiaMensal}
                onChange={escrever}
              />
              <label className={styles.label}>
                Meta de Economia Mensal
              </label>
            </div>
            <div className="text-center">
              <button
              type="submit"
              >
              Salvar
            </button>
            </div>
          </form>
        </section>

        <section className="pt-6">
          <h2 className="text-xl text-center font-semibold mb-4">Integrações</h2>
          <div className="space-y-2">
            <button className="block w-full text-left p-4 border rounded-md hover:bg-gray-50">
              Conectar Google Sheets
            </button>
            <button className="block w-full text-left p-4 border rounded-md hover:bg-gray-50">
              Conectar Power BI
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
