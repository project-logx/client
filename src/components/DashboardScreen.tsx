import { useNavigate } from 'react-router-dom';
import { useTradeStore } from '../store/useTradeStore';

interface DashboardProps {
  onOpenModal: () => void;
}

const Sparkline = ({ color }: { color: string }) => (
  <svg className="sparkline-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
    <path d="M0,30 Q20,10 40,20 T70,5 T100,20 L100,30 Z" fill={color} />
    <path d="M0,30 Q20,10 40,20 T70,5 T100,20" fill="none" stroke={color} strokeWidth="2" />
  </svg>
);

export const DashboardScreen = ({ onOpenModal }: DashboardProps) => {
  const navigate = useNavigate();
  const { setToast } = useTradeStore();

  return (
    <div className="main-content">
      {/* KPI Row */}
      <div className="grid-5 anim">
        <div className="stat-card profit hover-magnetic glass-card-premium">
          <Sparkline color="rgba(0, 200, 150, 0.4)" />
          <div className="stat-label">Net P&amp;L · Today</div>
          <div className="stat-value profit">+₹4,820</div>
          <div className="stat-delta up">▲ 2.3% of capital</div>
        </div>
        <div className="stat-card info hover-magnetic glass-card-premium">
          <Sparkline color="rgba(59, 139, 250, 0.4)" />
          <div className="stat-label">Win Rate · 30d</div>
          <div className="stat-value neutral">62.4%</div>
          <div className="stat-delta up">▲ vs 58.1% prev mo.</div>
        </div>
        <div className="stat-card warn hover-magnetic glass-card-premium">
          <Sparkline color="rgba(240, 156, 56, 0.4)" />
          <div className="stat-label">Avg R:R · 30d</div>
          <div className="stat-value neutral">1.9×</div>
          <div className="stat-delta flat">Target: 2.0×</div>
        </div>
        <div className="stat-card loss hover-magnetic glass-card-premium">
          <Sparkline color="rgba(255, 68, 68, 0.4)" />
          <div className="stat-label">Max Drawdown</div>
          <div className="stat-value loss">−₹2,100</div>
          <div className="stat-delta down">▼ NIFTY short 10:42</div>
        </div>
        <div className="stat-card purple hover-magnetic glass-card-premium">
          <div className="stat-label">Pending Tags</div>
          <div className="stat-value neutral" style={{ color: 'var(--dim-patience)' }}>3</div>
          <div className="stat-delta flat">Clear before market close</div>
        </div>
      </div>

      <div className="pending-cols anim anim-d1" style={{ marginTop: '32px' }}>
        {/* Pending Queue */}
        <div>
          <div className="pending-col-header">
            <div className="pending-col-label">
              <div className="section-dot" style={{ background: 'var(--warning)' }}></div>
              Waiting for Entry Mindset
              <div className="badge badge-warning">2</div>
            </div>
          </div>
          <div className="stack-3">
            <div className="trade-card entry hover-magnetic" onClick={onOpenModal}>
              <div className="trade-card-top">
                <div>
                  <div className="trade-symbol">NIFTY50 CE 22200</div>
                  <div className="trade-meta">
                    <span className="trade-meta-item">BUY</span>
                    <span className="trade-meta-item">·</span>
                    <span className="trade-meta-item">50 lots</span>
                    <span className="trade-meta-item">·</span>
                    <span className="trade-meta-item">₹22,140</span>
                  </div>
                </div>
                <div className="status-chip status-pending-entry pulse-stress">Needs Tag</div>
              </div>
              <div className="trade-card-bottom">
                <div className="trade-waiting">
                  <div className="waiting-dot warning"></div>
                  Entered 09:32 AM · 10 min ago
                </div>
                <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); onOpenModal(); }}>Tag Now →</button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Trades Stack (Premium storytelling replacing sterile table) */}
        <div className="anim anim-d2">
          <div className="section-hd" style={{ marginBottom: '16px', position: 'relative' }}>
            <div className="section-hd-title">
              <div className="section-dot" style={{ background: 'var(--info)' }}></div>
              Active Market Positions
              <div className="badge badge-info pulse-stress" style={{ background: 'rgba(59, 139, 250, 0.1)', borderColor: 'rgba(59, 139, 250, 0.3)' }}>2 Live</div>
            </div>
          </div>

          <div className="trade-stack-container">
            <div className="stacked-card" onClick={() => navigate('/journey')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px' }}>RELIANCE</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>BUY · 200 shares · ₹2,918</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="mono profit" style={{ fontSize: '20px', fontWeight: 700, textShadow: '0 0 10px rgba(0, 200, 150, 0.3)' }}>+₹1,400</span>
                  <div style={{ fontSize: '10px', color: 'var(--profit)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Unrealised P&amp;L</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className="row-2">
                  <div className="dim-dot confidence"></div>
                  <div className="dim-dot stress"></div>
                  <div className="dim-dot focus"></div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Entry tagged • Mid capture ready</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setToast('Mid-point capture form opening…', 'inf'); }}>+ Quick Log</button>
              </div>
            </div>

            <div className="stacked-card" onClick={onOpenModal}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px' }}>TATASTEEL</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>BUY · 500 shares · ₹158.40</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="mono profit" style={{ fontSize: '20px', fontWeight: 700 }}>+₹1,200</span>
                  <div style={{ fontSize: '10px', color: 'var(--profit)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Unrealised P&amp;L</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className="row-2">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--warning)', animation: 'pulse-red 2s infinite' }}></div>
                  <div style={{ fontSize: '11px', color: 'var(--warning)' }}>Missing Mindset Tag</div>
                </div>
                <button className="btn btn-sm" style={{ background: 'var(--warning)', color: '#000', border: 'none', borderRadius: '4px' }} onClick={(e) => { e.stopPropagation(); onOpenModal(); }}>Resolve</button>
              </div>
            </div>
            
            <div className="stacked-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60px' }} onClick={() => navigate('/journal')}>
               <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>View complete ledger →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
