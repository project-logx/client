import { ArrowRight, CheckCircle2, CircleAlert, LockKeyhole } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Missing reset token. Please use the email link.");
      return;
    }

    if (!password || password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/reset-password?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_password: password }),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to reset password. Please try again.");
      }

      setStatus("success");
      setMessage("Password updated successfully. Redirecting to sign in...");
      window.setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Request failed.");
    }
  };

  return (
    <AuthShell
      eyebrow="Set new password"
      title="Create a fresh password."
      description="Use a strong password to secure your Logx account."
      footerText="Need a new reset link?"
      footerLinkLabel="Send reset email"
      footerLinkTo="/forgot-password"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            New password
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

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300 uppercase">
            Confirm password
          </span>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
            <LockKeyhole className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your password"
              type="password"
              required
            />
          </div>
        </label>

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
            <CircleAlert className="mt-0.5 h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-start gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-100">
            <CheckCircle2 className="mt-0.5 h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Update password
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3.5 font-medium text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            to="/login"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};

export default ResetPasswordPage;
