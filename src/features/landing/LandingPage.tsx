import { LandingNavbar } from "./components/LandingNavbar";
import { LandingHero } from "./components/LandingHero";
import { LandingFeatures } from "./components/LandingFeatures";
import { LandingShowcase } from "./components/LandingShowcase";
import { LandingCTA } from "./components/LandingCTA";
import { LandingFooter } from "./components/LandingFooter";
import { LandingWhy } from "./components/LandingWhy";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      <LandingNavbar />

      <main>

        <LandingHero />

        <LandingFeatures />

        <LandingWhy />

        <LandingShowcase />

        

        <LandingCTA />

      </main>

      <LandingFooter />

    </div>
  );
}