import { Categoria, Movimentacao } from '@/types';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface Props {
  movimentacoes: Movimentacao[];
  categorias: Categoria[];
}

export default function CategoriaBreakdown({ movimentacoes, categorias }: Props) {
  const categoriaBreakdownChart = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);


  useEffect(() => {
    if (!categoriaBreakdownChart.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Calculate total spending per category
    const categoriaTotals = movimentacoes.reduce((acc, mov) => {
      const { categoria, quantia } = mov;
      if (!acc[categoria.id]) {
        acc[categoria.id] = { ...categoria, total: 0 };
      }
      acc[categoria.id].total += Number(quantia);
      return acc;
    }, {} as Record<string, { id: string; nome: string; total: number }>);

    // Prepare data for the chart
    const labels = Object.values(categoriaTotals).map(c => c.nome);
    const data = Object.values(categoriaTotals).map(c => c.total);
    const backgroundColors = Object.values(categoriaTotals).map(c => {
      const categoriaInfo = categorias.find(cat => cat.id === c.id);
      return categoriaInfo ? `${categoriaInfo.color}66` : 'rgba(136, 136, 136, 0.2)';
    });

    chartRef.current = new Chart(categoriaBreakdownChart.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            borderWidth: 0.25,
          }
        ]
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
    
  }, [movimentacoes, categorias]);
  return (
    
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gastos por Categoria</h3>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <canvas ref={categoriaBreakdownChart}></canvas>
      </div>
    </div>
  );
}
