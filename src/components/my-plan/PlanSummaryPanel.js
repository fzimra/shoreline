import Link from "next/link";

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

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Suggested Route
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {summary.routeName}
            </p>
            <p className="truncate text-xs text-slate-500">
              {summary.routeDescription}
            </p>
          </div>
          <Link
            href={summary.routeHref}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-sky-700 transition hover:text-sky-800"
          >
            View Map
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-md bg-sky-700 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-sky-800"
      >
        Confirm Itinerary
      </button>
    </section>
  );
}
