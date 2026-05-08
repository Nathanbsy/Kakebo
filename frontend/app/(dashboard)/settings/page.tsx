/**
 * Settings page
 */
"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Perfil</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </form>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Integrações</h2>
          <div className="space-y-2">
            <button className="block w-full text-left p-4 border rounded-md hover:bg-gray-50">
              Conectar Google Sheets
            </button>
            <button className="block w-full text-left p-4 border rounded-md hover:bg-gray-50">
              Conectar Power BI
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
