import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BrainCircuit,
  CandlestickChart,
  Sparkles,
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
    title: "Contextual Logging",
    text: "Document your emotional state at entry, mid-trade, and exit.",
  },
  {
    icon: BarChart3,
    title: "Behavioral Analytics",
    text: "Correlation between P&L and emotional stability.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Coaching",
    text: "Identification of tilt patterns and automated interventions.",
  },
  {
    icon: ShieldCheck,
    title: "Narrative-Driven UI",
    text: "High-end, professional trading environment with zero distraction.",
  },
  {
    icon: Sparkles,
    title: "Interactive Tour",
    text: "Onboarding experience to get you started in seconds.",
  },
];

export const workflow = [
  "Sync trades directly from your brokerage account",
  "Behavioral Analytics",
  "Real-Time Coaching",
];
