import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { highlights, metrics } from "../../data/homeData";

const HeroSection = () => {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pb-28 lg:pt-14">
      <div className="flex flex-col justify-center">
        <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
          See the trade.
          <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
            Act on the signal.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-slate-300 sm:text-xl">
          Logx is a trading and analysis platform for founders, traders, and
          research teams who want sharper signals, cleaner dashboards, and
          faster decisions across every market they track.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            href="#cta"
          >
            Start analyzing
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3.5 font-medium text-white backdrop-blur transition hover:bg-white/10"
            href="#features"
          >
            Explore features
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur"
            >
              <div className="text-3xl font-semibold text-white">
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-light text-slate-400">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3 text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative lg:pl-6">
        <div className="absolute -left-8 top-10 hidden h-24 w-24 rounded-full bg-emerald-400/25 blur-3xl lg:block" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-sm font-light text-slate-400">
                Live market snapshot
              </div>
              <div className="text-xl font-semibold text-white">Logx Pulse</div>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              +12.4% today
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.72))] p-4">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Confidence score</span>
                <span>92/100</span>
              </div>
              <div className="mt-4 flex items-end gap-2">
                {[32, 46, 41, 58, 69, 62, 78, 84, 76, 93].map(
                  (value, index) => (
                    <div key={`${value}-${index}`} className="flex-1">
                      <div
                        className="rounded-t-2xl bg-gradient-to-t from-emerald-500 via-cyan-400 to-sky-300"
                        style={{ height: `${value * 2}px` }}
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 text-sm font-light text-slate-400">
                Signal strength rising across momentum and volume clusters.
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-light text-slate-400">
                      Analyzer mode
                    </div>
                    <div className="font-medium text-white">
                      Multi-factor scoring
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-light text-slate-400">
                      Risk guard
                    </div>
                    <div className="font-medium text-white">
                      Alert thresholds active
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-400/15 p-3 text-sky-300">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-light text-slate-400">
                      Portfolio health
                    </div>
                    <div className="font-medium text-white">
                      Low drawdown pressure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
