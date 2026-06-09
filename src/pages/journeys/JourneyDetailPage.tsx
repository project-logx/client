import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Route, TrendingDown, TrendingUp } from "lucide-react";

import AppPageShell from "../../components/layout/AppPageShell";
import JourneyNodePanel from "./components/JourneyNodePanel";
import { fetchJourneyDetail, type JourneyDetail } from "../../utils/journeyApi";

const getNodeByType = (journey: JourneyDetail, type: "entry" | "mid" | "exit") =>
  journey.nodes.find((node) => node.type === type);

const scoreTone = (score: number) => {
  if (score >= 8) return "journey-score--high";
  if (score >= 5) return "journey-score--mid";
  return "journey-score--low";
};

const JourneyDetailPage = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<JourneyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!journeyId) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJourneyDetail(journeyId);
        setJourney(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Could not load journey.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [journeyId]);

  return (
    <AppPageShell>
      <Link to="/journeys" className="journey-back-link">
        <ArrowLeft size={16} />
        Back to journeys
      </Link>

      {loading ? (
        <p className="text-sm text-slate-400">Loading journey...</p>
      ) : error ? (
        <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</p>
      ) : journey ? (
        <>
          <header className="journey-detail-header">
            <div className="journey-detail-header-main">
              <div className="mb-2 flex items-center gap-2 text-emerald-400">
                <Route className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Journey</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold text-white">{journey.symbol}</h1>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    journey.direction === "BUY"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-rose-500/15 text-rose-300"
                  }`}
                >
                  {journey.direction === "BUY" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {journey.direction}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Qty {journey.quantity}
                {journey.product ? ` · ${journey.product}` : ""}
                {journey.instrument_token != null ? ` · Token ${journey.instrument_token}` : ""}
                {journey.closed_at
                  ? ` · Closed ${new Date(journey.closed_at).toLocaleString()}`
                  : ""}
              </p>
              {journey.related_trade_ids?.length > 1 && (
                <p className="mt-1 text-xs text-slate-500">
                  Entry &amp; mid from BUY leg · exit from SELL leg (trades{" "}
                  {journey.related_trade_ids.join(", ")})
                </p>
              )}
            </div>

            <div className="journey-detail-metrics">
              <div className="journey-metric-card">
                <span className="journey-metric-label">P&amp;L</span>
                <span
                  className={`journey-metric-value ${
                    (journey.pnl ?? 0) >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {journey.pnl != null ? `₹${journey.pnl.toFixed(2)}` : "—"}
                </span>
              </div>
              <div className={`journey-score-card ${scoreTone(journey.computed_quality_score)}`}>
                <span className="journey-score-label">Overall Score</span>
                <span className="journey-score-value">
                  {journey.computed_quality_score.toFixed(1)}
                </span>
                <span className="journey-score-sub">Quality / 10</span>
              </div>
            </div>
          </header>

          <div className="journey-nodes-grid">
            <JourneyNodePanel nodeType="entry" node={getNodeByType(journey, "entry")} />
            <JourneyNodePanel nodeType="mid" node={getNodeByType(journey, "mid")} />
            <JourneyNodePanel nodeType="exit" node={getNodeByType(journey, "exit")} />
          </div>
        </>
      ) : null}
    </AppPageShell>
  );
};

export default JourneyDetailPage;
