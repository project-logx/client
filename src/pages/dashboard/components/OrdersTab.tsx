import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface Order {
  order_id: string;
  order_timestamp?: string;
  tradingsymbol: string;
  transaction_type: "BUY" | "SELL";
  order_type: string;
  quantity: number;
  filled_quantity: number;
  average_price?: string | number;
  price?: string | number;
  status: string;
}

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab = ({ orders }: OrdersTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) =>
    o.tradingsymbol?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="orders-tab"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-4"
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 w-full sm:max-w-md">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search orders by symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 border-none"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Order ID</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Timestamp</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Symbol</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">Action</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Type</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Qty</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right hidden sm:table-cell">Avg. Price</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.order_id} className="hover:bg-white/5 transition">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs text-slate-400">{o.order_id}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs text-slate-300 hidden sm:table-cell">
                      {o.order_timestamp ? new Date(o.order_timestamp).toLocaleString() : "N/A"}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-xs sm:text-sm">{o.tradingsymbol}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`inline-flex rounded-lg px-2 sm:px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                        o.transaction_type === "BUY"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {o.transaction_type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-medium text-slate-400 hidden md:table-cell">{o.order_type}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-slate-200 text-xs sm:text-sm">
                      {o.filled_quantity}/{o.quantity}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-emerald-400 font-mono text-xs sm:text-sm hidden sm:table-cell">
                      ₹{parseFloat(String(o.average_price || o.price || 0)).toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      <span className={`inline-flex rounded-full px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border ${
                        o.status === "COMPLETE"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : o.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : o.status === "CANCELLED"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500 font-light">
                    {searchQuery ? "No orders match search criteria." : "No orders recorded for this session."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersTab;
