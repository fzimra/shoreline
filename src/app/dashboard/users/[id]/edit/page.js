import { notFound } from "next/navigation";
import connectToDatabase from "@/config/mongodb";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import EditUserForm from "@/components/dashboard/EditUserForm";
import User from "@/models/User";

export default async function EditUserPage({ params }) {
  await connectToDatabase();

  const { id } = await params;
  const user = await User.findById(id).select("username email role").lean();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users", href: "/dashboard/users" },
        ]}
        currentLabel="Edit"
      />

      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Users
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Edit user
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Update user profile, access role, and password.
        </p>
      </header>

      <EditUserForm
        user={{
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        }}
      />
    </div>
  );
}
