import { Movimentacao } from "@prisma/client";

interface Props {
  movimentacoes: Movimentacao[];
}

export default function MovimentacaoList({ movimentacoes }: Props) {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Tipo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {movimentacao.data.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{movimentacao.descricao}</td>
              <td className="px-6 py-4">{movimentacao.categoriaId}</td>
              <td className="px-6 py-4">{`R$ ${movimentacao.quantia.toFixed(2)}`}</td>
              <td className="px-6 py-4">{movimentacao.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
