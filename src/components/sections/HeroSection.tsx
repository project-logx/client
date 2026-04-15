import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
// import { metrics } from "../../data/homeData";
import { isAuthenticated } from "../../utils/auth";

const HeroSection = () => {
  const signedIn = isAuthenticated();

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-10 text-center sm:px-8 lg:px-10 lg:pb-28 lg:pt-16">
      <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.05em] mt-10 text-white sm:text-6xl lg:text-7xl">
        See the market.
        <span className="block text-slate-300">Stay focused.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base font-light leading-8 text-slate-300 sm:text-lg">
        Logx gives traders a calm view of signals, risk, and market context so
        decisions stay quick and clear.
      </p>

      <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          className="metallic-cta inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-medium text-white"
          to={signedIn ? "/dashboard" : "/signup"}
        >
          {signedIn ? "Go to dashboard" : "Sign up"}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
          to={signedIn ? "/dashboard" : "/login"}
        >
          {signedIn ? "Open workspace" : "Sign in"}
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-light text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          Live market context
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          Clear risk signals
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          Simple dashboard flow
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
