"use client";

import { useState, useRef } from "react";
import api from "@/src/services/api";
import styles from "@/src/components/css/Form.module.css";

interface OFXImporterProps {
  onSucesso?: () => void;
  onCancelar?: () => void;
}

export default function OFXImporter({ onSucesso, onCancelar }: OFXImporterProps) {
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [resultado, setResultado] = useState<{
    importadas: number;
    duplicadas: number;
    message: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleArquivoSelecionado = async (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;

    setCarregando(true);
    setMensagem(null);
    setResultado(null);

    try {
      // Ler o conteúdo do arquivo
      const conteudo = await lerArquivo(arquivo);

      // Enviar para o backend
      const resposta = await api.post("/movimentacoes/importar-ofx", {
        conteudoArquivo: conteudo,
      });

      if (resposta.data.success) {
        setMensagem({
          tipo: "sucesso",
          texto: resposta.data.message,
        });
        setResultado(resposta.data.data);

        // Limpar input
        if (inputRef.current) {
          inputRef.current.value = "";
        }

        // Chamar callback após alguns segundos
        setTimeout(() => {
          onSucesso?.();
        }, 2000);
      } else {
        setMensagem({
          tipo: "erro",
          texto: resposta.data.error || "Erro ao importar arquivo OFX",
        });
      }
    } catch (erro: any) {
      console.error("Erro ao importar:", erro);
      setMensagem({
        tipo: "erro",
        texto: erro.response?.data?.error || "Erro ao processar arquivo OFX",
      });
    } finally {
      setCarregando(false);
    }
  };

  const lerArquivo = (arquivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      leitor.onload = (evento) => {
        const conteudo = evento.target?.result as string;
        resolve(conteudo);
      };
      leitor.onerror = () => {
        reject(new Error("Erro ao ler arquivo"));
      };
      leitor.readAsText(arquivo);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Importar OFX</h2>
        <p className="text-gray-600 text-sm">
          Selecione um arquivo OFX do seu banco para importar transações automaticamente.
          As transações serão categorizadas como "Importado de OFX" e você poderá reclassificá-las depois.
        </p>

        {/* Input de arquivo */}
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept=".ofx,.OFX"
            onChange={handleArquivoSelecionado}
            disabled={carregando}
            className="hidden"
            id="ofx-input"
          />
          <label
            htmlFor="ofx-input"
            className={`block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition ${
              carregando ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
            }`}
          >
            {carregando ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando arquivo...
              </div>
            ) : (
              <div>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-6-12v12m0 0l-4-4m4 4l4-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-600 font-medium">Clique para selecionar um arquivo OFX</p>
              </div>
            )}
          </label>
        </div>

        {/* Mensagem de resultado */}
        {mensagem && (
          <div
            className={`p-4 rounded-lg ${
              mensagem.tipo === "sucesso"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            <p className="font-medium">{mensagem.texto}</p>
          </div>
        )}

        {/* Resumo de importação */}
        {resultado && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-900 mb-2">Resumo da Importação</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Transações importadas: <strong>{resultado.importadas}</strong></li>
              {resultado.duplicadas > 0 && (
                <li>⊘ Transações duplicadas (não importadas): <strong>{resultado.duplicadas}</strong></li>
              )}
            </ul>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3 pt-4">
          {onCancelar && (
            <button
              onClick={onCancelar}
              disabled={carregando}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Fechar
            </button>
          )}
        </div>

        {/* Dica de ajuda */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Dicas:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Verifique se o arquivo está no formato OFX (extensão .ofx)</li>
            <li>• Certifique-se de que o arquivo contém transações</li>
            <li>• As categorias podem ser alteradas após a importação</li>
            <li>• Transações duplicadas não serão importadas novamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
