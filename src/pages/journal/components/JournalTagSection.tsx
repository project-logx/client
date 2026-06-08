import { CheckCircle2 } from "lucide-react";
import type { NodeType } from "../constants";
import { FIXED_TAGS } from "../constants";

interface JournalTagSectionProps {
  nodeType: NodeType;
  tags: Record<string, string>;
  onTagChange: (category: string, tag: string) => void;
}

const TagSelector = ({
  category,
  options,
  selected,
  onSelect,
}: {
  category: string;
  options: string[];
  selected: string | null;
  onSelect: (tag: string) => void;
}) => (
  <div className="journal-tag-group">
    <p className="journal-tag-category">{category}</p>
    <div className="journal-tag-options">
      {options.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(selected === tag ? "" : tag)}
          className={`journal-tag-btn ${selected === tag ? "journal-tag-btn--active" : ""}`}
        >
          {selected === tag && <CheckCircle2 size={12} />}
          {tag}
        </button>
      ))}
    </div>
  </div>
);

const JournalTagSection = ({ nodeType, tags, onTagChange }: JournalTagSectionProps) => {
  const tagCategories = FIXED_TAGS[nodeType];

  return (
    <div className="journal-card">
      <h3 className="journal-card-title">Fixed Tags</h3>
      <p className="journal-card-hint">Select exactly one tag per category — all are required.</p>
      <div className="journal-tags-grid">
        {Object.entries(tagCategories).map(([cat, opts]) => (
          <TagSelector
            key={cat}
            category={cat}
            options={opts}
            selected={tags[cat] || null}
            onSelect={(tag) => onTagChange(cat, tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default JournalTagSection;
