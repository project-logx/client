import { features } from "../../data/homeData";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14"
    >
      {/* Header Section */}
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Built for Decision Makers
        </div>
        <h2 className="text-4xl font-bold text-white leading-tight">
          Everything you need to analyze, compare, and trade faster.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400">
          LogX turns scattered market data into a focused operating system for trading teams and solo operators.
        </p>
      </div>

      {/* Features Grid - 4 Columns */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.slice(0, 4).map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg text-emerald-300 bg-emerald-400/10 group-hover:bg-emerald-400/20 transition-colors">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-lg font-bold text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-lg leading-6 text-slate-400 group-hover:text-slate-300 transition">
                {feature.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
