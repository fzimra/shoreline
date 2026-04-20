"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import VenueDetailsNavbar from "@/components/venue/VenueDetailsNavbar";
import SiteFooter from "@/components/home/SiteFooter";
import BackNavigation from "@/components/venue/BackNavigation";
import VenueHero from "@/components/venue/VenueHero";
import VenueCategories from "@/components/venue/VenueCategories";
import VenueDescription from "@/components/venue/VenueDescription";
import TravelTips from "@/components/venue/TravelTips";
import LocationSection from "@/components/venue/LocationSection";
import { mockPlacesDetail } from "@/data/mockPlaces";

export default function VenueDetailsPage({ params }) {
  const { id } = use(params);
  const venue = mockPlacesDetail[id];

  if (!venue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <VenueDetailsNavbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <BackNavigation />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left column: Image */}
          <div className="lg:col-span-1">
            <VenueHero image={venue.image} name={venue.name} />
          </div>

          {/* Right column: Details */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <VenueCategories categories={venue.categories} />
              <div className="mt-4">
                <VenueDescription
                  name={venue.name}
                  description={venue.description}
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <TravelTips tips={venue.travelTips} />
            </div>
          </div>
        </div>

        {/* Full width location */}
        <div className="mt-10 border-t border-slate-200 pt-10">
          <LocationSection location={venue.location} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
