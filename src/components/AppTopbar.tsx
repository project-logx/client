import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  journal: 'Trade Journal',
  journey: 'Journey Replay',
  insights: 'Insights',
  tagging: 'Trade Tagging',
};

export const AppTopbar = () => {
  const [clock, setClock] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const activeScreen = location.pathname.replace('/', '') || 'dashboard';

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = String(ist.getHours()).padStart(2, '0');
      const m = String(ist.getMinutes()).padStart(2, '0');
      setClock(`${h}:${m} IST`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="app-topbar">
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="page-title">{TITLES[activeScreen] || activeScreen}</span>
        
        {/* Dynamic Coach Greeting */}
        {activeScreen === 'dashboard' && (
          <div className="coach-banner hover-magnetic">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <span>"You've taken 2 stressful hits today. The market will be here tomorrow. Take a walk."</span>
          </div>
        )}
      </div>
      <div className="topbar-right">
        <div className="badge badge-live hover-magnetic" style={{ cursor: 'pointer' }}>
          <span className="badge-dot" style={{ animation: 'pulse-red 2s infinite' }}></span>
          Zerodha Live
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>{clock}</div>
        <button className="btn btn-secondary btn-sm hover-magnetic" onClick={() => navigate('/journal')}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          All Trades
        </button>
      </div>
    </header>
  );
};
