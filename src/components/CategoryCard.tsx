import { CATEGORY_TAGS, type TagInfo } from '../data';

interface CategoryCardProps {
  id: string; // e.g. direction, strategy
  title: string;
  hint: string;
  number: string;
  isLocked?: boolean;
  selectedTag?: TagInfo;
  onSelect: (val: string, colorClass: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  hint,
  number,
  isLocked = false,
  selectedTag,
  onSelect,
}) => {
  const options = CATEGORY_TAGS[id as keyof typeof CATEGORY_TAGS];
  const hasSelection = !!selectedTag;

  return (
    <div
      className={`cat-card cat-${id} ${hasSelection ? 'has-selection' : ''} ${
        isLocked ? 'locked' : ''
      }`}
      id={`cat-${id}`}
    >
      <div className="cat-header">
        <div className="cat-header-left">
          <div className="cat-name">{title}</div>
          <div className="cat-hint">{hint}</div>
        </div>
        <div className="cat-number">{number}</div>
      </div>
      <div className="cat-options">
        {options.map((opt) => {
          const isSelected = selectedTag?.val === opt.val;
          return (
            <div
              key={opt.val}
              className={`tag-opt ${opt.optClass} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => {
                if (!isLocked) onSelect(opt.val, opt.stagClass);
              }}
            >
              <div className="tag-radio">
                <div className="tag-radio-dot"></div>
              </div>
              <span className="tag-label">{opt.val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
