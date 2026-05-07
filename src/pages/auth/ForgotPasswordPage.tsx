import { ArrowRight, CircleAlert, MailCheck } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 404) {
        navigate("/signup");
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to send reset email. Try again.");
      }

      setStatus("sent");
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Request failed.");
    }
  };

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Recover access to Logx."
      description="Enter your registered email and we will send you a secure link to reset your password."
      footerText="Remembered your password?"
      footerLinkLabel="Back to sign in"
      footerLinkTo="/login"
    >
      {status === "sent" ? (
        <div className="space-y-5">
          <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-light leading-6 text-emerald-100">
            {message}
          </div>
          <Link
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            to="/login"
          >
            Return to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-300 uppercase">
              Email
            </span>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3">
              <MailCheck className="h-5 w-5 text-slate-400" />
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

          {status === "error" && (
            <div className="flex items-start gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
              <CircleAlert className="mt-0.5 h-4 w-4" />
              <span>{message}</span>
            </div>
          )}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Send reset link
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </AuthShell>
  );
};

export default ForgotPasswordPage;
