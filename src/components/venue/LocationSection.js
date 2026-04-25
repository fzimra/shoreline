import Link from "next/link";
import VenueMap from "@/components/venue/VenueMap";

export default function LocationSection({ location }) {
  const hasCoordinates =
    typeof location?.lat === "number" && typeof location?.lng === "number";

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Location</h2>
      <p className="mt-2 text-sm text-slate-600">{location.address}</p>

      <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-200 ring-1 ring-slate-300">
        {hasCoordinates ? (
          <VenueMap
            latitude={location.lat}
            longitude={location.lng}
            label={location.address || "Venue location"}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-sm text-slate-500">
            Location coordinates are unavailable.
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {location.mapUrl ? (
          <Link
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            View in Google Maps →
          </Link>
        ) : null}
        {hasCoordinates ? (
          <span className="text-sm text-slate-500">
            {location.lat}, {location.lng}
          </span>
        ) : null}
      </div>
    </div>
  );
}
