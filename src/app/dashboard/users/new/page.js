import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import NewUserForm from "@/components/dashboard/NewUserForm";

export default function DashboardNewUserPage() {
  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users", href: "/dashboard/users" },
        ]}
        currentLabel="New"
      />

      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Users
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Add new user
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fill in the details below to create a new user account.
        </p>
      </header>

      <NewUserForm />
    </div>
  );
}
