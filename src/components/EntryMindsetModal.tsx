import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const EntryMindsetModal = ({ isOpen, onClose, onSave }: Props) => {
  const [sliders, setSliders] = useState({ confidence: 7, stress: 3, focus: 8, clarity: 6, patience: 5 });
  const [emotionTags, setEmotionTags] = useState<Record<string, string>>({});

  const toggleTag = (tag: string, cls: string) => {
    setEmotionTags(prev => {
      const next = { ...prev };
      if (next[tag]) delete next[tag]; else next[tag] = cls;
      return next;
    });
  };

  const sliderConfigs = [
    { key: 'confidence', label: 'Confidence', color: 'var(--dim-confidence)', cls: 'slider-confidence' },
    { key: 'stress', label: 'Stress', color: 'var(--dim-stress)', cls: 'slider-stress' },
    { key: 'focus', label: 'Focus', color: 'var(--dim-focus)', cls: 'slider-focus' },
    { key: 'clarity', label: 'Market Clarity', color: 'var(--dim-clarity)', cls: 'slider-clarity' },
    { key: 'patience', label: 'Patience', color: 'var(--dim-patience)', cls: 'slider-patience' },
  ] as const;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>Entry Mindset</div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>How are you feeling right now?</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {/* Trade context */}
          <div className="trade-context-banner">
            <div>
              <div className="tcb-symbol">NIFTY50 CE 22200</div>
              <div className="tcb-meta">BUY · 50 lots · Entry ₹22,140 · 09:32 AM</div>
            </div>
            <div className="status-chip status-pending-entry">Pending Entry Tag</div>
          </div>

          {/* Tags */}
          <div className="form-section-title">Emotional State</div>
          <div className="tag-group">
            <div className="tag-group-label">Emotion</div>
            <div className="tag-grid">
              {['Confident', 'Calm'].map(t => (
                <div key={t} className={`tag-chip ${emotionTags[t] || ''}`} onClick={() => toggleTag(t, 'selected')}>{t}</div>
              ))}
              {['Anxious', 'Fearful', 'Greedy'].map(t => (
                <div key={t} className={`tag-chip ${emotionTags[t] || ''}`} onClick={() => toggleTag(t, 'selected-warn')}>{t}</div>
              ))}
            </div>
          </div>
          <div className="tag-group" style={{ marginTop: 'var(--space-3)' }}>
            <div className="tag-group-label">Strategy</div>
            <div className="tag-grid">
              {['Breakout', 'Reversal', 'Momentum', 'Range'].map(t => (
                <div key={t} className={`tag-chip ${emotionTags[t] || ''}`} onClick={() => toggleTag(t, 'selected-info')}>{t}</div>
              ))}
            </div>
          </div>
          <div className="tag-group" style={{ marginTop: 'var(--space-3)' }}>
            <div className="tag-group-label">Mistake Flags</div>
            <div className="tag-grid">
              {['FOMO', 'Revenge Trade', 'Oversize', 'Ignored SL', 'Early Exit'].map(t => (
                <div key={t} className={`tag-chip ${emotionTags[t] || ''}`} onClick={() => toggleTag(t, 'selected-loss')}>{t}</div>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="form-section-title" style={{ marginTop: 'var(--space-5)' }}>Mental State (0 – 10)</div>
          <div className="stack-3">
            {sliderConfigs.map(s => (
              <div className="slider-row" key={s.key}>
                <span className="slider-label" style={{ color: s.color }}>{s.label}</span>
                <div className="slider-track-wrap">
                  <input
                    type="range"
                    className={`slider-native ${s.cls}`}
                    min="0" max="10"
                    value={sliders[s.key]}
                    onChange={(e) => setSliders(prev => ({ ...prev, [s.key]: parseInt(e.target.value) }))}
                  />
                </div>
                <span className="slider-value" style={{ color: s.color }}>{sliders[s.key]}</span>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="form-section-title" style={{ marginTop: 'var(--space-5)' }}>Your Thought</div>
          <textarea className="note-field" placeholder="Why are you entering? What's your thesis? e.g. NIFTY broke 22,100 with strong volume, expecting follow-through…"></textarea>
        </div>
        <div className="modal-footer">
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Entry node · Trade will become Active</span>
          <div className="row-3">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onSave}>Save Entry Node</button>
          </div>
        </div>
      </div>
    </div>
  );
};
