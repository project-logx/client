import {
  ArrowRight,
  CircleUserRound,
  LockKeyhole,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload ={
      first_name: firstName,
      last_name: lastName,
      email,
      phonenumber: phone,
      password
    }
    fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      if(response.ok){
        console.log("Signup successful");
        setIsSubmitted(true);
      }
    }).catch((error) => {
      console.error("Error during signup:", error);
    });

  };

  return (
    <AuthShell
      eyebrow={isSubmitted ? "Check your inbox" : "Create account"}
      title={
        isSubmitted
          ? "We sent you a verification link."
          : "Set up your Logx trading profile."
      }
      description={
        isSubmitted
          ? "Please verify your email address to activate your account. Then come back here to sign in."
          : "Create your account once, then move straight into your Zerodha Kite connection screen for trading data access."
      }
      footerText={isSubmitted ? "Ready to continue?" : "Already have an account?"}
      footerLinkLabel={isSubmitted ? "Go to sign in" : "Sign in"}
      footerLinkTo="/login"
    >
      {isSubmitted ? (
        <div className="space-y-5">
          <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-light leading-6 text-emerald-100">
            We have sent a verification link to {email || "your email"}. Please
            check your inbox and click the link to verify your account.
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-light leading-6 text-slate-300">
            Once verified, return here and sign in to access your Logx workspace.
          </div>
          <Link
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            to="/login"
          >
            Go to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            First name
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <CircleUserRound className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Your first name"
              type="text"
              required
            />
          </div>
        </label>
 <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Last name
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <CircleUserRound className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Your last name"
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
      )}
    </AuthShell>
  );
};

export default SignupPage;
