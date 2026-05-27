import { Movimentacao } from "@/types/index";
import styles from "./css/Table.module.css";

interface Props {
  movimentacoes: Movimentacao[];
}

export default function MovimentacaoList({ movimentacoes }: Props) {

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
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao.id}>
              <td className={styles.td}>
                {new Date(movimentacao.data).toLocaleDateString("pt-BR")}
              </td>
              <td className={styles.td}>{movimentacao.descricao}</td>
              <td className={styles.td}>{movimentacao.categoria?.nome || "Categoria não encontrada" }</td>
              <td className={styles.td}>{`R$ ${Number(movimentacao.quantia).toFixed(2).replace('.', ',')}`}</td>
              <td className={styles.td}>{movimentacao.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
