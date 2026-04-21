export default function MyPlanHeader({ title, description }) {
  return (
    <header>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-sky-700 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
        {description}
      </p>
    </header>
  );
}
