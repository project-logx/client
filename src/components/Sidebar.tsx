import { useLocation, useNavigate } from 'react-router-dom';
import { useTradeStore } from '../store/useTradeStore';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToast } = useTradeStore();
  const activeScreen = location.pathname.replace('/', '') || 'dashboard';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">LX</div>

      <button className={`nav-btn ${activeScreen === 'dashboard' ? 'active' : ''}`} data-tip="Dashboard" onClick={() => navigate('/dashboard')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>
      </button>

      <button className={`nav-btn ${activeScreen === 'journal' ? 'active' : ''}`} data-tip="Trade Journal" onClick={() => navigate('/journal')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h6a2 2 0 000-4M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>

      <button className={`nav-btn ${activeScreen === 'journey' ? 'active' : ''}`} data-tip="Journey Replay" onClick={() => navigate('/journey')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>

      <button className={`nav-btn ${activeScreen === 'insights' ? 'active' : ''}`} data-tip="Insights" onClick={() => navigate('/insights')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="sidebar-divider"></div>

      <button className={`nav-btn ${activeScreen === 'tagging' ? 'active' : ''}`} data-tip="Trade Tagging" onClick={() => navigate('/tagging')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>

      <div className="sidebar-gap"></div>

      <button className="nav-btn" data-tip="Settings" onClick={() => setToast('Settings coming soon', 'inf')}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/></svg>
      </button>

      <button className="user-avatar">AR</button>

      {/* Learn LogX — Re-trigger guided tour */}
      <div style={{ marginTop: 'auto', padding: '16px' }}>
        <button 
          className="btn btn-sm hover-magnetic" 
          style={{ 
            width: '100%', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.06)', 
            color: '#a1a1aa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '8px 0',
          }}
          onClick={() => useTradeStore.getState().setTourActive(true)}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: '13px', fontWeight: 500 }}>Learn LogX</span>
        </button>
      </div>
    </aside>
  );
};
