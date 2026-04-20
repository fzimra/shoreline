export default function VenueCategories({ categories }) {
  const categoryColors = {
    Nature: "bg-sky-100 text-sky-700",
    Religious: "bg-purple-100 text-purple-700",
    Heritage: "bg-amber-100 text-amber-700",
    Restaurant: "bg-orange-100 text-orange-700",
    Educational: "bg-green-100 text-green-700",
    Cultural: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            categoryColors[category] || "bg-slate-100 text-slate-700"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}
