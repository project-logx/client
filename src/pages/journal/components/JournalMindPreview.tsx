import { Brain } from "lucide-react";
import { SLIDER_DIMENSIONS } from "../constants";

interface JournalMindPreviewProps {
  sliders: Record<string, number>;
}

const JournalMindPreview = ({ sliders }: JournalMindPreviewProps) => {
  return (
    <div className="journal-mind-preview">
      <p className="journal-mind-title">
        <Brain size={14} /> Current Mind State
      </p>
      {SLIDER_DIMENSIONS.map((d) => (
        <div key={d.key} className="journal-mind-row">
          <span>{d.key}</span>
          <div className="journal-mind-bar-bg">
            <div
              className="journal-mind-bar-fill"
              style={{
                width: `${(sliders[d.key] / 10) * 100}%`,
                backgroundColor: d.color,
              }}
            />
          </div>
          <span style={{ color: d.color }}>{sliders[d.key]}</span>
        </div>
      ))}
    </div>
  );
};

export default JournalMindPreview;
