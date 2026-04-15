import Header from "../../components/layout/Header";
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import WorkflowSection from "../../components/sections/WorkflowSection";
import CtaSection from "../../components/sections/CtaSection";

const HomePage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_92%)]" />

      <Header />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <CtaSection />
    </main>
  );
};

export default HomePage;
