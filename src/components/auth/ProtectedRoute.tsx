import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Where to redirect unauthenticated users. Defaults to /login */
  redirectTo?: string;
}

/**
 * Wraps a route so that only authenticated users can access it.
 *
 * Usage in App.tsx:
 *   <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
 *
 * - Checks for a valid, non-expired JWT in localStorage.
 * - If not authenticated, redirects to `redirectTo` (default: /login)
 *   and remembers the original destination via `?next=...` so the login
 *   page can redirect back after a successful login.
 */
const ProtectedRoute = ({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Preserve the attempted URL so we can redirect back after login
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${redirectTo}?next=${next}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
