import Image from "next/image";

function TravelSegment({ travel }) {
  if (!travel) {
    return null;
  }

  return (
    <div className="ml-9 border-l border-dashed border-slate-300 pl-5 sm:ml-10">
      <p className="py-3 text-xs font-medium text-sky-700">{travel}</p>
    </div>
  );
}

export default function PlanDestinationCard({ destination, showTravel }) {
  return (
    <li className="list-none">
      <article className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
        <div className="flex w-9 shrink-0 flex-col items-center pt-1">
          <span className="text-xs leading-none text-slate-300">:::</span>
          <span className="mt-2 grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-xs font-bold text-slate-700">
            {destination.order}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200 sm:h-24 sm:w-30">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(max-width: 640px) 96px, 120px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                  {destination.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {destination.description}
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label={`Remove ${destination.name}`}
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                {destination.duration}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                {destination.category}
              </span>
            </div>
          </div>
        </div>
      </article>

      <TravelSegment travel={showTravel ? destination.travel : null} />
    </li>
  );
}
