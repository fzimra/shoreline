import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { decodeAuthSession, getAuthCookieName } from "@/utils/auth-session";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAuthCookieName())?.value;
  const session = decodeAuthSession(sessionCookie);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.09),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef4fb_100%)] text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-7">
          <DashboardSidebar username={session.username} email={session.email} />
          <section className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
