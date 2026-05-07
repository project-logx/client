import { CheckCircle2, CircleAlert, Loader2, MailCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../../components/layout/AuthShell";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token. Please use the email link.");
      return;
    }

    let isMounted = true;
    setStatus("verifying");

    fetch(`${API_BASE_URL}/api/v1/auth/verify?token=${encodeURIComponent(token)}`, {
      method: "POST",
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          const detail =
            errorPayload && typeof errorPayload.detail === "string"
              ? errorPayload.detail
              : "Verification failed. Please try again.";
          throw new Error(detail);
        }
        return response.json().catch(() => null);
      })
      .then(() => {
        if (!isMounted) return;
        setStatus("success");
        setMessage("Verification successful. Redirecting to sign in...");
        window.setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error: Error) => {
        if (!isMounted) return;
        setStatus("error");
        setMessage(error.message);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, token]);

  const statusBadge = (() => {
    if (status === "success") {
      return {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-200" />,
        text: "Email verified",
        className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
      };
    }

    if (status === "error") {
      return {
        icon: <CircleAlert className="h-5 w-5 text-rose-200" />,
        text: "Verification issue",
        className: "border-rose-400/30 bg-rose-400/10 text-rose-100",
      };
    }

    return {
      icon: <Loader2 className="h-5 w-5 animate-spin text-cyan-200" />,
      text: "Verifying",
      className: "border-cyan-400/30 bg-cyan-400/10 text-cyan-100",
    };
  })();

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Confirming your account."
      description="We are verifying your email address so you can sign in and continue to Logx."
      footerText="Need a new link?"
      footerLinkLabel="Back to sign up"
      footerLinkTo="/signup"
    >
      <div className={`rounded-lg border p-4 text-sm font-light ${statusBadge.className}`}>
        <div className="flex items-center gap-2 text-sm font-medium">
          {statusBadge.icon}
          <span>{statusBadge.text}</span>
        </div>
        <p className="mt-2 leading-6">{message}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-light leading-6 text-slate-300">
          You can close this tab after verification. We will redirect you to sign
          in automatically.
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3.5 font-medium text-slate-950 transition hover:bg-emerald-300"
            to="/login"
          >
            Continue to sign in
            <MailCheck className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3.5 font-medium text-white transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            to="/signup"
          >
            Request new link
          </Link>
        </div>
      </div>
    </AuthShell>
  );
};

export default VerifyEmailPage;
