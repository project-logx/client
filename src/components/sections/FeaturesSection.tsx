import { features } from "../../data/homeData";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12"
    >
      <div className="mb-8 max-w-2xl">
        <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
          Built for decision makers
        </div>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Everything you need to analyze, compare, and trade faster.
        </h2>
        <p className="mt-4 font-light text-slate-300">
          Logx turns scattered market data into a focused operating system for
          trading teams and solo operators.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/8\"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-300 transition group-hover:bg-emerald-400/15\">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 font-light leading-7 text-slate-300">
                {feature.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
