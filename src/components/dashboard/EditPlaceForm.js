"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categoryOptions = [
  "Religious",
  "Nature",
  "Heritage",
  "Cultural",
  "Historical",
  "Other",
];

const initialForm = {
  name: "",
  description: "",
  opening_hours: "",
  distance_km: "",
  address: "",
  latitude: "",
  longitude: "",
  image_url: "",
  travel_tips: "",
};

function toOptionalNumber(value) {
  if (value === "") {
    return undefined;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

export default function EditPlaceForm({ placeId }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/places/${encodeURIComponent(placeId)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load place details.");
        }

        setForm({
          name: data.name || "",
          description: data.description || "",
          opening_hours: data.opening_hours || "",
          distance_km:
            data.distance_km === undefined || data.distance_km === null
              ? ""
              : String(data.distance_km),
          address: data.location?.address || "",
          latitude:
            data.location?.latitude === undefined ||
            data.location?.latitude === null
              ? ""
              : String(data.location.latitude),
          longitude:
            data.location?.longitude === undefined ||
            data.location?.longitude === null
              ? ""
              : String(data.location.longitude),
          image_url: data.image_url || "",
          travel_tips: Array.isArray(data.travel_tips)
            ? data.travel_tips.join("\n")
            : "",
        });

        setSelectedCategories(
          Array.isArray(data.category) ? data.category : [],
        );
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load place details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlace();
  }, [placeId]);

  const updateField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }
      return [...current, category];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const requiredFieldsMissing =
      !form.name.trim() ||
      !form.description.trim() ||
      !form.opening_hours.trim() ||
      !form.distance_km;

    if (requiredFieldsMissing) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: selectedCategories,
        opening_hours: form.opening_hours.trim(),
        distance_km: Number(form.distance_km),
        image_url: form.image_url.trim() || undefined,
        travel_tips: form.travel_tips
          .split("\n")
          .map((tip) => tip.trim())
          .filter(Boolean),
        location: {
          address: form.address.trim() || undefined,
          latitude: toOptionalNumber(form.latitude),
          longitude: toOptionalNumber(form.longitude),
        },
      };

      const response = await fetch(
        `/api/places/${encodeURIComponent(placeId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody?.error || "Failed to update place.");
      }

      router.replace("/dashboard/places");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message || "Unable to update place.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-7 rounded-2xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">
        Loading place details...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Basic Info</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Place name *
            </span>
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              required
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Description *
            </span>
            <textarea
              value={form.description}
              onChange={updateField("description")}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Opening hours *
            </span>
            <input
              type="text"
              value={form.opening_hours}
              onChange={updateField("opening_hours")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              required
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Distance (km) *
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.distance_km}
              onChange={updateField("distance_km")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              required
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categoryOptions.map((category) => {
            const checked = selectedCategories.includes(category);

            return (
              <label
                key={category}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  checked
                    ? "border-sky-300 bg-sky-50 text-sky-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category)}
                  className="sr-only"
                />
                {category}
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Location</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Address
            </span>
            <input
              type="text"
              value={form.address}
              onChange={updateField("address")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Latitude
            </span>
            <input
              type="number"
              step="any"
              value={form.latitude}
              onChange={updateField("latitude")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Longitude
            </span>
            <input
              type="number"
              step="any"
              value={form.longitude}
              onChange={updateField("longitude")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900">Extras</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Image URL
            </span>
            <input
              type="url"
              value={form.image_url}
              onChange={updateField("image_url")}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Travel tips (one per line)
            </span>
            <textarea
              value={form.travel_tips}
              onChange={updateField("travel_tips")}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </label>
        </div>
      </section>

      {error ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/places")}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
