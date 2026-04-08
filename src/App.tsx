import { useState } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AppTopbar } from './components/AppTopbar';
import { DashboardScreen } from './components/DashboardScreen';
import { JournalScreen } from './components/JournalScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { InsightsScreen } from './components/InsightsScreen';
import { TaggingScreen } from './components/TaggingScreen';
import { EntryMindsetModal } from './components/EntryMindsetModal';
import { LandingScreen } from './components/LandingScreen';
import { GuidedTour } from './components/GuidedTour';
import { useTradeStore } from './store/useTradeStore';

function AppShellLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast, setToast } = useTradeStore();

  return (
    <div className="app-shell">
      <GuidedTour />
      {/* GLOBAL TOAST CONTAINER */}
      <div className="toast-wrap" id="toastWrap" style={{ pointerEvents: 'none', zIndex: 999 }}>
        {toast && (
          <div className="toast show" style={{ pointerEvents: 'all' }}>
            <div className={`toast-icon ti-${toast.type}`}>
              {toast.type === 'ok' && '✓'}
              {toast.type === 'err' && '✕'}
              {toast.type === 'inf' && 'i'}
            </div>
            <div className="toast-msg">{toast.msg}</div>
          </div>
        )}
      </div>

      <Sidebar />
      
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <AppTopbar />
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {/* Inject setIsModalOpen into child screens through Context */}
          <Outlet context={{ setIsModalOpen }} />
        </div>
      </div>

      <EntryMindsetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={() => {
          setIsModalOpen(false);
          setToast('Node saved — trade moved to Active', 'ok');
        }}
      />
    </div>
  );
}

function DashboardWithContext() {
  const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: (b: boolean) => void }>();
  return <DashboardScreen onOpenModal={() => setIsModalOpen(true)} />;
}

function JournalWithContext() {
  const { setIsModalOpen } = useOutletContext<{ setIsModalOpen: (b: boolean) => void }>();
  return <JournalScreen onOpenModal={() => setIsModalOpen(true)} />;
}

function App() {
  const location = useLocation();

  // If we're on the Tagging screen, rendering outside App Shell Layout
  if (location.pathname === '/tagging') {
    return <TaggingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route element={<AppShellLayout />}>
        <Route path="/dashboard" element={<DashboardWithContext />} />
        <Route path="/journal" element={<JournalWithContext />} />
        <Route path="/journey" element={<JourneyScreen />} />
        <Route path="/insights" element={<InsightsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
