import { ArrowLeft, BookOpen } from "lucide-react";

interface JournalTopbarProps {
  onBack: () => void;
}

const JournalTopbar = ({ onBack }: JournalTopbarProps) => {
  return (
    <div className="journal-topbar">
      <button className="journal-topbar-back" onClick={onBack}>
        <ArrowLeft size={16} />
        Dashboard
      </button>
      <div className="journal-topbar-title">
        <BookOpen size={18} />
        Trade Journal
      </div>
    </div>
  );
};

export default JournalTopbar;
