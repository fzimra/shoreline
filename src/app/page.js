import HeroSection from "@/components/home/HeroSection";
import PlacesShowcase from "@/components/home/PlacesShowcase";
import Navbar from "@/components/common/Navbar";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <PlacesShowcase />
      </main>
      <SiteFooter />
    </div>
  );
}
