import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
        >
          <Image
            src="/images/logo.png"
            alt="Shoreline logo"
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="border-b-2 border-sky-600 pb-1 text-sky-700 transition-colors hover:text-sky-800"
          >
            Home
          </Link>
          <Link href="/plan" className="transition-colors hover:text-slate-900">
            My Plan
          </Link>

          <button
            type="button"
            className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-sky-100"
            aria-label="Open profile"
          >
            <Image
              src="/mock/avatar.svg"
              alt="Profile avatar"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </button>
        </nav>
      </div>
    </header>
  );
}
