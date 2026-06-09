import { Movimentacao } from '@/types';
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function GanhosMes({ movimentacoes }: { movimentacoes: Movimentacao[] }) {
    movimentacoes.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    const ganhosMesChart = useRef<HTMLCanvasElement>(null);  
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!ganhosMesChart.current) return;

        if (chartRef.current) {
        chartRef.current.destroy();
        }

        chartRef.current = new Chart(ganhosMesChart.current, {
        type: 'line',
        data: {
            labels: movimentacoes.map(mov => new Date(mov.data).toISOString().split('T')[0].split('-').reverse().join('/')).sort(),
            datasets: [
            {
                label: 'Ganhos',
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
            <h3 className="text-lg font-semibold mb-4">Ganhos do Mês</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <canvas id="ganhosMesChart" ref={ganhosMesChart}></canvas>
            </div>
        </div>
  );
}
