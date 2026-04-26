import Link from "next/link";

const footerLinks = [""];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-slate-800">
            Shoreline
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Design and built for traveler POV. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5 text-xs font-medium text-slate-500">
          {footerLinks.map((label) => (
            <Link
              key={label}
              href="#"
              className="transition hover:text-slate-800"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
