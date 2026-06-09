import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Route } from "lucide-react";

import AppPageShell from "../../components/layout/AppPageShell";
import { fetchJourneys, type JourneySummary } from "../../utils/journeyApi";

const JourneysPage = () => {
  const [journeys, setJourneys] = useState<JourneySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJourneys();
        setJourneys(data);
      } catch (err) {
        console.error(err);
        setError("Could not load completed trade journeys.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppPageShell>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-emerald-400">
          <Route className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Journey</span>
        </div>
        <h1 className="text-3xl font-semibold text-white">Completed Journeys</h1>
        <p className="mt-2 max-w-2xl text-sm font-light text-slate-400">
          Review finished trades with entry, mid, and exit tags plus overall quality score.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading journeys...</p>
      ) : error ? (
        <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</p>
      ) : journeys.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-400">
          No completed journeys yet. Finish a trade journal to see it here.
        </p>
      ) : (
        <div className="space-y-3">
          {journeys.map((journey) => (
            <Link key={journey.id} to={`/journeys/${journey.id}`} className="journey-list-card">
              <div>
                <div className="text-lg font-semibold text-white">{journey.symbol}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {journey.direction} · Qty {journey.quantity}
                  {journey.closed_at
                    ? ` · Closed ${new Date(journey.closed_at).toLocaleString()}`
                    : ""}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`text-sm font-semibold ${
                      (journey.pnl ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {journey.pnl != null ? `₹${journey.pnl.toFixed(2)}` : "—"}
                  </div>
                  <div className="text-xs text-slate-500">
                    Score {journey.computed_quality_score.toFixed(1)}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppPageShell>
  );
};

export default JourneysPage;
