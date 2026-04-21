export default function DashboardUsersPage() {
  return (
    <div>
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Users
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Team and access
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Monitor user accounts and role-based access across the workspace.
        </p>
      </header>

      <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Email
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                Admin User
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                admin@shoreline.app
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">admin</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                Travel Editor
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                editor@shoreline.app
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">editor</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
