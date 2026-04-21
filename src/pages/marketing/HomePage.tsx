import Header from "../../components/layout/Header";
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import WorkflowSection from "../../components/sections/WorkflowSection";
import CtaSection from "../../components/sections/CtaSection";
import QuoteSection from "../../components/sections/QuoteSection";

const HomePage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050a] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(180deg,rgba(7,17,31,10.1),rgba(7,17,31,0.1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[72px_72px] mask-[linear-gradient(180deg,white,transparent_92%)]" />

      <Header />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <CtaSection />
      <QuoteSection />
    </main>
  );
};

export default HomePage;
