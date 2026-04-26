import Link from "next/link";

export default function PlanDestinationCard({
  destination,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <li
      className="list-none"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(index);
      }}
      onDrop={() => onDrop(index)}
    >
      <article className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
        <div className="flex w-9 shrink-0 flex-col items-center pt-1">
          <span className="text-xs leading-none text-slate-300">:::</span>
          <span className="mt-2 grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-xs font-bold text-slate-700">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200 sm:h-24 sm:w-30">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link href={`/places/${destination.id}`}>
                  <h3 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                    {destination.name}
                  </h3>
                </Link>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {destination.description}
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label={`Remove ${destination.name}`}
                onClick={() => onRemove(destination.id)}
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                {destination.distanceKm} km
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                {destination.category}
              </span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
