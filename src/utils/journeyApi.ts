import { getToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export interface JourneySummary {
  id: number;
  symbol: string;
  direction: string;
  quantity: number;
  pnl: number | null;
  computed_quality_score: number;
  opened_at: string | null;
  closed_at: string | null;
}

export interface JourneyNode {
  id: number;
  trade_id: number;
  type: "entry" | "mid" | "exit";
  fixed_tags: Record<string, string>;
  sliders: Record<string, number>;
  note: string;
  captured_at: string | null;
}

export interface JourneyDetail extends JourneySummary {
  entry_price: number | null;
  exit_price: number | null;
  product: string | null;
  instrument_token: number;
  related_trade_ids: number[];
  nodes: JourneyNode[];
}

export async function fetchJourneys(): Promise<JourneySummary[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/journeys`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to load journeys");
  const json = await res.json();
  return json.data || [];
}

export async function fetchJourneyDetail(journeyId: string | number): Promise<JourneyDetail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/journeys/${journeyId}`, { headers: authHeaders() });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail || "Failed to load journey");
  }
  const json = await res.json();
  return json.data;
}
