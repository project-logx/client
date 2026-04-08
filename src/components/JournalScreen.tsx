import { useNavigate } from 'react-router-dom';
import { useTradeStore } from '../store/useTradeStore';

const statusMap: Record<string, string> = {
  'complete': 'status-complete',
  'active': 'status-active',
  'pending-entry': 'status-pending-entry',
  'pending-exit': 'status-pending-exit',
};

const statusLabel: Record<string, string> = {
  'complete': 'Complete',
  'active': 'Active',
  'pending-entry': 'Pending Entry',
  'pending-exit': 'Pending Exit',
};

interface JournalProps {
  onOpenModal: () => void;
}

export const JournalScreen = ({ onOpenModal }: JournalProps) => {
  const navigate = useNavigate();
  const { trades } = useTradeStore();

  return (
    <div className="main-content">
      <div className="section-hd">
        <div className="section-hd-title" style={{ fontSize: '13px', color: 'var(--text-primary)', letterSpacing: 0 }}>All Trades · April 2025</div>
        <div className="row-3">
          <div className="badge badge-neutral">14 complete</div>
          <div className="badge badge-info">2 active</div>
          <div className="badge badge-warning">3 pending</div>
        </div>
      </div>
      <table className="data-table anim" style={{ background: 'var(--bg-raised)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-dim)' }}>
        <thead>
          <tr>
            <th>Symbol</th><th>Date / Time</th><th>Direction</th><th>Entry</th><th>Exit</th><th>P&amp;L</th><th>Status</th><th>Nodes</th><th></th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, i) => (
            <tr key={i} onClick={() => navigate('/journey')}>
              <td><div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '13px' }}>{t.symbol}</div></td>
              <td><span className="mono" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{t.time}</span></td>
              <td><span className={`badge ${t.dir === 'BUY' ? 'badge-profit' : 'badge-loss'}`}>{t.dir}</span></td>
              <td><span className="mono" style={{ fontSize: '12px' }}>₹{t.entry}</span></td>
              <td><span className="mono" style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{t.exit !== '—' ? '₹' + t.exit : '—'}</span></td>
              <td><span className={`mono ${t.pnlClass}`} style={{ fontSize: '13px', fontWeight: 600 }}>{t.pnl}</span></td>
              <td><div className={`status-chip ${statusMap[t.status]}`}>{statusLabel[t.status]}</div></td>
              <td><span className="mono" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{t.nodes} node{t.nodes !== 1 ? 's' : ''}</span></td>
              <td>
                {(t.status === 'pending-entry' || t.status === 'pending-exit')
                  ? <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); onOpenModal(); }}>Tag →</button>
                  : <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); navigate('/journey'); }}>View</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
