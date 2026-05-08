/**
 * Sidebar component
 */
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          <li>
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-800">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/transactions"
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Transações
            </a>
          </li>
          <li>
            <a
              href="/categories"
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Categorias
            </a>
          </li>
          <li>
            <a
              href="/reports"
              className="block px-4 py-2 rounded hover:bg-gray-800"
            >
              Relatórios
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
