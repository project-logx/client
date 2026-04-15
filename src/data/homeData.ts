import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BrainCircuit,
  CandlestickChart,
  ShieldCheck,
} from "lucide-react";

export type Metric = {
  label: string;
  value: string;
};

export type Highlight = string;

export type Feature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const metrics: Metric[] = [
  { label: "Strategy backtests", value: "2.4M" },
  { label: "Signals evaluated", value: "18.7B" },
  { label: "Markets tracked", value: "120+" },
];

export const highlights: Highlight[] = [
  "Live market intelligence across crypto, equities, and forex",
  "Signal scoring that turns noisy charts into decisive action",
  "Portfolio risk controls with anomaly detection and alerts",
];

export const features: Feature[] = [
  {
    icon: CandlestickChart,
    title: "Trading cockpit",
    text: "Scan momentum, candles, and order flow in one responsive view built for fast decisions.",
  },
  {
    icon: BrainCircuit,
    title: "AI analyzer",
    text: "Combine pattern recognition, sentiment, and historical context to rank opportunities instantly.",
  },
  {
    icon: BarChart3,
    title: "Performance board",
    text: "Track win rate, drawdown, volatility, and portfolio drift with clear visual summaries.",
  },
  {
    icon: ShieldCheck,
    title: "Risk controls",
    text: "Set thresholds, protect capital, and get alerted before small issues turn into large losses.",
  },
];

export const workflow = [
  "Connect your markets and watchlists",
  "Let Logx score opportunities in real time",
  "Act on insights with confidence and discipline",
];
