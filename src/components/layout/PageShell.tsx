import type { ReactNode } from "react";
import Header from "./Header";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const PageShell = ({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_92%)]" />

      <Header />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:px-10 lg:pb-14 lg:pt-12">
        <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
            {eyebrow}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-8 text-slate-300">
            {description}
          </p>
        </div>
      </section>

      <div className="relative z-10">{children}</div>
    </main>
  );
};

export default PageShell;
