export const InsightsScreen = () => (
  <div className="main-content">
    {/* Coach Conclusion Premium Banner */}
    <div className="coach-conclusion anim hover-magnetic" style={{ marginBottom: '32px' }}>
      <div style={{ fontSize: '12px', color: '#00e6b8', fontWeight: 800, letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>LogX Behavioral Analysis</div>
      <div style={{ fontSize: '28px', fontWeight: 600, color: '#ffffff', lineHeight: 1.4, maxWidth: '85%' }}>
        Data indicates your win rate drops <span style={{ color: 'var(--loss)' }}>42%</span> when executing exactly on the opening drive with a 'Clarity' stat below 4. <span style={{ color: '#00e6b8', borderBottom: '2px solid rgba(0,230,184,0.4)', paddingBottom: '4px' }}>Delay initial execution to 10:15 AM</span> to secure your analytical edge safely.
      </div>
      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '14px', background: '#00e6b8', color: '#000', fontWeight: 700, borderRadius: '8px', border: 'none', boxShadow: '0 0 20px rgba(0, 230, 184, 0.4)' }}>Accept New Routine</button>
        <button className="btn btn-ghost" style={{ padding: '12px 32px', fontSize: '14px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>View Dataset Correlation</button>
      </div>
    </div>

    {/* Unlock progress */}
    <div className="anim glass-card-premium" style={{ padding:'var(--space-6)', marginBottom: '32px' }}>
      <div style={{display:'flex',alignItems:'center',gap:'var(--space-6)'}}>
        <div style={{flex:1}}>
          <div style={{fontSize:'14px',fontWeight:700,color:'var(--text-primary)',marginBottom:'var(--space-3)'}}>Deeper Insights unlock at 10 complete trade nodes</div>
          <div className="progress-bar-wrap" style={{height:'8px', background: 'rgba(255,255,255,0.05)'}}>
            <div className="progress-bar-fill" style={{width:'30%',background:'linear-gradient(90deg,var(--accent),var(--info))', boxShadow: '0 0 10px rgba(59,139,250,0.5)'}}></div>
          </div>
          <div style={{fontSize:'12px',color:'var(--text-tertiary)',marginTop:'var(--space-3)',fontFamily:'var(--font-mono)', fontWeight: 600}}>3 of 10 journeys completely tagged</div>
        </div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:'40px',fontWeight:800,color:'var(--text-secondary)'}}>3<span style={{fontSize:'20px',color:'var(--text-tertiary)'}}>/10</span></div>
      </div>
    </div>

    <div className="grid-2">
      {/* Win rate by tag */}
      <div className="card anim anim-d1 glass-card-premium">
        <div className="card-header">
          <div className="card-title">Win Rate by Emotion Tag</div>
          <div className="badge badge-info" style={{ background: 'rgba(59,139,250,0.2)', border: '1px solid rgba(59,139,250,0.4)', borderRadius: '4px' }}>AI Preview</div>
        </div>
        <div className="card-body" style={{ filter:'blur(4px)', opacity: 0.5, pointerEvents:'none', userSelect:'none' }}>
          <div className="stack-3">
            {[
              {tag:'Confident',w:78,pnl:'+₹22,400',corr:'+0.62',cls:'profit'},
              {tag:'Calm',w:65,pnl:'+₹14,200',corr:'+0.41',cls:'profit'},
              {tag:'Anxious',w:32,pnl:'−₹8,100',corr:'−0.48',cls:'loss'},
              {tag:'FOMO',w:22,pnl:'−₹12,600',corr:'−0.71',cls:'loss'},
            ].map(r=>(
              <div className="insight-row" key={r.tag} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                <div className="insight-tag-name" style={{ fontWeight: 600 }}>{r.tag}</div>
                <div className="insight-bar-wrap" style={{ height: '6px' }}><div className={`insight-bar ${r.cls}`} style={{width:`${r.w}%`}}></div></div>
                <div className={`insight-winrate ${r.cls}`} style={{ fontWeight: 700 }}>{r.w}%</div>
                <div className={`insight-pnl ${r.cls}`} style={{ fontWeight: 700 }}>{r.pnl}</div>
                <div className={`corr-chip ${r.cls==='profit'?'corr-pos':'corr-neg'}`}>{r.corr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider correlation */}
      <div className="card anim anim-d2 glass-card-premium">
        <div className="card-header">
          <div className="card-title">Slider Correlation with P&amp;L</div>
          <div className="badge badge-info" style={{ background: 'rgba(59,139,250,0.2)', border: '1px solid rgba(59,139,250,0.4)', borderRadius: '4px' }}>AI Preview</div>
        </div>
        <div className="card-body" style={{ filter:'blur(4px)', opacity: 0.5, pointerEvents:'none', userSelect:'none' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              {name:'Confidence',dot:'confidence',corr:'+0.62',cls:'profit',w:'31%',dir:'left'},
              {name:'Stress',dot:'stress',corr:'−0.48',cls:'loss',w:'24%',dir:'right'},
              {name:'Focus',dot:'focus',corr:'+0.54',cls:'profit',w:'27%',dir:'left'},
              {name:'Clarity',dot:'clarity',corr:'+0.38',cls:'profit',w:'19%',dir:'left'},
              {name:'Patience',dot:'patience',corr:'+0.44',cls:'profit',w:'22%',dir:'left'},
            ].map(s=>(
              <div key={s.name} style={{ display:'flex', alignItems:'center', gap:'16px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                <div className={`dim-dot ${s.dot}`} style={{ width: '10px', height: '10px' }}></div>
                <span style={{ fontSize:'13px', width:'100px', color:'var(--text-primary)', fontWeight: 600 }}>{s.name}</span>
                <div style={{ flex:1, height:'6px', background:'var(--bg-overlay)', borderRadius:'var(--radius-full)', position:'relative' }}>
                  <div style={{ position:'absolute', [s.dir==='left'?'left':'right']:'50%', top:0, height:'100%', width:s.w, background:s.cls==='profit'?'var(--profit)':'var(--loss)', borderRadius:'var(--radius-full)', boxShadow: `0 0 10px var(--${s.cls})` }}></div>
                </div>
                <div className={`corr-chip ${s.cls==='profit'?'corr-pos':'corr-neg'}`} style={{ fontWeight: 700 }}>{s.corr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
