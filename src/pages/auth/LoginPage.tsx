import { ArrowRight, CircleUserRound, LockKeyhole } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/kite-connect");
  };

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Welcome back to Logx."
      description="Sign in to access your trading workspace and continue to your Zerodha Kite connection screen."
      footerText="New to Logx?"
      footerLinkLabel="Create an account"
      footerLinkTo="/signup"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Email
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <CircleUserRound className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              type="email"
              required
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Password
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <LockKeyhole className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </div>
        </label>

        <div className="flex items-center justify-between text-sm font-light text-slate-400">
          <label className="flex items-center gap-2">
            <input className="accent-emerald-400" type="checkbox" />
            Remember me
          </label>
          <Link
            className="text-emerald-300 transition hover:text-emerald-200"
            to="/signup"
          >
            Forgot password?
          </Link>
        </div>

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
          type="submit"
        >
          Sign in
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
