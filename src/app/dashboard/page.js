import Link from "next/link";
import { cookies } from "next/headers";
import { decodeAuthSession, getAuthCookieName } from "@/utils/auth-session";

function StatCard({ label, value, detail }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
    </article>
  );
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAuthCookieName())?.value;
  const session = decodeAuthSession(sessionCookie);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
            Overview
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back, {session.username}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            You are signed in as {session.email}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Open My Plan
          </Link>
        </div>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Role"
          value={session.role}
          detail="Your current workspace permissions."
        />
        <StatCard
          label="Saved Plans"
          value="03"
          detail="Your latest itineraries are ready to review."
        />
        <StatCard
          label="Upcoming Trips"
          value="01"
          detail="One trip is confirmed for this month."
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Quick Actions
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/my-plan"
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-sm"
            >
              <p className="font-semibold text-slate-900">Continue planning</p>
              <p className="mt-1 text-sm text-slate-500">
                Review your Kandy Highlands itinerary.
              </p>
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300 hover:shadow-sm"
            >
              <p className="font-semibold text-slate-900">Explore places</p>
              <p className="mt-1 text-sm text-slate-500">
                Find new destinations across the East Coast.
              </p>
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700/80">
            Session
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Your login session is stored in an HttpOnly cookie and will be
            cleared when you sign out.
          </p>
        </article>
      </section>
    </div>
  );
}
