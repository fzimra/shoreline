"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/common/Navbar";
import SiteFooter from "@/components/home/SiteFooter";
import MyPlanHeader from "@/components/my-plan/MyPlanHeader";
import PlanDestinationsList from "@/components/my-plan/PlanDestinationsList";
import PlanSummaryPanel from "@/components/my-plan/PlanSummaryPanel";
import {
  readTravelPlan,
  removeFromTravelPlan,
  reorderTravelPlan,
  travelPlanUpdateEventName,
} from "@/utils/travelPlanStorage";

export default function MyPlanPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const loadPlan = () => {
      setDestinations(readTravelPlan());
    };

    loadPlan();

    const eventName = travelPlanUpdateEventName();
    window.addEventListener(eventName, loadPlan);
    window.addEventListener("storage", loadPlan);

    return () => {
      window.removeEventListener(eventName, loadPlan);
      window.removeEventListener("storage", loadPlan);
    };
  }, []);

  const totalDistanceKm = useMemo(
    () =>
      destinations.reduce(
        (sum, item) => sum + (Number(item.distanceKm) || 0),
        0,
      ),
    [destinations],
  );

  const summary = {
    totalDestinations: String(destinations.length).padStart(2, "0"),
    estimatedDistance: `${totalDistanceKm.toFixed(1)} km`,
    driveTime: `${Math.max(10, Math.round(totalDistanceKm * 3))} mins`,
    routeName: "Custom Route",
    routeDescription: "Ordered by your travel plan",
    routeHref: "/my-plan",
    onDownloadPdf: async () => {
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF();
      let y = 18;

      doc.setFontSize(18);
      doc.text("Shoreline Travel Plan", 14, y);
      y += 10;

      doc.setFontSize(11);
      doc.text(`Total destinations: ${destinations.length}`, 14, y);
      y += 7;
      doc.text(`Total trip distance: ${totalDistanceKm.toFixed(1)} km`, 14, y);
      y += 10;

      destinations.forEach((item, index) => {
        if (y > 270) {
          doc.addPage();
          y = 18;
        }

        doc.setFontSize(12);
        doc.text(`${index + 1}. ${item.name}`, 14, y);
        y += 6;

        doc.setFontSize(10);
        doc.text(`Category: ${item.category}`, 14, y);
        y += 5;
        doc.text(
          `Distance: ${Number(item.distanceKm || 0).toFixed(1)} km`,
          14,
          y,
        );
        y += 5;

        const description = item.description || "";
        const lines = doc.splitTextToSize(description, 175);
        doc.text(lines, 14, y);
        y += lines.length * 5 + 4;
      });

      doc.save("shoreline-travel-plan.pdf");
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="flex-grow">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section>
              <MyPlanHeader
                title="My Travel Plan"
                description="Places you add from discovery cards will appear here. Drag and drop to reorder your itinerary."
              />

              <PlanDestinationsList
                destinations={destinations}
                onRemoveDestination={(id) => {
                  const next = removeFromTravelPlan(id);
                  setDestinations(next);
                }}
                onReorder={(fromIndex, toIndex) => {
                  const next = reorderTravelPlan(
                    destinations,
                    fromIndex,
                    toIndex,
                  );
                  setDestinations(next);
                }}
              />

              <Link
                href="/"
                className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              >
                Add Another Destination
              </Link>
            </section>

            <aside className="space-y-4 lg:pt-24">
              <PlanSummaryPanel summary={summary} />
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
