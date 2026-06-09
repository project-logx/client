import type { ReactNode } from "react";
import Header from "./Header";
import { isAuthenticated } from "../../utils/auth";

type AppPageShellProps = {
  children: ReactNode;
};

const AppPageShell = ({ children }: AppPageShellProps) => {
  const signedIn = isAuthenticated();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07111f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.1),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_70%)]" />

      <Header showAuthActions={!signedIn} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
};

export default AppPageShell;
