import {
  ArrowRight,
  CircleUserRound,
  LockKeyhole,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";
import { setAuthenticated } from "../../utils/auth";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Set up your Logx trading profile."
      description="Create your account once, then move straight into your Zerodha Kite connection screen for trading data access."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Full name
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <CircleUserRound className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              type="text"
              required
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Email
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <Mail className="h-5 w-5 text-slate-400" />
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
            Phone
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <Phone className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+91 98765 43210"
              type="tel"
              required
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Password
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <LockKeyhole className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a secure password"
              type="password"
              required
            />
          </div>
        </label>

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
          type="submit"
        >
          Create account
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
};

export default SignupPage;
