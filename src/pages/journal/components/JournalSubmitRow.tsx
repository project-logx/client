import { useState } from "react";
import { ChevronRight } from "lucide-react";

import type { NodeType } from "../constants";

interface JournalSubmitValue {
  fixedTags: Record<string, string>;
  sliders: Record<string, number>;
  note: string;
  attachments: File[];
}

interface JournalSubmitRowProps {
  allTagsFilled: boolean;
  label: string;
  tradeId: string;
  nodeType: NodeType;
  journalData: JournalSubmitValue;
  onSubmitSuccess?: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const getNodeRoute = (nodeType: NodeType) => {
  if (nodeType === "exit") return "exit";
  if (nodeType === "mid") return "mid";
  return "entry";
};

const submitJournalNode = async (tradeId: string, nodeType: NodeType, journalData: JournalSubmitValue) => {
  const formData = new FormData();
  const route = getNodeRoute(nodeType);

  if (nodeType === "exit") {
    formData.append("execution", journalData.fixedTags.Execution ?? "");
    formData.append("result_quality", journalData.fixedTags.Quality ?? "");
    formData.append("outcome", journalData.fixedTags.Outcome ?? "");
  } else {
    formData.append("direction", journalData.fixedTags.Direction ?? "");
    formData.append("strategy", journalData.fixedTags.Strategy ?? "");
    formData.append("market_context", journalData.fixedTags.Market ?? "");
  }

  formData.append("confidence", String(journalData.sliders.Confidence ?? 5));
  formData.append("stress", String(journalData.sliders.Stress ?? 5));
  formData.append("focus", String(journalData.sliders.Focus ?? 5));
  formData.append("market_clarity", String(journalData.sliders["Market Clarity"] ?? 5));
  formData.append("patience", String(journalData.sliders.Patience ?? 5));
  formData.append("note", journalData.note);
  formData.append("confirm_intervention", "false");

  for (const file of journalData.attachments) {
    formData.append("files", file);
  }

  const nodePath = nodeType === "mid" ? "mid" : `nodes/${route}`;
  const response = await fetch(`${API_BASE_URL}/api/v1/trades/${tradeId}/${nodePath}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.detail || "Error submitting journal node");
  }

  return data;
};

const JournalSubmitRow = ({ allTagsFilled, label, tradeId, nodeType, journalData, onSubmitSuccess}: JournalSubmitRowProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (!allTagsFilled || !tradeId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const data = await submitJournalNode(tradeId, nodeType, journalData);
      console.log("Journal submitted successfully:", data);
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Error submitting journal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="journal-submit-row">
      {!allTagsFilled && (
        <p className="journal-submit-warning">
          Please select a tag for every category before continuing.
        </p>
      )}
      <button
        className={`journal-submit-btn ${allTagsFilled ? "journal-submit-btn--ready" : "journal-submit-btn--disabled"}`}
        onClick={handleClick}
        disabled={!allTagsFilled || !tradeId || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : label}
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default JournalSubmitRow;
