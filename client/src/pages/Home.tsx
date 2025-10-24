import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { GiveawaysSection } from "@/components/GiveawaysSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { DiscordPopup } from "@/components/DiscordPopup";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GiveawaysSection />
        <FeaturesSection />
      </main>
      <Footer />
      <DiscordPopup />
    </div>
  );
}
