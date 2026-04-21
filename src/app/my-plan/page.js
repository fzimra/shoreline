import Navbar from "@/components/home/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import MyPlanHeader from "@/components/my-plan/MyPlanHeader";
import PlanDestinationsList from "@/components/my-plan/PlanDestinationsList";
import PlanSummaryPanel from "@/components/my-plan/PlanSummaryPanel";
import PlanTipPanel from "@/components/my-plan/PlanTipPanel";
import { mockPlan } from "@/data/mockPlan";

export default function MyPlanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="flex-grow">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section>
              <MyPlanHeader
                title={mockPlan.title}
                description={mockPlan.description}
              />

              <PlanDestinationsList destinations={mockPlan.destinations} />

              <button
                type="button"
                className="mt-8 w-full rounded-lg border border-dashed border-slate-300 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              >
                Add Another Destination
              </button>
            </section>

            <aside className="space-y-4 lg:pt-24">
              <PlanSummaryPanel summary={mockPlan.summary} />
              <PlanTipPanel tip={mockPlan.tip} />
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
