import { useTradeStore } from '../store/useTradeStore';

const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="slider-row hover-magnetic" style={{ gridTemplateColumns: '90px 1fr 30px' }}>
    <span className="slider-label" style={{ color, fontSize: '11px', fontWeight: 600 }}>{label}</span>
    <div className="progress-bar-wrap" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
      <div className="progress-bar-fill" style={{ width: `${value * 10}%`, background: color, boxShadow: `0 0 10px ${color}` }}></div>
    </div>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color, fontWeight: 700 }}>{value}</span>
  </div>
);

export const JourneyScreen = () => {
  const { setToast } = useTradeStore();
  
  return (
    <div className="main-content">
      {/* Trade summary */}
      <div className="card anim glass-card-premium hover-magnetic" style={{ borderBottom: 'none' }}>
        <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 800 }}>NIFTY50 CE 22200</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '6px' }}>BUY · 50 lots · 1 Apr 2025 · 09:32 AM – 14:52 PM</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Final Realised P&amp;L</div>
              <div className="mono profit" style={{ fontSize: '32px', fontWeight: 800, marginTop: '2px', textShadow: '0 0 20px rgba(0, 200, 150, 0.4)' }}>+₹7,250</div>
            </div>
            <div className="status-chip status-complete" style={{ transform: 'scale(1.1)', boxShadow: '0 0 15px rgba(0,200,150,0.2)' }}>Complete</div>
          </div>
        </div>
      </div>

      {/* Narrative Timeline */}
      <div className="card anim anim-d1 glass-card-premium" style={{ overflow: 'visible', zIndex: 5 }}>
        <div className="card-header">
          <div className="card-title">Trade Journey · Emotional Mapping</div>
          <button className="btn btn-ghost btn-sm hover-magnetic" onClick={() => setToast('Export coming soon', 'inf')}>Export Ledger</button>
        </div>
        <div className="card-body" style={{ position: 'relative' }}>
          
          {/* Organic SVG Line Connector */}
          <svg style={{ position: 'absolute', left: '26px', top: '30px', width: '20px', height: 'calc(100% - 60px)', zIndex: 0 }} fill="none" preserveAspectRatio="none">
             <path d="M 8 0 C 8 40, -4 40, -4 80 C -4 140, 8 140, 8 200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="timeline" style={{ position: 'relative', zIndex: 1, paddingLeft: '8px' }}>
            <div className="timeline-node hover-magnetic" style={{ background: 'transparent' }}>
              <div className="timeline-dot entry" style={{ boxShadow: '0 0 15px rgba(0, 200, 150, 0.4)' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l7-7 7 7M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="timeline-time">09:32 AM</div>
              <div className="timeline-label">Entry Thesis Formed</div>
              <div className="timeline-tags">
                <span className="timeline-tag" style={{ color: 'var(--profit)', borderColor: 'rgba(0,200,150,0.3)', background: 'rgba(0,200,150,0.1)' }}>Confident</span>
                <span className="timeline-tag" style={{ color: 'var(--info)', borderColor: 'rgba(59,139,250,0.3)', background: 'rgba(59,139,250,0.1)' }}>Breakout</span>
              </div>
            </div>
            
            <div style={{ flex: 1, height: '40px' }}></div>
            
            <div className="timeline-node hover-magnetic" style={{ background: 'transparent' }}>
              {/* Pulse Stress explicitly mapping high emotion */}
              <div className="timeline-dot mid pulse-stress" style={{ background: 'var(--loss)', borderColor: 'var(--loss)' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-16v6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="timeline-time" style={{ color: 'var(--loss)', fontWeight: 600 }}>11:14 AM</div>
              <div className="timeline-label" style={{ fontWeight: 600 }}>Mid-point Friction</div>
              <div className="timeline-tags">
                <span className="timeline-tag" style={{ color: '#fff', borderColor: 'rgba(255,68,68,0.5)', background: 'rgba(255,68,68,0.8)' }}>Spike in Anxiety</span>
              </div>
            </div>
            
            <div style={{ flex: 1, height: '40px' }}></div>
            
            <div className="timeline-node hover-magnetic" style={{ background: 'transparent' }}>
              <div className="timeline-dot exit" style={{ boxShadow: '0 0 15px rgba(0, 200, 150, 0.4)' }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M19 12l-7 7-7-7M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="timeline-time">14:52 PM</div>
              <div className="timeline-label">Final Exit Execution</div>
              <div className="timeline-tags">
                <span className="timeline-tag" style={{ color: 'var(--profit)', borderColor: 'rgba(0,200,150,0.3)', background: 'rgba(0,200,150,0.1)' }}>Target hit</span>
                <span className="timeline-tag" style={{ color: 'var(--profit)', borderColor: 'rgba(0,200,150,0.3)', background: 'rgba(0,200,150,0.1)' }}>Disciplined</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Node detail panels */}
      <div className="grid-3 anim anim-d2">
        {/* Entry */}
        <div className="card glass-card-premium hover-magnetic">
          <div className="card-header"><div className="card-title" style={{ color: 'var(--warning)', fontWeight: 700 }}>Node A · Entry</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>09:32 AM</div></div>
          <div className="card-body">
            <div className="stack-3">
              <ProgressBar label="Confidence" value={7} color="var(--dim-confidence)" />
              <ProgressBar label="Stress" value={3} color="var(--dim-stress)" />
              <ProgressBar label="Focus" value={8} color="var(--dim-focus)" />
              <ProgressBar label="Clarity" value={6} color="var(--dim-clarity)" />
              <ProgressBar label="Patience" value={5} color="var(--dim-patience)" />
            </div>
            <div className="divider" style={{ opacity: 0.1 }}></div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid var(--warning)' }}>"NIFTY broke 22,100 with strong volume. Expecting follow-through to 22,300."</div>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}><span className="badge badge-profit">Confident</span><span className="badge badge-info">Breakout</span></div>
          </div>
        </div>
        {/* Mid */}
        <div className="card glass-card-premium hover-magnetic" style={{ borderColor: 'rgba(255, 68, 68, 0.2)' }}>
          <div className="card-header"><div className="card-title" style={{ color: 'var(--loss)', fontWeight: 700 }}>Mid-point · M₁</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>11:14 AM</div></div>
          <div className="card-body">
            <div className="stack-3">
              <ProgressBar label="Confidence" value={4} color="var(--dim-confidence)" />
              <ProgressBar label="Stress" value={7} color="var(--loss)" />
              <ProgressBar label="Focus" value={5} color="var(--dim-focus)" />
              <ProgressBar label="Clarity" value={3} color="var(--dim-clarity)" />
              <ProgressBar label="Patience" value={4} color="var(--dim-patience)" />
            </div>
            <div className="divider" style={{ opacity: 0.1 }}></div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', background: 'rgba(255,68,68,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid var(--loss)' }}>"NIFTY pulled back 200 points suddenly. Feeling anxious. Considering exiting early."</div>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}><span className="badge" style={{ background: 'var(--loss)', color: '#fff' }}>Anxious</span></div>
          </div>
        </div>
        {/* Exit */}
        <div className="card glass-card-premium hover-magnetic">
          <div className="card-header"><div className="card-title" style={{ color: 'var(--profit)', fontWeight: 700 }}>Node B · Exit</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>14:52 PM</div></div>
          <div className="card-body">
            <div className="stack-3">
              <ProgressBar label="Confidence" value={9} color="var(--dim-confidence)" />
              <ProgressBar label="Stress" value={1} color="var(--dim-stress)" />
              <ProgressBar label="Focus" value={9} color="var(--dim-focus)" />
              <ProgressBar label="Clarity" value={8} color="var(--dim-clarity)" />
              <ProgressBar label="Patience" value={9} color="var(--dim-patience)" />
            </div>
            <div className="divider" style={{ opacity: 0.1 }}></div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', background: 'rgba(0,200,150,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid var(--profit)' }}>"Target hit cleanly. Held through the 11AM dip. Disciplined execution."</div>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}><span className="badge badge-profit">Target hit</span><span className="badge badge-profit">Disciplined</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
