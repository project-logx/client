import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, User as UserIcon, TrendingUp, ClipboardList } from "lucide-react";
import Header from "../../components/layout/Header";
import { isAuthenticated, getToken, saveToken } from "../../utils/auth";

// Import modular dashboard sub-components
import DashboardHeader from "./components/DashboardHeader";
import DashboardMetrics from "./components/DashboardMetrics";
import KiteConnectLanding from "./components/KiteConnectLanding";
import ProfileTab from "./components/ProfileTab";
import TradesTab from "./components/TradesTab";
import OrdersTab from "./components/OrdersTab";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/** Build headers with the JWT Bearer token (if available). */
const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

type DashboardTab = "profile" | "trades" | "orders";

type DashboardPageProps = {
  defaultTab?: DashboardTab;
};

const DashboardPage = ({ defaultTab = "profile" }: DashboardPageProps) => {
  const signedIn = isAuthenticated();
  
  // Connection and data states
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>(defaultTab);
  
  const [profile, setProfile] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchKiteData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    
    setErrorMsg(null);
    try {
      const headers = authHeaders();
      const statusRes = await fetch(`${API_BASE_URL}/api/v1/kite_connect/status`, { headers });
      if (!statusRes.ok) {
        throw new Error("Failed to check Kite session status");
      }
      const statusData = await statusRes.json();
      
      if (statusData.connected) {
        setIsConnected(true);
        // Fetch profile, trades, orders in parallel
        const [profileRes, tradesRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/kite_connect/profile`, { headers }),
          fetch(`${API_BASE_URL}/api/v1/kite_connect/trades`, { headers }),
          fetch(`${API_BASE_URL}/api/v1/kite_connect/orders`, { headers })
        ]);
        
        if (profileRes.ok) {
          const pData = await profileRes.json();
          setProfile(pData.data);
        }
        if (tradesRes.ok) {
          const tData = await tradesRes.json();
          setTrades(tData.data || []);
        }
        if (ordersRes.ok) {
          const oData = await ordersRes.json();
          setOrders(oData.data || []);
        }
      } else {
        setIsConnected(false);
      }
    } catch (error: any) {
      console.error("Error fetching Kite details:", error);
      setErrorMsg("Failed to communicate with the trading backend. Please make sure the backend is running.");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Check URL parameters for status messages
    const params = new URLSearchParams(window.location.search);

    // Capture JWT token from Google OAuth redirect (e.g. /dashboard?token=...)
    const tokenParam = params.get("token");
    if (tokenParam) {
      saveToken(tokenParam);
      // Clean the token from the URL so it isn't leaked in browser history / referrer
      params.delete("token");
      const cleanSearch = params.toString();
      const cleanUrl = window.location.pathname + (cleanSearch ? `?${cleanSearch}` : "");
      window.history.replaceState({}, document.title, cleanUrl);
    }

    if (params.get("kite_connected") === "true") {
      setIsConnected(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get("kite_error")) {
      setErrorMsg(decodeURIComponent(params.get("kite_error") || "Connection error"));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    fetchKiteData();
  }, []);

  const loginWithKiteConnect = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kite_connect/`, { headers: authHeaders() });
      const data = await response.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        throw new Error("No redirect URL received from server");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to generate Zerodha login session. Please check your credentials.");
    }
  };

  const disconnectKite = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kite_connect/disconnect`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (response.ok) {
        setIsConnected(false);
        setProfile(null);
        setTrades([]);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
      setErrorMsg("Failed to terminate Kite session properly.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-slate-100 relative">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_38%),radial-gradient(circle_at_80%_10%,_rgba(56,189,248,0.1),_transparent_28%),linear-gradient(180deg,_rgba(7,17,31,0.88),_rgba(7,17,31,1))]" />
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,white,transparent_70%)]" />

      <Header showAuthActions={!signedIn} />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-4 sm:px-6 md:px-8 lg:px-10">
        
        {/* Error notification banner */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              <div className="flex-1 font-light leading-relaxed">
                {errorMsg}
              </div>
              <button 
                onClick={() => setErrorMsg(null)}
                className="text-rose-400 hover:text-rose-300 transition text-xs font-semibold px-2 uppercase tracking-wider font-sans border-0 bg-transparent cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-400/20 border-t-emerald-400" />
              <div className="absolute h-8 w-8 animate-pulse rounded-full bg-emerald-400/20" />
            </div>
            <p className="mt-6 text-sm font-light text-slate-400 tracking-wider">
              Checking trading connection status...
            </p>
          </div>
        ) : isConnected ? (
          
          /* CONNECTED DASHBOARD VIEW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 animate-in"
          >
            {/* Top Info Bar */}
            <DashboardHeader
              userName={profile?.user_name}
              userId={profile?.user_id}
              email={profile?.email}
              isRefreshing={isRefreshing}
              onRefresh={() => fetchKiteData(true)}
              onDisconnect={disconnectKite}
            />

            {/* Quick Metrics */}
            <DashboardMetrics
              broker={profile?.broker}
              tradesCount={trades.length}
              ordersCount={orders.length}
            />

            {/* Tabbed view for dashboard items */}
            <div className="space-y-6">
              <div className="flex overflow-x-auto border-b border-white/10 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
                {[
                  { id: "profile", label: "Broker Profile", icon: UserIcon },
                  { id: "trades", label: `Trades (${trades.length})`, icon: TrendingUp },
                  { id: "orders", label: `Orders (${orders.length})`, icon: ClipboardList }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors border-none bg-transparent cursor-pointer whitespace-nowrap ${
                        isActive ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <ProfileTab profile={profile} />
                  )}
                  {activeTab === "trades" && (
                    <TradesTab trades={trades} />
                  )}
                  {activeTab === "orders" && (
                    <OrdersTab orders={orders} />
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        ) : (
          
          /* DISCONNECTED/UNAUTHORIZED LANDING VIEW */
          <KiteConnectLanding onConnect={loginWithKiteConnect} />
        )}

      </div>
    </main>
  );
};

export default DashboardPage;
