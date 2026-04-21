const QuoteSection = () => {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-12 backdrop-blur sm:px-10 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-emerald-400/10 via-transparent to-cyan-400/10" />
        <p className="relative max-w-4xl text-2xl italic leading-tight text-slate-300 sm:text-5xl lg:text-3xl">
          "The market isn't your biggest variable <span className="not-italic text-white">you are.</span>{" "}
          LogX gives you the data to prove it."
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
