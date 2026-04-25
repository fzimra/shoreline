"use client";

import { useEffect, useState } from "react";
import PlaceCard from "@/components/home/PlaceCard";
import { placeCategories } from "@/config/constants";

function getPlaceCategory(place) {
  if (Array.isArray(place.category) && place.category.length > 0) {
    return place.category[0];
  }

  return place.category || "Other";
}

function mapApiPlace(place) {
  return {
    id: place._id,
    name: place.name,
    category: getPlaceCategory(place),
    image: place.image_url || "/mock/beach.svg",
    distanceKm: place.distance_km,
    categories: Array.isArray(place.category) ? place.category : [],
    description: place.description,
    travelTips: Array.isArray(place.travel_tips) ? place.travel_tips : [],
    location: place.location,
  };
}

export default function PlacesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Places");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const filterCategories = ["All Places", ...new Set(placeCategories)];

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/places", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load places.");
        }

        setPlaces(Array.isArray(data) ? data.map(mapApiPlace) : []);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load places.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filteredPlaces =
    activeCategory === "All Places"
      ? places
      : places.filter((place) => {
          if (Array.isArray(place.categories) && place.categories.length > 0) {
            return place.categories.includes(activeCategory);
          }

          return place.category === activeCategory;
        });

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-sky-700">
          Discover Themes
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-sky-600 text-white shadow"
                  : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="mt-8 text-center text-sm text-slate-500">
            Loading places...
          </p>
        ) : error ? (
          <p className="mt-8 text-center text-sm text-rose-600">{error}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
