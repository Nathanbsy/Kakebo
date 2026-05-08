/**
 * Monthly spending chart component
 */
export default function MonthlySpending() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gastos Mensais</h3>
      {/* Chart placeholder - integrate Recharts or Chart.js here */}
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-500">Gráfico será renderizado aqui</p>
      </div>
    </div>
  );
}
