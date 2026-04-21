import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import FeaturesSection from "../../components/sections/FeaturesSection";

const FeaturesPage = () => {
  return (
    <PageShell
      eyebrow="Features"
      title="LogX - Behavioral Edge Trading System"
      description="LogX is a premium trading journal and behavioral coaching platform designed to help traders identify their psychological edge."
    >
      <FeaturesSection />
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        {/* Additional Info Section */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-linear-to-r from-emerald-500/5 to-cyan-500/5 p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-white mb-4">
            Why Choose LogX?
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-slate-300 leading-7">
                LogX combines market data with behavioral insights to help traders master their psychology. Our platform uses advanced analytics to identify patterns and provide real-time coaching interventions.
              </p>
            </div>
            <div>
              <p className="text-slate-300 leading-7">
                Unlike traditional trading journals, LogX focuses on the intersection of performance metrics and emotional states, providing a complete picture of your trading psychology.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-medium text-emerald-300 backdrop-blur transition hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:text-emerald-200"
            to="/"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
};

export default FeaturesPage;
