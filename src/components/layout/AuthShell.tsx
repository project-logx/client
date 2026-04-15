import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
};

const AuthShell = ({
  eyebrow,
  title,
  description,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthShellProps) => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_92%)]" />

      <Header />

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:pt-12">
        <div className="flex flex-col justify-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
            {eyebrow}
          </div>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg font-light leading-8 text-slate-300">
            {description}
          </p>
          <div className="mt-8 hidden max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur lg:block">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
              Logx account flow
            </div>
            <div className="mt-3 text-lg font-medium text-white">
              Secure access for your trading workspace.
            </div>
            <p className="mt-2 text-sm font-light leading-6 text-slate-300">
              Use one account to enter Logx, then connect your Zerodha Kite
              session for portfolio data and trading actions.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-8 top-6 hidden h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl lg:block" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
            {children}
            <div className="mt-6 border-t border-white/10 pt-5 text-sm font-light text-slate-400">
              {footerText}{" "}
              <Link
                className="font-medium text-emerald-300 transition hover:text-emerald-200"
                to={footerLinkTo}
              >
                {footerLinkLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthShell;
