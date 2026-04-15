import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-semibold tracking-[0.28em] text-white uppercase">
            Logx
          </div>
          <div className="text-xs font-light text-slate-400">
            Trading + Analyzer
          </div>
        </div>
      </div>

      <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
        <Link className="transition hover:text-white" to="/">
          Home
        </Link>
        <Link className="transition hover:text-white" to="/features">
          Features
        </Link>
        <Link className="transition hover:text-white" to="/workflow">
          Workflow
        </Link>
        <Link className="transition hover:text-white" to="/insights">
          Insights
        </Link>
        <Link className="transition hover:text-white" to="/login">
          Sign in
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          className="hidden rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10 sm:inline-flex"
          to="/login"
        >
          Sign in
        </Link>
        <Link
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
          to="/signup"
        >
          Sign up
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
