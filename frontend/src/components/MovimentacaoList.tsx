import { Movimentacao } from "@/types/index";
import styles from "./css/Table.module.css";

interface Props {
  movimentacoes: Movimentacao[];
  onEdit: (movimentacao: Movimentacao) => void;
  onDelete: (id: string) => void;
}

export default function MovimentacaoList({ movimentacoes, onEdit, onDelete }: Props) {

  return (
    <div className="overflow-x-auto">
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>
              Data
            </th>
            <th className={styles.th}>
              Descrição
            </th>
            <th className={styles.th}>
              Categoria
            </th>
            <th className={styles.th}>
              Valor
            </th>
            <th className={styles.th}>
              Tipo
            </th>
            <th className={styles.th}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao.id}>
              <td className={styles.td}>
                {new Date(movimentacao.data).toISOString().split('T')[0].split('-').reverse().join('/')}
              </td>
              <td className={styles.td}>{movimentacao.descricao}</td>
              <td className={styles.td}>{movimentacao.categoria.nome}</td>
              <td className={styles.td}>{`R$ ${Number(movimentacao.quantia).toFixed(2).replace('.', ',')}`}</td>
              <td className={styles.td}>{movimentacao.tipo}</td>
              <td className={styles.td}>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(movimentacao)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Deseja realmente excluir esta movimentação?')) {
                        onDelete(movimentacao.id);
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
