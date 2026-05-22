/**
 * Sidebar component
 */
export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-950 text-white">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          <li>
            <a href="/" className="block px-4 py-2 rounded hover:bg-blue-700">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/movimentacoes"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Movimentações
            </a>
          </li>
          <li>
            <a
              href="/categories"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Categorias
            </a>
          </li>
          <li>
            <a
              href="/reports"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Relatórios
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
