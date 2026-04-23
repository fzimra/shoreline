"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TableRowActions from "@/components/dashboard/TableRowActions";

function formatCategories(categories = []) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return "-";
  }

  return categories.join(", ");
}

export default function DashboardPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setFetchError("");

      try {
        const response = await fetch("/api/places", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch places.");
        }

        const mappedPlaces = Array.isArray(data)
          ? data.map((place) => ({
              id: place._id,
              name: place.name,
              category: place.category,
              distance_km: place.distance_km,
              opening_hours: place.opening_hours,
              address: place.location?.address,
            }))
          : [];

        setPlaces(mappedPlaces);
      } catch (error) {
        setFetchError(error.message || "Unable to load places.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Places
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Manage places
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Review destination data, categories, and publication status.
        </p>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Total Places
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {isLoading ? "--" : places.length}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Published
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            20
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Drafts
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            4
          </p>
        </article>
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Places Table
          </h2>
          <Link
            href="/dashboard/places/new"
            className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Add New Place
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Distance
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Opening Hours
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Address
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    Loading places...
                  </td>
                </tr>
              ) : fetchError ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-rose-600"
                  >
                    {fetchError}
                  </td>
                </tr>
              ) : places.length === 0 ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    No places found yet. Use "Add New Place" to create one.
                  </td>
                </tr>
              ) : (
                places.map((place) => (
                  <tr key={place.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {place.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatCategories(place.category)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {place.distance_km} km
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {place.opening_hours || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {place.address || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <TableRowActions
                        itemLabel="place"
                        viewHref={`/dashboard/places/${place.id}`}
                        editHref={`/dashboard/places/${place.id}/edit`}
                        deletePath={`/api/places/${place.id}`}
                        onDeleteSuccess={() => {
                          setPlaces((current) =>
                            current.filter((item) => item.id !== place.id),
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
