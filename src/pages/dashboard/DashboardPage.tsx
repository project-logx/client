import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import { isAuthenticated } from "../../utils/auth";

const DashboardPage = () => {
  const signedIn = isAuthenticated();

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.14),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.12),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <Header />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-10 text-center sm:px-8 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
          Dashboard
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
          {signedIn ? "Your workspace is ready." : "Welcome to Logx."}
        </h1>

        <p className="mt-6 max-w-2xl text-base font-light leading-8 text-slate-300 sm:text-lg">
          {signedIn
            ? "You are signed in. Continue into your trading workspace or move back to the landing page."
            : "You are viewing the dashboard shell. Sign in or create an account to unlock the full flow."}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-6 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            to="/"
          >
            Back to home
          </Link>
          {!signedIn ? (
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
              to="/signup"
            >
              Sign up
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
