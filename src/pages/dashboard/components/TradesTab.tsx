import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Trade {
  trade_id: string;
  order_timestamp?: string;
  tradingsymbol: string;
  transaction_type: "BUY" | "SELL";
  quantity: number;
  average_price: string | number;
  product?: string;
}

interface TradesTabProps {
  trades: Trade[];
}

const TradesTab = ({ trades }: TradesTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredTrades = trades.filter((t) =>
    t.tradingsymbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="trades-tab"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-4"
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 max-w-md">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search trades by symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 border-none"
        />
      </div>

      {/* Trades Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Trade ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {filteredTrades.length > 0 ? (
                filteredTrades.map((t) => (
                  <tr key={t.trade_id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{t.trade_id}</td>
                    <td className="px-6 py-4 text-xs text-slate-300">
                      {t.order_timestamp ? new Date(t.order_timestamp).toLocaleString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{t.tradingsymbol}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-lg px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        t.transaction_type === "BUY"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {t.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-200">{t.quantity}</td>
                    <td className="px-6 py-4 text-right font-semibold text-emerald-400 font-mono">
                      ₹{parseFloat(String(t.average_price)).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>  
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-light">
                    {searchQuery ? "No trades match search criteria." : "No trades recorded for this session."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Start Journal Button - Only show when trades exist */}
      {trades.length > 0 && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/pending")}
          className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_6px_20px_rgba(16,185,129,0.18)]"
        >
          <BookOpen size={16} />
          Start Journal for Latest Trade
        </motion.button>
      )}
    </motion.div>
  );
};

export default TradesTab;
