import { AlertTriangle, ArrowRightLeft, PencilLine } from "lucide-react";

import type { NodeType } from "../constants";

interface JournalNodeGuideProps {
  nodeType: NodeType;
}

const GUIDE_BY_NODE: Record<NodeType, {
  badge: string;
  title: string;
  description: string;
  points: string[];
  icon: typeof PencilLine;
}> = {
  entry: {
    badge: "Start here",
    title: "Entry snapshot",
    description: "Record the setup before the trade develops.",
    points: [
      "What was the reason for taking the trade?",
      "Which fixed tags describe the setup?",
      "How confident and prepared did you feel?",
    ],
    icon: PencilLine,
  },
  mid: {
    badge: "Live check-in",
    title: "Mid-trade journal",
    description: "Use this when the trade is open and you want to capture the live state.",
    points: [
      "Has the market changed since entry?",
      "Are you still following the original plan?",
      "What is your stress, focus, and patience right now?",
    ],
    icon: ArrowRightLeft,
  },
  exit: {
    badge: "Close out",
    title: "Exit review",
    description: "Capture the outcome and what you learned after the trade ends.",
    points: [
      "Did the exit follow your plan?",
      "What worked, and what should change next time?",
      "What is the final quality of the trade?",
    ],
    icon: AlertTriangle,
  },
};

const JournalNodeGuide = ({ nodeType }: JournalNodeGuideProps) => {
  const guide = GUIDE_BY_NODE[nodeType];
  const Icon = guide.icon;

  return (
    <div className="journal-card">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
          {guide.badge}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <div className="mt-0.5 rounded-2xl bg-white/10 p-2 text-cyan-300">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="journal-card-title mb-1">{guide.title}</h3>
          <p className="journal-card-hint">{guide.description}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {guide.points.map((point) => (
          <div key={point} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalNodeGuide;