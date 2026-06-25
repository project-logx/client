import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Hash,
  Layers,
  Paperclip,
  RefreshCw,
  Search,
  Tag,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import AppPageShell from "../../components/layout/AppPageShell";
import { getToken } from "../../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface Attachment {
  id: number;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  url: string;
}

interface CustomTag {
  id: number;
  name: string;
  category: string;
}

interface TradeNode {
  id: number;
  trade_id: number;
  type: "entry" | "mid" | "exit";
  captured_at: string | null;
  fixed_tags: Record<string, string>;
  fixed_tags_by_type: Record<string, string>;
  custom_tags: CustomTag[];
  sliders: Record<string, number>;
  note: string;
  attachments: Attachment[];
  created_at: string;
}

interface JournalledTrade {
  id: number;
  symbol: string;
  product: string;
  direction: "BUY" | "SELL" | string;
  quantity: number;
  entry_price: number | null;
  exit_price: number | null;
  pnl: number | null;
  computed_quality_score: number;
  status: string;
  opened_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  nodes: TradeNode[];
  trade_name: string;
  tags: string[];
  node_type: string;
  node_types: string[];
}

const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const formatTimestamp = (iso: string | null): string => {
  if (!iso) return "-";

  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatMoney = (value: number | null) => {
  if (value == null) return "-";
  return `Rs. ${value.toFixed(2)}`;
};

const formatScore = (value: number | null | undefined) => {
  if (value == null || Number.isNaN(value)) return "-";
  return value.toFixed(1);
};

const nodeAccent: Record<string, string> = {
  entry: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  mid: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  exit: "border-rose-500/25 bg-rose-500/10 text-rose-300",
};

const getNodeBadgeClass = (type: string) =>
  nodeAccent[type] ?? "border-slate-500/25 bg-slate-500/10 text-slate-300";

const getNodeLabel = (node: TradeNode, index: number) => {
  if (node.type === "entry") return "Entry Node";
  if (node.type === "exit") return "Exit Node";
  return `Mid Check-in ${index + 1}`;
};

const getLatestNodeType = (trade: JournalledTrade) => {
  if (trade.node_type) return trade.node_type;
  return trade.nodes?.[trade.nodes.length - 1]?.type ?? "-";
};

const HistoryPage = () => {
  const [trades, setTrades] = useState<JournalledTrade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState<JournalledTrade | null>(null);

  const fetchJournalledTrades = async (silent = false) => {
    if (silent) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trades/journelled`, {
        headers: authHeaders(),
      });

      if (!response.ok) throw new Error("Failed to fetch journalled trades");

      const json = await response.json();
      setTrades(json.data || []);
    } catch (err) {
      console.error("Error fetching journalled trades:", err);
      setErrorMsg("Failed to load your journalled trades. Please make sure the backend is running.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchJournalledTrades();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const filteredTrades = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return trades;

    return trades.filter((trade) => {
      const searchable = [
        trade.symbol,
        trade.trade_name,
        trade.product,
        trade.status,
        trade.direction,
        ...(trade.tags || []),
        ...(trade.node_types || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [searchQuery, trades]);

  const totalNodes = trades.reduce((sum, trade) => sum + (trade.nodes?.length || 0), 0);
  const winningTrades = trades.filter((trade) => (trade.pnl ?? 0) > 0).length;
  const averageScore =
    trades.length > 0
      ? trades.reduce((sum, trade) => sum + (trade.computed_quality_score || 0), 0) / trades.length
      : null;

  return (
    <AppPageShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 text-emerald-300">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">History</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl font-[var(--font-display)]">
              Journalled Trades
            </h1>
            <p className="mt-1 max-w-2xl text-sm font-light leading-6 text-slate-400">
              Review completed trade reflections, node tags, notes, and psychology metrics.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchJournalledTrades(true)}
            disabled={isRefreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-4 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </section>

        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <div className="flex-1 font-light leading-relaxed">{errorMsg}</div>
              <button
                type="button"
                onClick={() => setErrorMsg(null)}
                className="rounded-lg px-2 text-xs font-semibold uppercase tracking-wider text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Trades", value: trades.length, tone: "text-white", icon: BookOpen },
              { label: "Nodes", value: totalNodes, tone: "text-sky-300", icon: Layers },
              { label: "Winning", value: winningTrades, tone: "text-emerald-300", icon: TrendingUp },
              { label: "Avg Score", value: formatScore(averageScore), tone: "text-amber-300", icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</span>
                    <Icon className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className={`mt-2 text-2xl font-bold ${item.tone}`}>{item.value}</div>
                </div>
              );
            })}
          </div>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="text-base font-semibold text-white">Trade Log</h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredTrades.length} of {trades.length} trades shown
              </p>
            </div>
            <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 sm:max-w-sm">
              <Search className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                type="text"
                placeholder="Search symbol, tag, status..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400" />
              <p className="mt-4 text-sm font-light tracking-wider text-slate-400">Loading journal history...</p>
            </div>
          ) : filteredTrades.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Layers className="mx-auto h-12 w-12 text-slate-600" strokeWidth={1.4} />
              <h3 className="mt-4 text-base font-semibold text-white">No journalled trades found</h3>
              <p className="mx-auto mt-2 max-w-md text-sm font-light leading-6 text-slate-500">
                {searchQuery
                  ? "No saved journal matches that search."
                  : "Trades will appear here after you complete journal nodes."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredTrades.map((trade) => {
                const isBuy = trade.direction === "BUY";
                const latestNode = getLatestNodeType(trade);
                const nodeTypes = trade.node_types?.length ? trade.node_types : trade.nodes?.map((node) => node.type) || [];

                return (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => setSelectedTrade(trade)}
                    className="group grid w-full grid-cols-1 gap-4 p-4 text-left transition hover:bg-white/5 sm:p-5 lg:grid-cols-[minmax(220px,1.1fr)_minmax(280px,1.4fr)_minmax(220px,1fr)_auto]"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-lg font-semibold tracking-wide text-white group-hover:text-emerald-300">
                          {trade.symbol}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            isBuy
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                              : "border-rose-500/20 bg-rose-500/10 text-rose-300"
                          }`}
                        >
                          {isBuy ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                          {trade.direction}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{trade.product || "Product -"}</span>
                        <span>Qty {trade.quantity}</span>
                        <span className="capitalize">{trade.status || "Status -"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {nodeTypes.length > 0 ? (
                        nodeTypes.map((type, index) => (
                          <span
                            key={`${trade.id}-${type}-${index}`}
                            className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${getNodeBadgeClass(type)}`}
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">No nodes recorded</span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm sm:max-w-md">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">PnL</div>
                        <div
                          className={`mt-1 font-semibold ${
                            trade.pnl == null ? "text-slate-400" : trade.pnl >= 0 ? "text-emerald-300" : "text-rose-300"
                          }`}
                        >
                          {formatMoney(trade.pnl)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Score</div>
                        <div className="mt-1 font-semibold text-white">{formatScore(trade.computed_quality_score)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Latest</div>
                        <div className="mt-1 font-semibold capitalize text-slate-300">{latestNode}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500 lg:justify-end">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatTimestamp(trade.closed_at || trade.opened_at || trade.created_at)}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selectedTrade && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrade(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              className="relative max-h-[92vh] w-full overflow-hidden rounded-t-2xl border border-white/10 bg-[#0b1424] shadow-2xl backdrop-blur-md sm:max-w-4xl sm:rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-xl font-semibold tracking-wide text-white">
                      {selectedTrade.symbol} Journal
                    </h2>
                    <span
                      className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        selectedTrade.direction === "BUY"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-500/20 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      {selectedTrade.direction}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Trade #{selectedTrade.id} - {formatTimestamp(selectedTrade.closed_at || selectedTrade.opened_at || selectedTrade.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTrade(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[calc(92vh-92px)] overflow-y-auto p-5 sm:p-6">
                <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Product", selectedTrade.product || "-"],
                    ["Quantity", selectedTrade.quantity],
                    ["PnL", formatMoney(selectedTrade.pnl)],
                    ["Score", formatScore(selectedTrade.computed_quality_score)],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
                      <div className="mt-1 truncate text-sm font-semibold text-white">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {(selectedTrade.nodes || []).map((node, nodeIndex) => {
                    const fixedTagEntries = Object.entries(node.fixed_tags || {});
                    const sliderEntries = Object.entries(node.sliders || {});

                    return (
                      <section key={node.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 rounded-full ${node.type === "entry" ? "bg-emerald-400" : node.type === "mid" ? "bg-sky-400" : "bg-rose-400"}`} />
                            <div>
                              <h3 className="text-sm font-semibold text-white">{getNodeLabel(node, nodeIndex)}</h3>
                              <p className="mt-0.5 text-xs text-slate-500">{formatTimestamp(node.captured_at || node.created_at)}</p>
                            </div>
                          </div>
                          <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${getNodeBadgeClass(node.type)}`}>
                            {node.type}
                          </span>
                        </div>

                        <div className="space-y-5 p-4">
                          {fixedTagEntries.length > 0 && (
                            <div>
                              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                <Layers size={12} />
                                Fixed Tags
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {fixedTagEntries.map(([key, value]) => (
                                  <span key={key} className="rounded-lg border border-white/10 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-300">
                                    <span className="text-slate-500">{key}: </span>
                                    {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {node.custom_tags?.length > 0 && (
                            <div>
                              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                <Tag size={12} />
                                Custom Tags
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {node.custom_tags.map((tag) => (
                                  <span key={tag.id} className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200">
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {sliderEntries.length > 0 && (
                            <div>
                              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                <Hash size={12} />
                                Psychology Metrics
                              </div>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {sliderEntries.map(([metricName, value]) => {
                                  const clampedValue = Math.max(0, Math.min(10, Number(value) || 0));
                                  return (
                                    <div key={metricName} className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                                      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                                        <span className="truncate text-slate-300">{metricName}</span>
                                        <span className="font-semibold text-white">{clampedValue}/10</span>
                                      </div>
                                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${clampedValue * 10}%` }} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {node.note && (
                            <div>
                              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                <FileText size={12} />
                                Notes
                              </div>
                              <p className="whitespace-pre-line rounded-xl border border-white/10 bg-slate-950/35 p-3 text-sm font-light leading-6 text-slate-300">
                                {node.note}
                              </p>
                            </div>
                          )}

                          {node.attachments?.length > 0 && (
                            <div>
                              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                <Paperclip size={12} />
                                Attachments
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {node.attachments.map((file) => (
                                  <a
                                    key={file.id}
                                    href={`${API_BASE_URL}${file.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-white/10 bg-slate-950/45 px-3 py-2 text-xs text-slate-300 no-underline transition hover:border-emerald-500/30 hover:text-white"
                                  >
                                    <Paperclip size={12} className="shrink-0" />
                                    <span className="truncate">{file.file_name}</span>
                                    <span className="shrink-0 text-slate-500">({(file.size_bytes / 1024).toFixed(0)} KB)</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppPageShell>
  );
};

export default HistoryPage;
