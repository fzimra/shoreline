import Link from "next/link";

export default function LocationSection({ location }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Location</h2>
      <p className="mt-2 text-sm text-slate-600">{location.address}</p>

      <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-slate-200 ring-1 ring-slate-300">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDvr8b0NAmPi_NHx_lKhYzTyCIKtXgnE30&q=${location.lat},${location.lng}`}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Link
        href={location.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700"
      >
        View in Google Maps →
      </Link>
    </div>
  );
}
