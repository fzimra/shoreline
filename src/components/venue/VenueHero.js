import Image from "next/image";

export default function VenueHero({ image, name }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 shadow-md sm:aspect-[4/3]">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
