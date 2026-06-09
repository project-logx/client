import { BarChart3 } from "lucide-react";

import AppPageShell from "../../components/layout/AppPageShell";

const AnalysisPage = () => {
  return (
    <AppPageShell>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-emerald-400">
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Analysis</span>
        </div>
        <h1 className="text-3xl font-semibold text-white">Behavioral Analysis</h1>
        <p className="mt-2 max-w-2xl text-sm font-light text-slate-400">
          Retrospective reports and pattern insights will appear here as you complete more
          journaled trades.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-sm text-slate-300">Analysis dashboard coming soon.</p>
        <p className="mt-2 text-xs text-slate-500">
          Keep journaling entries and exits to unlock behavioral insights.
        </p>
      </div>
    </AppPageShell>
  );
};

export default AnalysisPage;
