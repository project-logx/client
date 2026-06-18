import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  AlertCircle,
  ArrowLeft,
  Inbox,
  Search,
  CheckCircle2,
} from "lucide-react";
import Header from "../../components/layout/Header";
import { isAuthenticated, getToken } from "../../utils/auth";
import { fetchMidNodeContext } from "../../utils/journalApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PendingTrade {
  id: number;
  trade_id: string;
  symbol: string;
  product: string;
  direction: string;
  quantity: number;
  entry_price: number | null;
  exit_price: number | null;
  pnl: number | null;
  status: string;
  opened_at: string | null;
  closed_at: string | null;
  waiting_seconds: number | null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const formatWaiting = (seconds: number | null): string => {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
};

const formatTimestamp = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── Trade Card Component ───────────────────────────────────────────────────

const TradeCard = ({
  trade,
  onJournal,
  entryCompleted,
  onMidNodeCheck,
  isMidLoading,
}: {
  trade: PendingTrade;
  onJournal: (trade: PendingTrade) => void;
  entryCompleted: boolean;
  onMidNodeCheck: (trade: PendingTrade) => void;
  isMidLoading: boolean;
}) => {
  const isBuy = trade.direction === "BUY";
  const price = isBuy ? trade.entry_price : trade.exit_price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="jq-trade-card"
    >
      <div className="jq-trade-card-top">
        <div className="jq-trade-symbol">{trade.symbol}</div>
        <span className={`jq-trade-badge ${isBuy ? "jq-badge-buy" : "jq-badge-sell"}`}>
          {isBuy ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {trade.direction}
        </span>
      </div>

      <div className="jq-trade-details">
        <div className="jq-detail-item">
          <span className="jq-detail-label">Qty</span>
          <span className="jq-detail-value">{trade.quantity}</span>
        </div>
        <div className="jq-detail-item">
          <span className="jq-detail-label">Price</span>
          <span className="jq-detail-value jq-detail-price">
            {price != null ? `₹${price.toFixed(2)}` : "—"}
          </span>
        </div>
        <div className="jq-detail-item">
          <span className="jq-detail-label">Product</span>
          <span className="jq-detail-value jq-detail-product">{trade.product}</span>
        </div>
        <div className="jq-detail-item">
          <span className="jq-detail-label">Time</span>
          <span className="jq-detail-value">{formatTimestamp(trade.opened_at)}</span>
        </div>
      </div>

      <div className="jq-trade-card-bottom">
        <div className="jq-waiting">
          <Clock size={12} />
          <span>Waiting {formatWaiting(trade.waiting_seconds)}</span>
        </div>
        {entryCompleted && isBuy ? (
          <button
            className="jq-journal-btn jq-journal-btn-secondary"
            onClick={() => onMidNodeCheck(trade)}
            disabled={isMidLoading}
          >
            <CheckCircle2 size={13} />
            {isMidLoading ? "Loading..." : "In-Trade Check-in"}
          </button>
        ) : (
          <button className="jq-journal-btn" onClick={() => onJournal(trade)}>
            <BookOpen size={13} />
            Start Journal
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ─── Empty State Component ──────────────────────────────────────────────────

const EmptyState = ({ label }: { label: string }) => (
  <div className="jq-empty-state">
    <Inbox size={40} strokeWidth={1} />
    <p>No {label} trades</p>
    <span>All caught up! New trades will appear here after syncing.</span>
  </div>
);

// ─── Main Page ──────────────────────────────────────────────────────────────

const JournalQueuePage = () => {
  const navigate = useNavigate();
  const signedIn = isAuthenticated();

  const [pendingEntry, setPendingEntry] = useState<PendingTrade[]>([]);
  const [pendingExit, setPendingExit] = useState<PendingTrade[]>([]);
  const [activeTrades, setActiveTrades] = useState<PendingTrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"entry" | "exit" | "active">("entry");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedEntries, setCompletedEntries] = useState<Set<number>>(new Set());
  const [midLoadingTradeId, setMidLoadingTradeId] = useState<number | null>(null);

  const fetchPendingTrades = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/queue/pending`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch pending trades");
      const json = await res.json();
      setPendingEntry(json.data?.pending_entry || []);
      setPendingExit(json.data?.pending_exit || []);
    } catch (err: any) {
      console.error("Error fetching pending trades:", err);
      setErrorMsg("Failed to load pending trades. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchActiveTrades = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/trades/active`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch active trades");
      const json = await res.json();
      console.log("Fetched active trades - Full response:", json);
      
      // Handle different possible response structures
      let tradesData = [];
      if (json.data?.active_trades) {
        tradesData = json.data.active_trades;
      } else if (json.data && Array.isArray(json.data)) {
        tradesData = json.data;
      } else if (Array.isArray(json)) {
        tradesData = json;
      } else if (json.active_trades) {
        tradesData = json.active_trades;
      }
      
      console.log("Parsed active trades:", tradesData);
      setActiveTrades(tradesData);
    } catch (err: any) {
      console.error("Error fetching active trades:", err);
      setErrorMsg("Failed to load active trades. Make sure the backend is running.");
    } finally {
      if (!silent) setIsLoading(false);
      else setIsRefreshing(false);
    }
  };

  const fetchAllTrades = async (silent = false) => {
    await Promise.all([
      fetchPendingTrades(silent),
      fetchActiveTrades(silent),
    ]);
  };

  useEffect(() => {
    fetchAllTrades();
    
    // Load completed entry trades from localStorage
    // const completed = JSON.parse(localStorage.getItem("completedEntryTrades") || "[]");
    if(activeTrades){
      setCompletedEntries(new Set(activeTrades.map(t=>t.id)))
    }

  }, []);

  const handleStartJournal = (trade: PendingTrade) => {
    // Map the DB trade shape to the shape expected by JournalPage
    const journalTrade = {
      trade_id: String(trade.id),
      tradingsymbol: trade.symbol,
      transaction_type: trade.direction as "BUY" | "SELL",
      quantity: trade.quantity,
      average_price: trade.entry_price ?? trade.exit_price ?? 0,
      order_timestamp: trade.opened_at ?? undefined,
      product: trade.product,
    };
    navigate("/journal", { 
      state: { 
        trade: journalTrade, 
        dbTradeId: trade.id,
        journalMode: trade.direction === "BUY" ? "entry-only" : "exit-only"
      } 
    });
  };

  const handleMidNodeCheck = async (trade: PendingTrade) => {
    setMidLoadingTradeId(trade.id);
    try {
      // Fetch trade details plus the latest entry/mid node data for prefill.
      const midContext = await fetchMidNodeContext(String(trade.id));
      
      if (!midContext) {
        setErrorMsg("Failed to load trade check-in data. Please try again.");
        setMidLoadingTradeId(null);
        return;
      }

      // Map the DB trade shape to the shape expected by JournalPage
      const contextTrade = midContext.trade;
      const journalTrade = {
        trade_id: String(contextTrade.id),
        tradingsymbol: contextTrade.symbol,
        transaction_type: contextTrade.direction as "BUY" | "SELL",
        quantity: contextTrade.quantity,
        average_price: contextTrade.entry_price ?? contextTrade.exit_price ?? 0,
        order_timestamp: contextTrade.opened_at ?? undefined,
        product: contextTrade.product,
      };

      // Navigate to journal with mid mode and prefilled node data.
      navigate("/journal", { 
        state: { 
          trade: journalTrade, 
          dbTradeId: contextTrade.id,
          journalMode: "mid",
          prefillData: {
            fixedTags: midContext.fixedTags,
            sliders: midContext.sliders,
            note: midContext.note,
            existingAttachments: midContext.existingAttachments,
          }
        } 
      });
    } catch (err) {
      console.error("Error loading trade check-in data:", err);
      setErrorMsg("Failed to load trade check-in data. Please try again.");
    } finally {
      setMidLoadingTradeId(null);
    }
  };

  const currentList = 
    activeTab === "entry" ? pendingEntry.filter((t) => !completedEntries.has(t.id)) :
    activeTab === "exit" ? pendingExit :
    activeTrades;

  const filtered = currentList.filter((t) =>
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="jq-page">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.1),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_70%)]" />

      <Header showAuthActions={!signedIn} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">

        {/* Error banner */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <div className="flex-1 font-light leading-relaxed">{errorMsg}</div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-rose-400 hover:text-rose-300 transition text-xs font-semibold px-2 uppercase tracking-wider font-sans border-0 bg-transparent cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400" />
              <div className="absolute h-8 w-8 animate-pulse rounded-full bg-emerald-400/20" />
            </div>
            <p className="mt-6 text-sm font-light text-slate-400 tracking-wider">
              Loading journal queue...
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Page Header */}
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-semibold text-white font-[var(--font-display)]">
                      Journal Queue
                    </h1>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/20">
                      {pendingEntry.length + pendingExit.length} pending
                    </span>
                  </div>
                  <p className="text-xs font-light text-slate-400 mt-0.5">
                    Trades awaiting your journal entry or exit reflection
                  </p>
                </div>
              </div>
              <button
                onClick={() => fetchAllTrades(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Metrics summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Pending Entry</div>
                <div className="text-3xl font-bold text-emerald-400">{pendingEntry.filter((t) => !completedEntries.has(t.id)).length}</div>
                <div className="text-xs text-slate-500 mt-1 font-light">BUY trades needing entry journal</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Active (Mid Node)</div>
                <div className="text-3xl font-bold text-sky-400">{activeTrades.length}</div>
                <div className="text-xs text-slate-500 mt-1 font-light">Trades in active mid-node tagging</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Pending Exit</div>
                <div className="text-3xl font-bold text-rose-400">{pendingExit.length}</div>
                <div className="text-xs text-slate-500 mt-1 font-light">SELL trades needing exit journal</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Total Queue</div>
                <div className="text-3xl font-bold text-sky-400">{pendingEntry.length + pendingExit.length}</div>
                <div className="text-xs text-slate-500 mt-1 font-light">Trades waiting for journaling</div>
              </div>
            </div>

            {/* Tabs + Search */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex border-b border-white/10">
                  {[
                    { id: "entry" as const, label: `Pending Entry (${pendingEntry.filter((t) => !completedEntries.has(t.id)).length})`, icon: TrendingUp },
                    { id: "active" as const, label: `Active - Mid Node (${activeTrades.length})`, icon: CheckCircle2 },
                    { id: "exit" as const, label: `Pending Exit (${pendingExit.length})`, icon: TrendingDown },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-none bg-transparent cursor-pointer ${
                          isActive ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                        {isActive && (
                          <motion.div
                            layoutId="queueTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Search */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-2.5 max-w-xs w-full">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 border-none"
                  />
                </div>
              </div>

              {/* Trade Cards Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  {filtered.length > 0 ? (
                    <div className="jq-cards-grid">
                      {filtered.map((trade) => (
                        <TradeCard 
                          key={trade.id} 
                          trade={trade} 
                          onJournal={handleStartJournal}
                          entryCompleted={completedEntries.has(trade.id)}
                          onMidNodeCheck={handleMidNodeCheck}
                          isMidLoading={midLoadingTradeId === trade.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState label={activeTab === "entry" ? "pending entry" : activeTab === "exit" ? "pending exit" : "active"} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default JournalQueuePage;
