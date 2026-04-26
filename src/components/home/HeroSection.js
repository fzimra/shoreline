import Image from "next/image";

function SearchBar() {
  return (
    <form
      className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-3 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur"
      action="#"
    >
      <label htmlFor="search-places" className="sr-only">
        Search places
      </label>
      <input
        id="search-places"
        type="text"
        placeholder="Search places with 25km..."
        className="h-10 flex-1 rounded-full border border-transparent bg-transparent px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-200"
      />
      <button
        type="submit"
        className="h-10 rounded-full bg-sky-600 px-6 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        Search
      </button>
    </form>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-image.png"
          alt="Aerial coastline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-900/70 via-slate-800/35 to-transparent" />

      <div className="mx-auto flex min-h-[530px] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center sm:text-left">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Explore the East Coast of Sri Lanka
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-100 sm:text-base">
            Experience the beauty of Sri Lanka&apos;s Eastern coastline through
            curated day trips and immersive cultural explorations.
          </p>
        </div>
        {/* <SearchBar /> */}
      </div>
    </section>
  );
}
