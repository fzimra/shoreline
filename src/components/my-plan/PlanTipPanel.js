export default function PlanTipPanel({ tip }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-700">
        <span className="font-semibold text-slate-900">Pro Tip:</span> {tip}
      </p>
    </section>
  );
}
