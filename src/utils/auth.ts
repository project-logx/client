// ─── Storage key ────────────────────────────────────────────────────────────
const TOKEN_KEY = "logx_token";

// ─── Token storage ──────────────────────────────────────────────────────────

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// ─── JWT decode (NO signature verification — trust the backend for that) ────
//
// A JWT is three base64url segments: header.payload.signature
// We only need the payload (index 1).

export interface JwtPayload {
  sub: string;      // user ID (string of int)
  iat: number;      // issued-at (unix seconds)
  exp: number;      // expiry   (unix seconds)
}

const base64urlDecode = (str: string): string => {
  // Pad to a multiple of 4
  const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
  // Replace URL-safe chars back to standard base64
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return atob(b64);
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const raw = base64urlDecode(parts[1]);
    return JSON.parse(raw) as JwtPayload;
  } catch {
    return null;
  }
};

// ─── Expiry check ────────────────────────────────────────────────────────────

export const isTokenExpired = (payload: JwtPayload): boolean => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  return nowSeconds >= payload.exp;
};

// ─── Primary guard ───────────────────────────────────────────────────────────

/**
 * Returns true if a valid, non-expired JWT exists in localStorage.
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  if (isTokenExpired(payload)) {
    removeToken(); // auto-clean stale token
    return false;
  }
  return true;
};

// ─── User info from token ────────────────────────────────────────────────────

export interface AuthUser {
  id: number;       // parsed from sub
  exp: number;
  iat: number;
}

/**
 * Decode and return the current user info from the stored JWT.
 * Returns null if not authenticated or token is invalid/expired.
 */
export const getCurrentUser = (): AuthUser | null => {
  const token = getToken();
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload || isTokenExpired(payload)) return null;
  return {
    id: parseInt(payload.sub, 10),
    exp: payload.exp,
    iat: payload.iat,
  };
};

// ─── Legacy helpers (kept for backward compat) ───────────────────────────────

/** @deprecated Use saveToken() instead */
export const setAuthenticated = (_value: boolean): void => {
  // no-op: authentication state is now derived purely from the JWT
};

/** @deprecated Use removeToken() instead */
export const clearAuthenticated = (): void => {
  removeToken();
};
