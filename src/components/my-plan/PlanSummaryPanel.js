function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="text-sm text-slate-600">{label}</dt>
      <dd className="text-2sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

export default function PlanSummaryPanel({ summary }) {
  return (
    <>
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-3xl font-semibold tracking-tight text-sky-700">
          Plan Summary
        </h2>

        <dl className="mt-4 divide-y divide-slate-200">
          <SummaryRow
            label="Total Destinations"
            value={summary.totalDestinations}
          />
          <SummaryRow
            label="Estimated Distance"
            value={summary.estimatedDistance}
          />
          <SummaryRow label="Drive Time" value={summary.driveTime} />
        </dl>

        <button
          type="button"
          onClick={summary.onDownloadPdf}
          className="mt-5 w-full rounded-md bg-sky-700 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-sky-800"
        >
          Download Plan PDF
        </button>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Pro Tip: </span>Use
          Drag & Drop to rearrange your destinations and optimize your trip
          flow!
        </p>
      </section>
    </>
  );
}
