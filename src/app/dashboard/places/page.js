export default function DashboardPlacesPage() {
  return (
    <div>
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Places
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Manage places
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review destination data, categories, and publication status.
        </p>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Total Places
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            24
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Published
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            20
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Drafts
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            4
          </p>
        </article>
      </section>
    </div>
  );
}
