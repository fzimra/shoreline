import Image from "next/image";
import Link from "next/link";

export default function PlaceCard({ place }) {
  return (
    <Link href={`/places/${place.id}`}>
      <article className="group relative h-52 overflow-hidden rounded-xl bg-slate-200 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-sky-600/95 px-2.5 py-1 text-xs font-medium text-white">
            {place.category}
          </span>
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white/95 text-slate-600 shadow hover:bg-white"
          aria-label={`Save ${place.name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          +
        </button>

        <div className="absolute inset-x-3 bottom-3 text-white">
          <h3 className="text-xl font-semibold leading-6 tracking-tight">
            {place.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-sky-100">
            {place.distanceKm} km away
          </p>
        </div>
      </article>
    </Link>
  );
}
