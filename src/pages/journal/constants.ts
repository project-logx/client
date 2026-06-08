import { Target, Flame, Eye, Gauge, Clock } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Trade {
  trade_id: string;
  tradingsymbol: string;
  transaction_type: "BUY" | "SELL";
  quantity: number;
  average_price: string | number;
  order_timestamp?: string;
  product?: string;
}

export type NodeType = "entry" | "mid" | "exit";

export interface NodeFormState {
  tags: Record<string, string>;
  sliders: Record<string, number>;
  note: string;
}

// ─── Fixed tag data (mirrors backend constants.py) ──────────────────────────

export const FIXED_TAGS: Record<string, Record<string, string[]>> = {
  entry: {
    Direction: ["Long", "Short"],
    Strategy: ["Breakout", "Pullback", "Price action", "Reversal"],
    Market: ["trending day", "Range day", "High volatility", "Expiry day", "News driven"],
  },
  mid: {
    Direction: ["Long", "Short"],
    Strategy: ["Breakout", "Pullback", "Price action", "Reversal"],
    Market: ["trending day", "Range day", "High volatility", "Expiry day", "News driven"],
  },
  exit: {
    "Execution": [
            "good R:R",
            "Poor R:R",
            "Oversized",
            "Perfect entry",
            "Early entry",
            "Late entry",
            "Premature exit",
            "Perfect exit",
            "Late exit",
    ],
    "Quality": [
            "a+",
            "Rule break",
            "Slippage",
            "Followed plan",
            "No plan",
            "Overtraded",
            "Random trade",
            "Impulsive",
    ],
    "Outcome": [
            "Target hit",
            "Stop hit",
            "Partial exit",
            "Time exit",
            "Manual close",
    ],
  },
};

export const SLIDER_DIMENSIONS = [
  { key: "Confidence", icon: Target, color: "#10b981", description: "How confident were you in this setup?" },
  { key: "Stress", icon: Flame, color: "#f43f5e", description: "How stressed were you during this trade?" },
  { key: "Focus", icon: Eye, color: "#6366f1", description: "How focused were you on the market?" },
  { key: "Market Clarity", icon: Gauge, color: "#f59e0b", description: "How clear was the market structure to you?" },
  { key: "Patience", icon: Clock, color: "#0ea5e9", description: "How patient were you in waiting for the setup?" },
] as const;

export const ALL_NODE_STEPS: { type: NodeType; label: string; description: string }[] = [
  { type: "entry", label: "Entry Node", description: "Capture your mindset and reasoning at trade entry" },
  { type: "mid", label: "In-Trade Check-in", description: "Capture your live read while the trade is open" },
  { type: "exit", label: "Exit Node", description: "Reflect on execution quality and outcome" },
];

/** The journal flow now exposes entry, mid, and exit as user-facing steps. */
export const getStepsForTrade = (_txType: "BUY" | "SELL" | undefined) => ALL_NODE_STEPS;

/** Default slider values (all 5). */
export const defaultSliders = () =>
  Object.fromEntries(SLIDER_DIMENSIONS.map((d) => [d.key, 5]));

/** Default tags for a given node type (all empty). */
export const defaultTags = (nodeType: NodeType) =>
  Object.fromEntries(Object.keys(FIXED_TAGS[nodeType]).map((cat) => [cat, ""]));
