import { LogOut, RefreshCw, User as UserIcon } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userId?: string;
  email?: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  onDisconnect: () => void;
}

const DashboardHeader = ({
  userName,
  userId,
  email,
  isRefreshing,
  onRefresh,
  onDisconnect
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 shadow-inner text-emerald-300">
          <UserIcon className="h-5 w-5 sm:h-7 sm:w-7" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-xl font-semibold text-white">
              {userName || "Connected Trader"}
            </h2>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          </div>
          <p className="text-[10px] sm:text-xs font-light text-slate-400 mt-0.5 truncate max-w-[200px] sm:max-w-none">
            Client ID: <span className="font-semibold text-slate-300">{userId || "N/A"}</span> • {email || "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
        <button
          onClick={onDisconnect}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Disconnect Kite
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
