"use client";

import VenueDetailsNavbar from "@/components/venue/VenueDetailsNavbar";
import SiteFooter from "@/components/home/SiteFooter";
import BackNavigation from "@/components/venue/BackNavigation";
import VenueHero from "@/components/venue/VenueHero";
import VenueCategories from "@/components/venue/VenueCategories";
import VenueDescription from "@/components/venue/VenueDescription";
import TravelTips from "@/components/venue/TravelTips";
import LocationSection from "@/components/venue/LocationSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function mapApiVenue(venue) {
  return {
    id: venue._id,
    name: venue.name,
    categories: Array.isArray(venue.category) ? venue.category : [],
    image: venue.image_url || "/mock/beach.svg",
    description: venue.description,
    travelTips: Array.isArray(venue.travel_tips) ? venue.travel_tips : [],
    location: {
      lat: venue.location?.latitude,
      lng: venue.location?.longitude,
      address: venue.location?.address || "",
      mapUrl:
        venue.location?.latitude && venue.location?.longitude
          ? `https://maps.google.com/maps?q=${venue.location.latitude},${venue.location.longitude}`
          : "https://maps.google.com",
    },
  };
}

export default function VenueDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchVenue = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/places/${encodeURIComponent(id)}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load venue details.");
        }

        setVenue(mapApiVenue(data));
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load venue details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <VenueDetailsNavbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">
            Loading venue details...
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <VenueDetailsNavbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">
            {error || "Venue not found."}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
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
