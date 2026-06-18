/**
 * Journal API utilities for fetching and managing node data
 */

import type { ExistingAttachment } from "../pages/journal/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const resolveAttachmentUrl = (url: string) =>
  url.startsWith("http") ? url : `${API_BASE_URL.replace(/\/$/, "")}${url}`;

const mapApiAttachment = (raw: {
  id: number;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
}): ExistingAttachment => ({
  id: raw.id,
  file_name: raw.file_name,
  mime_type: raw.mime_type,
  size_bytes: raw.size_bytes,
  url: resolveAttachmentUrl(raw.url),
});

const getToken = (): string | null => {
  return localStorage.getItem("logx_token");
};

const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

interface ApiTrade {
  id: number;
  symbol: string;
  product?: string;
  direction: "BUY" | "SELL";
  quantity: number;
  entry_price?: number | null;
  exit_price?: number | null;
  opened_at?: string | null;
}

export interface MidNodeContext {
  trade: ApiTrade;
  fixedTags: Record<string, string>;
  sliders: Record<string, number>;
  note: string;
  existingAttachments: ExistingAttachment[];
}

const emptyMidNodeContext = (trade: ApiTrade): MidNodeContext => ({
  trade,
  fixedTags: {
    Direction: "",
    Strategy: "",
    Market: "",
  },
  sliders: {
    Confidence: 5,
    Stress: 5,
    Focus: 5,
    "Market Clarity": 5,
    Patience: 5,
  },
  note: "",
  existingAttachments: [],
});

/**
 * Fetch trade details plus the latest entry/mid node values for mid-node prefill.
 */
export async function fetchMidNodeContext(tradeId: string): Promise<MidNodeContext | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/trades/${tradeId}/mid`, {
      headers: authHeaders(),
    });

    if (!res.ok) {
      console.warn(`Failed to fetch mid node context: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const payload = data.data || data;
    const trade = payload.trade;
    const prefill = payload.prefill;

    if (!trade) return null;
    if (!prefill) return emptyMidNodeContext(trade);
    
    return {
      trade,
      fixedTags: prefill.fixed_tags || {},
      sliders: prefill.sliders || emptyMidNodeContext(trade).sliders,
      note: prefill.note || "",
      existingAttachments: (prefill.attachments || []).map(mapApiAttachment),
    };
  } catch (err) {
    console.error("Error fetching mid node context:", err);
    return null;
  }
}
