import { motion } from "framer-motion";

interface ProfileTabProps {
  profile: {
    user_name?: string;
    user_id?: string;
    email?: string;
    broker?: string;
    user_type?: string;
    exchanges?: string[];
    products?: string[];
  } | null;
}

const ProfileTab = ({ profile }: ProfileTabProps) => {
  return (
    <motion.div
      key="profile-tab"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Personal Info */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="text-md font-semibold text-white border-b border-white/10 pb-3">
          Account Information
        </h3>
        <dl className="mt-4 space-y-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-400 font-light">Client Name</dt>
            <dd className="text-slate-200 font-medium">{profile?.user_name || "N/A"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400 font-light">Client ID</dt>
            <dd className="text-slate-200 font-semibold uppercase">{profile?.user_id || "N/A"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400 font-light">Email Address</dt>
            <dd className="text-slate-200 font-medium">{profile?.email || "N/A"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400 font-light">Broker</dt>
            <dd className="text-slate-200 font-medium">{profile?.broker || "N/A"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-400 font-light">User Type</dt>
            <dd className="text-slate-200 font-medium uppercase text-xs">{profile?.user_type || "N/A"}</dd>
          </div>
        </dl>
      </div>

      {/* Authorizations & Segments */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="text-md font-semibold text-white border-b border-white/10 pb-3">
          Authorized Segments & Products
        </h3>
        <div className="mt-4 space-y-5">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Exchanges</h4>
            <div className="flex flex-wrap gap-2">
              {profile?.exchanges?.map((exch: string) => (
                <span key={exch} className="rounded-lg bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {exch}
                </span>
              )) || <span className="text-slate-500 text-xs">No active exchanges details available</span>}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Allowed Products</h4>
            <div className="flex flex-wrap gap-2">
              {profile?.products?.map((prod: string) => (
                <span key={prod} className="rounded-lg bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {prod}
                </span>
              )) || <span className="text-slate-500 text-xs">No product detail available</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileTab;
