import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

import type { ExistingAttachment } from "../constants";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENTS_PER_NODE,
  MAX_ATTACHMENT_SIZE_BYTES,
} from "../constants";

interface JournalNoteSectionProps {
  note: string;
  onNoteChange: (note: string) => void;
  attachments: File[];
  onAttachmentsChange: (files: File[]) => void;
  existingAttachments?: ExistingAttachment[];
  existingAttachmentsLabel?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isImageMime = (mime: string) => mime.startsWith("image/");

const JournalNoteSection = ({
  note,
  onNoteChange,
  attachments,
  onAttachmentsChange,
  existingAttachments = [],
  existingAttachmentsLabel = "Previously uploaded",
}: JournalNoteSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const valid: File[] = [];
    for (const file of selected) {
      if (!ALLOWED_ATTACHMENT_MIME_TYPES.includes(file.type as (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number])) {
        continue;
      }
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        continue;
      }
      valid.push(file);
    }

    const merged = [...attachments, ...valid].slice(0, MAX_ATTACHMENTS_PER_NODE);
    onAttachmentsChange(merged);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    onAttachmentsChange(attachments.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="journal-card">
        <h3 className="journal-card-title">
          Note <span className="journal-optional">(optional)</span>
        </h3>
        <textarea
          className="journal-note-input"
          rows={4}
          placeholder="Add your reasoning, observations, or anything you want to remember about this moment..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
      <div className="journal-card journal-attachments-card">
        <h3 className="journal-card-title">
          Attachments <span className="journal-optional">(optional)</span>
        </h3>
        <p className="journal-card-hint">
          PNG, JPEG, or WebP images up to 10 MB each (max {MAX_ATTACHMENTS_PER_NODE} new files per step)
        </p>

        {existingAttachments.length > 0 && (
          <div className="journal-attachments-existing">
            <p className="journal-attachments-existing-label">{existingAttachmentsLabel}</p>
            <div className="journal-attachments-gallery">
              {existingAttachments.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="journal-attachments-gallery-item"
                  title={item.file_name}
                >
                  {isImageMime(item.mime_type) ? (
                    <img src={item.url} alt={item.file_name} className="journal-attachments-thumb" />
                  ) : (
                    <span className="journal-attachments-fallback">{item.file_name}</span>
                  )}
                  <span className="journal-attachments-gallery-name">{item.file_name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <label className="journal-attachments-upload">
          <ImagePlus size={18} />
          <span>Choose images</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_ATTACHMENT_MIME_TYPES.join(",")}
            onChange={handleFileChange}
            disabled={attachments.length >= MAX_ATTACHMENTS_PER_NODE}
            hidden
          />
        </label>

        {attachments.length > 0 && (
          <ul className="journal-attachments-list">
            {attachments.map((file, index) => (
              <li key={`${file.name}-${file.size}-${index}`} className="journal-attachments-item">
                <span className="journal-attachments-name">{file.name}</span>
                <span className="journal-attachments-size">{formatFileSize(file.size)}</span>
                <button
                  type="button"
                  className="journal-attachments-remove"
                  onClick={() => removeAttachment(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default JournalNoteSection;
