import { CheckCircle2, ChevronRight } from "lucide-react";
import type { NodeType } from "../constants";

interface StepDef {
  type: NodeType;
  label: string;
  description: string;
}

interface JournalStepNavProps {
  steps: StepDef[];
  currentStep: NodeType;
  completed: Set<NodeType>;
  onStepChange: (step: NodeType) => void;
}

const JournalStepNav = ({ steps, currentStep, completed, onStepChange }: JournalStepNavProps) => {
  return (
    <div className="journal-step-nav">
      {steps.map((step, i) => {
        const isDone = completed.has(step.type);
        const isCurrent = currentStep === step.type;
        const isLocked = !isDone && !isCurrent;
        return (
          <button
            key={step.type}
            className={`journal-step-item ${isCurrent ? "step-active" : ""} ${isDone ? "step-done" : ""} ${isLocked ? "step-locked" : ""}`}
            onClick={() => !isLocked && onStepChange(step.type)}
            disabled={isLocked}
          >
            <span className="journal-step-number">
              {isDone ? <CheckCircle2 size={14} /> : i + 1}
            </span>
            <span className="journal-step-text">
              <span className="journal-step-name">{step.label}</span>
              <span className="journal-step-desc">{step.description}</span>
            </span>
            {isCurrent && <ChevronRight size={14} className="journal-step-arrow" />}
          </button>
        );
      })}
    </div>
  );
};

export default JournalStepNav;
