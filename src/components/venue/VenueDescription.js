export default function VenueDescription({ name, description }) {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-slate-900 sm:text-4xl">
        {name}
      </h1>
      <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}
