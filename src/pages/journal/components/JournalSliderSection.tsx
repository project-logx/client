import { SLIDER_DIMENSIONS } from "../constants";

interface JournalSliderSectionProps {
  sliders: Record<string, number>;
  onSliderChange: (key: string, value: number) => void;
}

const SliderInput = ({
  dimension,
  value,
  onChange,
}: {
  dimension: (typeof SLIDER_DIMENSIONS)[number];
  value: number;
  onChange: (v: number) => void;
}) => {
  const Icon = dimension.icon;
  const pct = (value / 10) * 100;

  return (
    <div className="journal-slider-card">
      <div className="journal-slider-header">
        <span className="journal-slider-icon" style={{ color: dimension.color }}>
          <Icon size={16} />
        </span>
        <span className="journal-slider-label">{dimension.key}</span>
        <span className="journal-slider-value" style={{ color: dimension.color }}>
          {value}
          <span className="journal-slider-max">/10</span>
        </span>
      </div>
      <p className="journal-slider-desc">{dimension.description}</p>
      <div className="journal-slider-track">
        <div
          className="journal-slider-fill"
          style={{ width: `${pct}%`, backgroundColor: dimension.color }}
        />
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="journal-slider-input"
          style={{ "--thumb-color": dimension.color } as React.CSSProperties}
        />
      </div>
      <div className="journal-slider-ticks">
        {[0, 2, 4, 6, 8, 10].map((n) => (
          <span key={n} className={n <= value ? "journal-tick-active" : ""}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

const JournalSliderSection = ({ sliders, onSliderChange }: JournalSliderSectionProps) => {
  return (
    <div className="journal-card">
      <h3 className="journal-card-title">Psychological State</h3>
      <p className="journal-card-hint">Rate each dimension from 0 (low) to 10 (high).</p>
      <div className="journal-sliders-grid">
        {SLIDER_DIMENSIONS.map((dim) => (
          <SliderInput
            key={dim.key}
            dimension={dim}
            value={sliders[dim.key]}
            onChange={(v) => onSliderChange(dim.key, v)}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalSliderSection;
