export default function TravelTips({ tips }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-sky-600">Travel Tips</h2>
      <ul className="mt-4 space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex gap-3">
            <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sky-100">
              <span className="text-xs font-bold text-sky-600">✓</span>
            </div>
            <p className="text-sm leading-5 text-slate-600">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
