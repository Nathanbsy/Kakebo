import { Movimentacao } from '@/types';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function MensalSpending({ movimentacoes }: { movimentacoes: Movimentacao[] }) {
  const mensalSpendingChart = useRef<HTMLCanvasElement>(null);  
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!mensalSpendingChart.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(mensalSpendingChart.current, {
      type: 'line',
      data: {
        labels: movimentacoes.map(mov => new Date(mov.data).toLocaleDateString('pt-BR')).sort(),
        datasets: [
          {
            label: 'Gastos',
            data: movimentacoes.map(mov => Number(mov.quantia)),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
        ]
      }
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [movimentacoes]);
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gráfico deste Mês</h3>
      <div>
        <canvas id="mensalSpendingChart" ref={mensalSpendingChart}></canvas>
      </div>
    </div>
  );
}
