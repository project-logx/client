import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section
      id="insights"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-200">
            Ready to ship
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Build your next trading edge on top of Logx.
          </h2>
          <p className="mt-4 font-light text-slate-200/90">
            Use it as your command center for research, signal review, and
            portfolio monitoring.
          </p>
        </div>

        <div id="cta" className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300\"
            href="#\"
          >
            Request access
            <ArrowRight className="h-4 w-4\" />
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-6 py-3.5 font-medium text-white transition hover:bg-white/15\"
            href="#features"
          >
            See product highlights
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
