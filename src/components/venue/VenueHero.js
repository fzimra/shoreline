import Image from "next/image";

export default function VenueHero({ image, name }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 shadow-md sm:aspect-[4/3]">
      <Image
        src={image}
        alt={name}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
        className="object-cover"
      />
    </div>
  );
}
