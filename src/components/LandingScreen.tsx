import { useNavigate } from 'react-router-dom';
import './LandingScreen.css';

export const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Subtle Grid and Core Glow */}
      <div className="grid-overlay"></div>
      <div className="bg-glow"></div>

      <nav className="landing-nav">
        <div className="landing-logo">
          Log<span style={{ color: '#00e6b8', textShadow: '0 0 16px rgba(0, 230, 184, 0.6)' }}>X</span>
        </div>
        <button 
          className="btn btn-ghost sign-in-btn" 
          onClick={() => navigate('/dashboard')}
        >
          Sign In
        </button>
      </nav>
      
      <main className="landing-hero">
        <div className="hero-title" style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span>TRADE</span> 
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '40px' }}>&middot;</span> 
          <span>ANALYZE</span> 
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '40px' }}>&middot;</span> 
          <span style={{ color: '#00e6b8' }}>EDGE</span>
        </div>
        <p className="hero-subtitle">
          The ultimate journaling tool to catalog your mindset, map your trade execution nodes, and calculate your true emotional edge.
        </p>
        <button className="glow-btn" onClick={() => navigate('/dashboard')}>
          Launch Platform
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        
        {/* Sleek, subdued mock panel that represents the app */}
        <div className="mock-container">
           <div className="mock-panel">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  <div className="mock-dot" style={{ background: '#ff4444' }}></div>
                  <div className="mock-dot" style={{ background: '#f09c38' }}></div>
                  <div className="mock-dot" style={{ background: '#00e6b8' }}></div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom:'32px'}}>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', flex: 0.3}}></div>
                <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>MINDSET TRACKING</div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', flex: 0.7}}></div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                 <div className="mock-glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="mock-line" style={{ width: '40%', opacity: 0.5 }}></div>
                    <div className="mock-line" style={{ width: '60%', opacity: 0.2 }}></div>
                 </div>
                 <div className="mock-glass-card tag-active" style={{ background: 'rgba(0, 230, 184, 0.05)', border: '1px solid rgba(0, 230, 184, 0.2)' }}>
                    <div className="mock-line" style={{ width: '30%', background: '#00e6b8', opacity: 0.8 }}></div>
                    <div className="mock-line" style={{ width: '70%', background: '#00e6b8', opacity: 0.3 }}></div>
                 </div>
                 <div className="mock-glass-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="mock-line" style={{ width: '50%', opacity: 0.4 }}></div>
                    <div className="mock-line" style={{ width: '30%', opacity: 0.2 }}></div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
