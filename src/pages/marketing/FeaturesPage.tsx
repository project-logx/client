import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import FeaturesSection from "../../components/sections/FeaturesSection";

const FeaturesPage = () => {
  return (
    <PageShell
      eyebrow="Features"
      title="A focused toolkit for traders and analysts."
      description="Explore the product surface area designed to make research, execution, and review feel like one connected workflow."
    >
      <FeaturesSection />
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
          to="/"
        >
          Back to home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </PageShell>
  );
};

export default FeaturesPage;
