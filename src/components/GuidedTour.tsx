import { useEffect } from 'react';
import { Joyride } from 'react-joyride';
import type { EventData, Step } from 'react-joyride';
import { useTradeStore } from '../store/useTradeStore';

/* ── Tooltip Styling (Dark Zinc theme, no neon) ──────────── */
const TOUR_STYLES = {
  options: {
    arrowColor: '#18181b',
    backgroundColor: '#18181b',
    overlayColor: 'rgba(9, 9, 11, 0.8)',
    primaryColor: '#ffffff',
    textColor: '#e4e4e7',
    width: 360,
    zIndex: 10000,
  },
  tooltip: {
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
  tooltipContainer: { textAlign: 'left' as const },
  tooltipTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  tooltipContent: {
    fontSize: '14px',
    color: '#a1a1aa',
    lineHeight: '1.6',
  },
  buttonNext: {
    backgroundColor: '#ffffff',
    color: '#09090b',
    fontWeight: 600,
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
  },
  buttonBack: {
    color: '#a1a1aa',
    marginRight: '12px',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  buttonSkip: {
    color: '#71717a',
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
};

/* ── Step Definitions (value-driven, max 4) ──────────────── */
const STEPS: Step[] = [
  {
    target: '.stat-card.profit',
    title: 'Analyze Your Edge',
    content:
      'True performance goes beyond P&L. See how your profitability correlates with your emotional stability in real-time.',
    placement: 'bottom',
    skipBeacon: true,
  },
  {
    target: '.trade-stack-container',
    title: 'Contextual Tracking',
    content:
      'Your live positions appear here. Click any trade to document your emotional state at entry, mid-trade, or exit.',
    placement: 'left',
    skipBeacon: true,
  },
  {
    target: '.coach-banner',
    title: 'Behavioral Guardian',
    content:
      'LogX identifies tilt patterns and delivers quiet, well-timed coaching interventions before a mistake happens.',
    placement: 'bottom',
    skipBeacon: true,
  },
  {
    target: '.sidebar',
    title: 'Start logging trades',
    content:
      'Use the sidebar to navigate between your Journal, Journey replay, and Insights. Build your edge one node at a time.',
    placement: 'right',
    skipBeacon: true,
  },
];

/* ── Component ───────────────────────────────────────────── */
export const GuidedTour = () => {
  const { tourActive, setTourActive, hasSeenWelcome, setWelcomeSeen } =
    useTradeStore();

  // Delayed auto-start: wait 2.5s on first visit so user can orient
  useEffect(() => {
    if (!hasSeenWelcome && !tourActive) {
      const timer = setTimeout(() => setTourActive(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenWelcome, tourActive, setTourActive]);

  const handleEvent = (data: EventData) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setTourActive(false);
      setWelcomeSeen(true);
    }
  };

  return (
    <Joyride
      steps={STEPS}
      run={tourActive}
      onEvent={handleEvent}
      continuous={true}
      options={{
        showProgress: false,
        overlayClickAction: 'close'
      }}
      styles={TOUR_STYLES}
    />
  );
};
