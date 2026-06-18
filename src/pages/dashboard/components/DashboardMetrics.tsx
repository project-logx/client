import { ClipboardList, TrendingUp, Wallet } from "lucide-react";

interface DashboardMetricsProps {
  broker?: string;
  tradesCount: number;
  ordersCount: number;
}

const DashboardMetrics = ({
  broker,
  tradesCount,
  ordersCount
}: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-emerald-400/5">
          <Wallet className="h-28 w-28" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Broker</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-300">{broker || "ZERODHA"}</p>
        <p className="mt-1 text-xs font-light text-slate-500">Authorized broker connection</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-emerald-400/5">
          <TrendingUp className="h-28 w-28" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Trades Today</p>
        <p className="mt-2 text-2xl font-semibold text-white">{tradesCount}</p>
        <p className="mt-1 text-xs font-light text-slate-500">Synced executions</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-emerald-400/5">
          <ClipboardList className="h-28 w-28" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total Orders</p>
        <p className="mt-2 text-2xl font-semibold text-white">{ordersCount}</p>
        <p className="mt-1 text-xs font-light text-slate-500">Filled & pending logs</p>
      </div>
    </div>
  );
};

export default DashboardMetrics;
