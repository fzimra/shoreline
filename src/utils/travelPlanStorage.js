const STORAGE_KEY = "shoreline_travel_plan";
const UPDATE_EVENT = "travel-plan-updated";

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizePlanItem(place) {
  return {
    id: String(place.id || place._id),
    name: place.name || "Unknown Place",
    description: place.description || "",
    category: place.category || "Other",
    image: place.image || place.image_url || "/mock/beach.svg",
    distanceKm: toNumber(place.distanceKm ?? place.distance_km),
    address: place.location?.address || "",
  };
}

export function readTravelPlan() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeTravelPlan(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function addToTravelPlan(place) {
  const current = readTravelPlan();
  const item = normalizePlanItem(place);

  if (current.some((entry) => entry.id === item.id)) {
    return { added: false, items: current };
  }

  const next = [...current, item];
  writeTravelPlan(next);

  return { added: true, items: next };
}

export function removeFromTravelPlan(id) {
  const next = readTravelPlan().filter((entry) => entry.id !== id);
  writeTravelPlan(next);
  return next;
}

export function reorderTravelPlan(items, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  writeTravelPlan(next);
  return next;
}

export function travelPlanUpdateEventName() {
  return UPDATE_EVENT;
}
