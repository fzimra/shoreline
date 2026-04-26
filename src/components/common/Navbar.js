"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 pb-1 transition-colors ${
                  isActive
                    ? "border-sky-600 text-sky-700 hover:text-sky-800"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-sky-100"
            aria-label="Open profile"
          >
            <Link href="/dashboard">
              <Image
                src="/mock/avatar.svg"
                alt="Profile avatar"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </Link>
          </button>
        </nav>
      </div>
    </header>
  );
}
