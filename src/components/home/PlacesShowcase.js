"use client";

import { useMemo, useState } from "react";
import PlaceCard from "@/components/home/PlaceCard";
import { mockPlaces, placeCategories } from "@/data/mockPlaces";

export default function PlacesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Places");

  const filteredPlaces = useMemo(() => {
    if (activeCategory === "All Places") {
      return mockPlaces;
    }

    return mockPlaces.filter((place) => place.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-sky-700">
          Discover Themes
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {placeCategories.map((category) => (
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPlaces.map((place) => (
            // <>
            //   <p>{place.name}</p>
            //   <h1>{place.category}</h1>
            // </>
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}
