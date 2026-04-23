import Link from "next/link";

export default function DashboardBreadcrumb({ items, currentLabel }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-5 flex flex-wrap items-center gap-2 text-sm"
    >
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 ? <span className="text-slate-400">/</span> : null}
          <Link
            href={item.href}
            className="font-medium text-slate-500 transition hover:text-slate-700"
          >
            {item.label}
          </Link>
        </div>
      ))}
      {items.length > 0 ? <span className="text-slate-400">/</span> : null}
      <span className="font-semibold text-slate-900">{currentLabel}</span>
    </nav>
  );
}
