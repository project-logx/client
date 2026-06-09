import { ArrowRight, Sparkles } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

type HeaderProps = {
  showAuthActions?: boolean;
};

const APP_ROUTE_PREFIXES = [
  "/dashboard",
  "/pending",
  "/journal",
  "/profile",
  "/journeys",
  "/analysis",
];

const isAppRoute = (pathname: string) =>
  APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition ${isActive ? "font-medium text-white" : "text-slate-300 hover:text-white"}`;

const marketingLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/features", label: "Features", end: true },
  { to: "/workflow", label: "Workflow", end: true },
  { to: "/insights", label: "Insights", end: true },
] as const;

const appLinks = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/pending", label: "Journalling", end: true },
  { to: "/profile", label: "Profile", end: true },
  { to: "/journeys", label: "Journey", end: true },
  { to: "/analysis", label: "Analysis", end: true },
] as const;

const Header = ({ showAuthActions = true }: HeaderProps) => {
  const { pathname } = useLocation();
  const appNav = isAppRoute(pathname);
  const links = appNav ? appLinks : marketingLinks;

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <Link to={appNav ? "/dashboard" : "/"} className="flex items-center gap-3 no-underline">
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
      </Link>

      <nav className="hidden items-center gap-8 text-sm md:flex">
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
            {item.label}
          </NavLink>
        ))}
        {!appNav && showAuthActions ? (
          <Link className="text-slate-300 transition hover:text-white" to="/login">
            Sign in
          </Link>
        ) : null}
      </nav>

      {!appNav && showAuthActions ? (
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
      ) : (
        <div className="w-[88px] sm:w-[120px]" aria-hidden />
      )}
    </header>
  );
};

export default Header;
