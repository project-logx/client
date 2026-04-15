import { ArrowRight, ShieldCheck, UserCheck2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";

const KiteConnectPage = () => {
  const [kiteId, setKiteId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = "https://kite.zerodha.com/";
  };

  return (
    <AuthShell
      eyebrow="Zerodha Kite"
      title="Connect your trading account."
      description="Logx will send you to the Kite connection step so you can access trading details and market context through Zerodha's workflow."
      footerText="Need to change account?"
      footerLinkLabel="Back to sign in"
      footerLinkTo="/login"
    >
      <div className="mb-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
        Zerodha Kite authentication is usually handled through a redirect-based
        flow. This screen prepares the handoff, but the secure token exchange
        should happen on a backend.
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">
            Kite user ID
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <UserCheck2 className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={kiteId}
              onChange={(event) => setKiteId(event.target.value)}
              placeholder="Enter your Kite ID"
              type="text"
              required
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">API key</span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="Enter your Kite API key"
              type="text"
              required
            />
          </div>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Continue to Kite
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3.5 font-medium text-white backdrop-blur transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            to="/features"
          >
            Review product
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};

export default KiteConnectPage;
