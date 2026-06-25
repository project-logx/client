import { useState } from "react";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
  "/history",
];

const isAppRoute = (pathname: string) =>
  APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition ${isActive ? "font-medium text-white" : "text-slate-300 hover:text-white"}`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block py-2.5 px-3 rounded-lg transition text-sm ${isActive ? "font-medium text-white bg-white/5" : "text-slate-300 hover:text-white hover:bg-white/5"}`;

const marketingLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/features", label: "Features", end: true },
  { to: "/workflow", label: "Workflow", end: true },
  { to: "/insights", label: "Insights", end: true },
] as const;

const appLinks = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/pending", label: "Journalling", end: true },
  { to: "/history", label: "History", end: true },
  { to: "/profile", label: "Profile", end: true },
  { to: "/journeys", label: "Journey", end: true },
  { to: "/analysis", label: "Analysis", end: true },
] as const;

const Header = ({ showAuthActions = true }: HeaderProps) => {
  const { pathname } = useLocation();
  const appNav = isAppRoute(pathname);
  const links = appNav ? appLinks : marketingLinks;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
        <Link to={appNav ? "/dashboard" : "/"} className="flex items-center gap-3 no-underline">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-semibold tracking-[0.28em] text-white uppercase">
              Logx
            </div>
            <div className="text-[10px] sm:text-xs font-light text-slate-400">
              Trading + Analyzer
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
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

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!appNav && showAuthActions ? (
            <>
              <Link
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
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
            </>
          ) : (
            <Link
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
              to="/logout"
            >
              Logout
            </Link>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-white/10 bg-[#07111f]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={mobileNavLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="pt-3 mt-3 border-t border-white/10 flex flex-col gap-2">
                {!appNav && showAuthActions ? (
                  <>
                    <Link
                      className="block py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-300"
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign up
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <Link
                    className="block py-2.5 px-3 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
                    to="/logout"
                    onClick={() => setMobileOpen(false)}
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
