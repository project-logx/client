import { create } from 'zustand';

export interface Trade {
  id: string;
  symbol: string;
  time: string;
  dir: 'BUY' | 'SHORT';
  entry: string;
  exit: string;
  pnl: string;
  pnlClass: 'profit' | 'loss';
  status: 'complete' | 'active' | 'pending-entry' | 'pending-exit';
  nodes: number;
}

interface ToastState {
  msg: string;
  type: 'ok' | 'err' | 'inf';
}

interface StoreState {
  trades: Trade[];
  toast: ToastState | null;
  setToast: (msg: string, type?: 'ok' | 'err' | 'inf') => void;
  clearToast: () => void;
  
  // UX: Onboarding State
  hasSeenWelcome: boolean;
  tourActive: boolean;
  setWelcomeSeen: (val: boolean) => void;
  setTourActive: (val: boolean) => void;
}

export const useTradeStore = create<StoreState>((set) => ({
  trades: [
    { id: '1', symbol:'NIFTY50 CE 22200', time:'09:32 AM', dir:'BUY', entry:'22,140', exit:'22,285', pnl:'+₹7,250', pnlClass:'profit', status:'complete', nodes:3 },
    { id: '2', symbol:'BANKNIFTY PE 47800', time:'10:18 AM', dir:'SHORT', entry:'47,820', exit:'47,980', pnl:'+₹6,250', pnlClass:'profit', status:'complete', nodes:2 },
    { id: '3', symbol:'RELIANCE', time:'11:05 AM', dir:'BUY', entry:'2,918', exit:'—', pnl:'+₹1,400', pnlClass:'profit', status:'active', nodes:1 },
    { id: '4', symbol:'TATASTEEL', time:'13:41 PM', dir:'BUY', entry:'158.40', exit:'—', pnl:'+₹1,200', pnlClass:'profit', status:'pending-entry', nodes:0 },
    { id: '5', symbol:'HDFC BANK', time:'09:17 AM', dir:'BUY', entry:'1,652', exit:'1,641', pnl:'−₹1,100', pnlClass:'loss', status:'pending-exit', nodes:1 },
  ],
  toast: null,
  setToast: (msg, type = 'ok') => {
    set({ toast: { msg, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 2800);
  },
  clearToast: () => set({ toast: null }),
  
  // Onboarding Implementation
  hasSeenWelcome: localStorage.getItem('logx_tour_seen') === 'true',
  tourActive: false, // Don't auto run on init! Rely on delayed useEffect inside GuidedTour component.
  
  setWelcomeSeen: (val) => {
    localStorage.setItem('logx_tour_seen', String(val));
    set({ hasSeenWelcome: val });
  },
  setTourActive: (val) => set({ tourActive: val }),
}));
