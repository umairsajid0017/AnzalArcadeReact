import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function Home() {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    // Track page view when component mounts
    trackPageView('landing-page');
  }, [trackPageView]);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
