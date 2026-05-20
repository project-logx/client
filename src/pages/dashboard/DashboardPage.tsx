import { ArrowRight, LinkIcon, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import { isAuthenticated } from "../../utils/auth";
import zerodhaLogo from "../../assets/zerodha-logo.png";

const DashboardPage = () => {
  const signedIn = isAuthenticated();


  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.12),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_70%)]" />

      <Header showAuthActions={!signedIn} />

      {/* Hero */}
      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-10 pt-14 text-center sm:px-8 lg:px-10 lg:pt-20">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Step 1 of 1 — Account connected
        </div>

        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
          One last step — connect your trading account.
        </h1>

        <p className="mt-5 max-w-xl text-base font-light leading-8 text-slate-400 sm:text-lg">
          Your Logx account is ready. To start logging trades and generating insights, link your Zerodha Kite account below.
        </p>
      </section>

      {/* Main connect card */}
      <section className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-10 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10">
          {/* Glow accent */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          {/* Zerodha brand row */}
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner">
              <img alt="Zerodha Kite" className="h-8 w-auto" src={zerodhaLogo} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Zerodha Kite
              </p>
              <h2 className="mt-0.5 text-2xl font-semibold text-white">
                Connect your Kite account
              </h2>
            </div>
          </div>

          <p className="relative mt-4 text-sm font-light leading-7 text-slate-400">
            Logx will redirect you to Zerodha's secure authentication page. Once authorised, your trades and portfolio data will sync automatically.
          </p>

          {/* Feature bullets */}
          <ul className="relative mt-6 space-y-3">
            {[
              { icon: Zap, text: "Automatic trade ingestion from Kite in real time" },
              { icon: ShieldCheck, text: "Read-only access — Logx never executes orders" },
              { icon: LinkIcon, text: "Reconnect anytime from your dashboard settings" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-400">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              id="connect-zerodha-btn"
              onClick={() => window.open("https://kite.zerodha.com/", "_blank", "noopener,noreferrer")}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.3)] transition hover:bg-emerald-300 hover:shadow-[0_0_32px_rgba(52,211,153,0.45)] active:scale-[0.98]"
              type="button"
            >
              Connect to Zerodha
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* Helper note */}
      <p className="relative z-10 pb-16 text-center text-xs font-light text-slate-600">
        You can skip this step and connect later from your dashboard settings.
      </p>
    </main>
  );
};

export default DashboardPage;
