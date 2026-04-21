"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

const menuItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Places", href: "/dashboard/places" },
  { label: "Users", href: "/dashboard/users" },
];

export default function Sidebar({ username, email }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:p-6">
      <div className="flex h-full flex-col">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700/80">
            Shoreline
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h2>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-sky-700 text-white shadow-[0_10px_24px_rgba(2,132,199,0.28)]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">{username}</p>
          <p className="mt-1 text-xs text-slate-500">{email}</p>
        </div>

        <div className="mt-auto pt-6">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
