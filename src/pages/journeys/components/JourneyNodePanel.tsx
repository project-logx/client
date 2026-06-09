import { LogIn, Activity, LogOut } from "lucide-react";

import { SLIDER_DIMENSIONS } from "../../journal/constants";
import type { JourneyNode } from "../../../utils/journeyApi";

const NODE_META = {
  entry: {
    label: "Entry",
    icon: LogIn,
    accent: "#10b981",
    empty: "No entry journal recorded.",
  },
  mid: {
    label: "Mid Node",
    icon: Activity,
    accent: "#38bdf8",
    empty: "No mid check-in recorded.",
  },
  exit: {
    label: "Exit",
    icon: LogOut,
    accent: "#f43f5e",
    empty: "No exit journal recorded.",
  },
} as const;

interface JourneyNodePanelProps {
  nodeType: keyof typeof NODE_META;
  node: (JourneyNode & { trade_id?: number }) | undefined;
}

const formatTimestamp = (iso: string | null) => {
  if (!iso) return null;
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const JourneySliderReadout = ({ sliders }: { sliders: Record<string, number> }) => {
  const items = SLIDER_DIMENSIONS.map((dimension) => ({
    ...dimension,
    value: sliders[dimension.key] ?? 0,
  }));

  return (
    <div className="journey-slider-list">
      <span className="journey-slider-list-label">Mindset sliders</span>
      {items.map((item) => {
        const Icon = item.icon;
        const pct = (item.value / 10) * 100;
        return (
          <div key={item.key} className="journey-slider-row">
            <div className="journey-slider-row-head">
              <span className="journey-slider-row-icon" style={{ color: item.color }}>
                <Icon size={14} />
              </span>
              <span className="journey-slider-row-name">{item.key}</span>
              <span className="journey-slider-row-value" style={{ color: item.color }}>
                {item.value}<span className="journey-slider-row-max">/10</span>
              </span>
            </div>
            <div className="journey-slider-row-track">
              <div
                className="journey-slider-row-fill"
                style={{ width: `${pct}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const JourneyNodePanel = ({ nodeType, node }: JourneyNodePanelProps) => {
  const meta = NODE_META[nodeType];
  const Icon = meta.icon;
  const tags = node?.fixed_tags ?? {};
  const tagEntries = Object.entries(tags).filter(([, value]) => value?.trim());
  const sliders = node?.sliders ?? {};
  const hasSliders = SLIDER_DIMENSIONS.some((d) => d.key in sliders);

  return (
    <section className="journey-node-panel">
      <div className="journey-node-panel-head" style={{ borderColor: `${meta.accent}33` }}>
        <div className="journey-node-panel-icon" style={{ color: meta.accent, background: `${meta.accent}14` }}>
          <Icon size={18} />
        </div>
        <div>
          <h3 className="journey-node-panel-title">{meta.label}</h3>
          {node && (node.captured_at || node.trade_id) && (
            <p className="journey-node-panel-time">
              {node.captured_at ? formatTimestamp(node.captured_at) : null}
              {node.trade_id ? (
                <span>{node.captured_at ? " · " : ""}Trade #{node.trade_id}</span>
              ) : null}
            </p>
          )}
        </div>
      </div>

      {!node ? (
        <p className="journey-node-panel-empty">{meta.empty}</p>
      ) : (
        <div className="journey-node-panel-body">
          {tagEntries.length > 0 ? (
            <div className="journey-tag-list">
              {tagEntries.map(([category, value]) => (
                <div key={category} className="journey-tag-row">
                  <span className="journey-tag-category">{category}</span>
                  <span className="journey-tag-value">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="journey-node-panel-empty">No tags recorded.</p>
          )}

          {hasSliders && <JourneySliderReadout sliders={sliders} />}

          {node.note?.trim() && (
            <div className="journey-node-note">
              <span className="journey-node-note-label">Note</span>
              <p>{node.note}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default JourneyNodePanel;
