import { LogOut, ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import Header from "../../components/layout/Header";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.12),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.10),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_92%)]" />

      <Header showAuthActions={false} />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-lg items-center justify-center px-5 pb-16 sm:px-8">
        <div className="w-full rounded-xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:p-10">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10">
            <ShieldAlert className="h-8 w-8 text-rose-400" />
          </div>

          {/* Heading */}
          <h1 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Sign out of Logx?
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm font-light leading-6 text-slate-400">
            You're about to end your current session. You'll need to sign in
            again to access your dashboard, journals, and trading data.
          </p>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-white/10" />


          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <button
              id="logout-confirm-btn"
              onClick={handleLogout}
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-400 hover:shadow-[0_8px_28px_rgba(244,63,94,0.3)] active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" />
              Yes, sign me out
            </button>
            <button
              id="logout-cancel-btn"
              onClick={handleCancel}
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LogoutPage;
