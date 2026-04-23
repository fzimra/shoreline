import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import EditPlaceForm from "@/components/dashboard/EditPlaceForm";

export default async function EditPlacePage({ params }) {
  const { id } = await params;

  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Places", href: "/dashboard/places" },
          { label: "Details", href: `/dashboard/places/${id}` },
        ]}
        currentLabel="Edit"
      />

      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Places
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Edit place
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Update place details, location, categories, and travel info.
        </p>
      </header>

      <EditPlaceForm placeId={id} />
    </div>
  );
}
