interface JournalNoteSectionProps {
  note: string;
  onNoteChange: (note: string) => void;
}

const JournalNoteSection = ({ note, onNoteChange }: JournalNoteSectionProps) => {
  return (
    <div className="journal-card">
      <h3 className="journal-card-title">Note <span className="journal-optional">(optional)</span></h3>
      <textarea
        className="journal-note-input"
        rows={4}
        placeholder="Add your reasoning, observations, or anything you want to remember about this moment..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
      />
    </div>
  );
};

export default JournalNoteSection;
