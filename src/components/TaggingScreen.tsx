import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from './CategoryCard';
import type { StateTags } from '../data';

const MAX_TAGS = 5;

export function TaggingScreen() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<StateTags>({});
  const [tradeClosed, setTradeClosed] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ msg: string; type: 'ok' | 'err' | 'inf' } | null>(null);
  const [showSaveOverlay, setShowSaveOverlay] = useState(false);

  const count = Object.keys(tags).length;

  // Cleanup timeout for toast
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg(null);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const showToast = (msg: string, type: 'ok' | 'err' | 'inf' = 'ok') => {
    setToastMsg({ msg, type });
  };

  const handleSelectTag = (cat: string) => (val: string, colorClass: string) => {
    setTags((prev) => {
      // If already selected, deselect
      if (prev[cat]?.val === val) {
        const next = { ...prev };
        delete next[cat];
        return next;
      }

      // Count current tags (excluding this cat if already set)
      const currentCount = Object.keys(prev).filter((k) => k !== cat).length;
      if (currentCount >= MAX_TAGS) {
        showToast('Max 5 tags reached — deselect one first', 'err');
        return prev;
      }

      return { ...prev, [cat]: { val, colorClass } };
    });
  };

  const handleClearAll = () => {
    setTags({});
  };

  const handleToggleClose = () => {
    setTradeClosed((prev) => {
      const next = !prev;
      if (next) {
        showToast('After-close categories unlocked', 'ok');
      } else {
        // Lock after-close cards and clear their tags
        setTags((currentTags) => {
          const cleared = { ...currentTags };
          ['execution', 'quality', 'outcome'].forEach((c) => delete cleared[c]);
          return cleared;
        });
      }
      return next;
    });
  };

  const handleSave = () => {
    setShowSaveOverlay(true);
  };

  const confirmSave = () => {
    setShowSaveOverlay(false);
    showToast(`${count} tag${count !== 1 ? 's' : ''} saved to trade`, 'ok');
    setTimeout(() => handleClearAll(), 800);
  };

  return (
    <div className="page">
      {/* TOAST */}
      <div className="toast-wrap" id="toastWrap">
        {toastMsg && (
          <div className="toast show">
            <div className={`toast-icon ti-${toastMsg.type}`}>
              {toastMsg.type === 'ok' && '✓'}
              {toastMsg.type === 'err' && '✕'}
              {toastMsg.type === 'inf' && 'i'}
            </div>
            <div className="toast-msg">{toastMsg.msg}</div>
          </div>
        )}
      </div>

      {/* SAVE CONFIRM MODAL */}
      <div className={`overlay ${showSaveOverlay ? 'open' : ''}`} id="saveOverlay" onClick={(e) => {
        if (e.target === e.currentTarget) setShowSaveOverlay(false);
      }}>
        <div className="modal-box">
          <div className="modal-top">
            <div className="modal-title">Save Trade Tags</div>
            <div className="modal-sub">NIFTY50 · BUY · ₹22,140</div>
          </div>
          <div className="modal-tags-preview">
            {Object.keys(tags).map((cat) => (
              <div key={cat} className={`stag ${tags[cat].colorClass}`}>
                <div className="stag-dot"></div>
                {tags[cat].val}
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn-ghost-sm" onClick={() => setShowSaveOverlay(false)}>Cancel</button>
            <button className="btn-save" onClick={confirmSave}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirm Tags
            </button>
          </div>
        </div>
      </div>

      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-left">
          <button 
            className="btn-ghost-sm" 
            onClick={() => navigate('/dashboard')}
            style={{ marginRight: '16px' }}
          >
            ← Back
          </button>
          <div className="logo-mark">LX</div>
          <div className="trade-sep" style={{ color: 'var(--border-base)' }}>|</div>
          <div className="topbar-trade-info">
            <span className="trade-sym">NIFTY50 CE 22200</span>
            <span className="trade-sep">·</span>
            <span className="trade-detail">BUY · 50 lots · ₹22,140 · 09:32 AM</span>
          </div>
        </div>
        <div className="topbar-right">
          {/* Tag counter */}
          <div className="tag-counter">
            <div className="tag-counter-pips">
              {[0, 1, 2, 3, 4].map((i) => {
                let pipClass = 'pip';
                if (i < count) {
                  if (count >= MAX_TAGS) pipClass += ' full';
                  else if (count >= 4) pipClass += ' warn';
                  else pipClass += ' filled';
                }
                return <div key={i} className={pipClass}></div>;
              })}
            </div>
            <span style={{ color: count >= MAX_TAGS ? 'var(--loss)' : count >= 4 ? 'var(--warning)' : '' }}>
              {count} / {MAX_TAGS} {count !== 1 ? 'tags' : 'tag'}
            </span>
          </div>
          <button className="btn-ghost-sm" onClick={handleClearAll}>Clear all</button>
          <button className="btn-save" disabled={count === 0} onClick={handleSave}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save Tags
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        {/* AFTER ENTRY */}
        <div className="section-wrap">
          <div className="section-phase-label">
            <div className="phase-text entry-phase">
              <div className="phase-icon" style={{ background: 'var(--warning)' }}></div>
              After Entry
            </div>
            <div className="phase-line"></div>
            <div className="phase-badge phase-entry">Tag immediately</div>
          </div>

          <div className="category-grid cols-3">
            <CategoryCard
              id="direction"
              title="Direction"
              hint="Always tag this first"
              number="01"
              selectedTag={tags['direction']}
              onSelect={handleSelectTag('direction')}
            />
            <CategoryCard
              id="strategy"
              title="Strategy"
              hint="What setup triggered the trade"
              number="02"
              selectedTag={tags['strategy']}
              onSelect={handleSelectTag('strategy')}
            />
            <CategoryCard
              id="market"
              title="Market"
              hint="What environment you traded in"
              number="03"
              selectedTag={tags['market']}
              onSelect={handleSelectTag('market')}
            />
          </div>
        </div>

        {/* AFTER CLOSE */}
        <div className="section-wrap">
          <div className="section-phase-label">
            <div className="phase-text close-phase">
              <div className="phase-icon" style={{ background: '#a07cfa' }}></div>
              After Close
            </div>
            <div className="phase-line"></div>
            <div
              className="lock-badge"
              style={{
                color: tradeClosed ? 'var(--profit)' : '',
                borderColor: tradeClosed ? 'rgba(0,200,150,0.3)' : '',
                background: tradeClosed ? 'rgba(0,200,150,0.08)' : '',
              }}
            >
              {tradeClosed ? (
                <>
                  <svg width="8" height="8" fill="none" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Trade closed — tag now
                </>
              ) : (
                <>
                  <svg width="8" height="8" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Unlocks on trade close
                </>
              )}
            </div>
          </div>

          <div className="category-grid cols-3-alt">
            <CategoryCard
              id="execution"
              title="Execution"
              hint="How well you executed vs plan"
              number="04"
              isLocked={!tradeClosed}
              selectedTag={tags['execution']}
              onSelect={handleSelectTag('execution')}
            />
            <CategoryCard
              id="quality"
              title="Quality"
              hint="Discipline and decision quality"
              number="05"
              isLocked={!tradeClosed}
              selectedTag={tags['quality']}
              onSelect={handleSelectTag('quality')}
            />
            <CategoryCard
              id="outcome"
              title="Outcome"
              hint="How the trade ended"
              number="06"
              isLocked={!tradeClosed}
              selectedTag={tags['outcome']}
              onSelect={handleSelectTag('outcome')}
            />
          </div>
        </div>

        {/* SUMMARY STRIP */}
        <div className="summary-strip">
          <div className="summary-tags-row">
            {count === 0 ? (
              <span className="summary-placeholder">Select tags above — max 5 across all categories</span>
            ) : (
              Object.keys(tags).map((cat) => (
                <div key={cat} className={`stag ${tags[cat].colorClass}`}>
                  <div className="stag-dot"></div>
                  {tags[cat].val}
                </div>
              ))
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            {/* Toggle: unlock after-close for demo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>Simulate trade close</div>
              <div
                className="toggle-wrap"
                onClick={handleToggleClose}
                style={{
                  width: '32px', height: '18px', borderRadius: '9px',
                  background: tradeClosed ? 'var(--profit)' : 'var(--border-base)',
                  cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0
                }}
              >
                <div
                  style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: tradeClosed ? 'var(--text-inverse)' : 'var(--text-primary)',
                    position: 'absolute', top: '2px', left: tradeClosed ? '16px' : '2px',
                    transition: 'left 0.2s, background 0.2s'
                  }}
                ></div>
              </div>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'var(--border-dim)' }}></div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
              Max 5 tags · 6 categories · No exceptions
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="page-footer">
        <div className="footer-rule">
          <span>Max 5 tags per trade</span>
          <span className="footer-sep">·</span>
          <span>6 categories</span>
          <span className="footer-sep">·</span>
          <span>Tag every trade, no exceptions</span>
        </div>
        <div className="footer-brand">
          <span>logxapp.in</span>
          <span className="footer-sep">·</span>
          <span>Trade</span>
          <span className="footer-sep">·</span>
          <span>Analyze</span>
          <span className="footer-sep">·</span>
          <span style={{ color: 'var(--profit)' }}>Edge</span>
        </div>
      </footer>
    </div>
  );
}
