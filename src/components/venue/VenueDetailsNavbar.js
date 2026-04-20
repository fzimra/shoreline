import Link from "next/link";

export default function VenueDetailsNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            🗺️
          </span>
          <span>Shoreline</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/" className="transition-colors hover:text-slate-900">
            Home
          </Link>
          <Link href="/plan" className="transition-colors hover:text-slate-900">
            My Plan
          </Link>
        </nav>
      </div>
    </header>
  );
}
