"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPlaceDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPlace = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/places/${encodeURIComponent(id)}`, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch place.");
        }

        setPlace(data);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load place details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">
        Loading place details...
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error || "Place not found."}
        </p>
        <Link
          href="/dashboard/places"
          className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Places
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Place Details
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {place.name}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Full destination details from your places collection.
        </p>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Category
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {Array.isArray(place.category) && place.category.length
              ? place.category.join(", ")
              : "-"}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Distance
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {place.distance_km} km
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Opening Hours
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {place.opening_hours || "-"}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Address
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {place.location?.address || "-"}
          </p>
        </article>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Description
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {place.description}
        </p>
      </section>

      <div className="mt-6">
        <Link
          href="/dashboard/places"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Places
        </Link>
      </div>
    </div>
  );
}
