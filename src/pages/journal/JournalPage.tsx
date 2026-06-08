import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import type { Trade, NodeType, NodeFormState } from "./constants";
import { getStepsForTrade, defaultSliders, defaultTags } from "./constants";

// Modular components
import JournalTopbar from "./components/JournalTopbar";
import JournalTradeCard from "./components/JournalTradeCard";
import JournalStepNav from "./components/JournalStepNav";
import JournalMindPreview from "./components/JournalMindPreview";
import JournalNodeGuide from "./components/JournalNodeGuide";
import JournalTagSection from "./components/JournalTagSection";
import JournalSliderSection from "./components/JournalSliderSection";
import JournalNoteSection from "./components/JournalNoteSection";
import JournalSubmitRow from "./components/JournalSubmitRow";
import JournalSuccessScreen from "./components/JournalSuccessScreen";

type JournalMode = "full" | "entry-only" | "mid";

const JournalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("JournalPage location state:", location.state);
  const trade: Trade | null = location.state?.trade ?? null;
  const journalMode: JournalMode = location.state?.journalMode ?? "full";
  const prefillData = location.state?.prefillData ?? null;

  // Determine which steps to show based on mode or trade direction
  let steps: ReturnType<typeof getStepsForTrade>;
  if (journalMode === "entry-only") {
    // Only show entry step
    const allSteps = getStepsForTrade(trade?.transaction_type);
    steps = allSteps.filter((s) => s.type === "entry");
  } else if (journalMode === "mid") {
    // Only show mid step
    const allSteps = getStepsForTrade(trade?.transaction_type);
    steps = allSteps.filter((s) => s.type === "mid");
  } else {
    // Full workflow
    const allSteps = getStepsForTrade(trade?.transaction_type);
    steps = allSteps.filter((s)=>s.type ==="exit")
  }

  const initialStep = steps[0].type;

  const [currentStep, setCurrentStep] = useState<NodeType>(initialStep);
  const [completed, setCompleted] = useState<Set<NodeType>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  // Per-node form state with optional prefilling for mid-node
  const [formState, setFormState] = useState<Record<NodeType, NodeFormState>>({
    entry: { tags: defaultTags("entry"), sliders: defaultSliders(), note: "" },
    mid:   prefillData ? { tags: prefillData.fixedTags, sliders: prefillData.sliders, note: prefillData.note } : { tags: defaultTags("mid"), sliders: defaultSliders(), note: "" },
    exit:  { tags: defaultTags("exit"),  sliders: defaultSliders(), note: "" },
  });

  const stepIndex = steps.findIndex((s) => s.type === currentStep);
  const currentNodeMeta = steps[stepIndex];
  const nodeForm = formState[currentStep];
  console.log("Current node form state:", nodeForm);

  const allTagsFilled = Object.values(nodeForm.tags).every((v) => v !== "");

  const setTag = (cat: string, tag: string) => {
    setFormState((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        tags: { ...prev[currentStep].tags, [cat]: tag },
      },
    }));
  };

  const setSlider = (key: string, val: number) => {
    setFormState((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        sliders: { ...prev[currentStep].sliders, [key]: val },
      },
    }));
  };

  const setNote = (note: string) => {
    setFormState((prev) => ({
      ...prev,
      [currentStep]: { ...prev[currentStep], note },
    }));
  };

  const journalData = {
    fixedTags: nodeForm.tags,
    sliders: nodeForm.sliders,
    note: nodeForm.note,
  };

  const handleSubmitNode = () => {
    if (!allTagsFilled) return;
    const next = new Set(completed);
    next.add(currentStep);
    setCompleted(next);

    // Handle different journal modes
    if (journalMode === "entry-only") {
      // Store completed entry trade in localStorage before returning
      const completedTrades = JSON.parse(localStorage.getItem("completedEntryTrades") || "[]");
      const tradeId = parseInt(location.state?.dbTradeId || "0");
      if (tradeId && !completedTrades.includes(tradeId)) {
        completedTrades.push(tradeId);
        localStorage.setItem("completedEntryTrades", JSON.stringify(completedTrades));
      }
      // Return to pending queue after entry submission
      navigate("/pending", { replace: true });
    } else if (journalMode === "mid") {
      // Show success screen for mid-node
      setSubmitted(true);
    } else {
      // Full workflow: move to next step in the filtered list, or finish
      const nextStepObj = steps[stepIndex + 1];
      if (nextStepObj) {
        setCurrentStep(nextStepObj.type);
      } else {
        setSubmitted(true);
      }
    }
  };

  const goToDashboard = () => navigate("/pending");

  // ── Submitted screen ──
  if (submitted) {
    return <JournalSuccessScreen trade={trade} onBack={goToDashboard} />;
  }

  return (
    <div className="journal-page">
      {/* ── Header ── */}
      <JournalTopbar onBack={goToDashboard} />

      <div className="journal-layout">
        {/* ── Left: Trade Info + Step Nav ── */}
        <aside className="journal-sidebar">
          {trade && <JournalTradeCard trade={trade} />}

          <JournalStepNav
            steps={steps}
            currentStep={currentStep}
            completed={completed}
            onStepChange={setCurrentStep}
          />

          <JournalMindPreview sliders={nodeForm.sliders} />
        </aside>

        {/* ── Right: Form ── */}
        <main className="journal-form-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {/* Section heading */}
              <div className="journal-section-head">
                <h1 className="journal-section-title">{currentNodeMeta.label}</h1>
                <p className="journal-section-sub">{currentNodeMeta.description}</p>
              </div>

              <JournalNodeGuide nodeType={currentStep} />

              {/* Fixed Tags */}
              <JournalTagSection
                nodeType={currentStep}
                tags={nodeForm.tags}
                onTagChange={setTag}
              />

              {/* Sliders */}
              <JournalSliderSection
                sliders={nodeForm.sliders}
                onSliderChange={setSlider}
              />

              {/* Note */}
              <JournalNoteSection
                note={nodeForm.note}
                onNoteChange={setNote}
              />

              {/* Submit */}
              <JournalSubmitRow
                allTagsFilled={allTagsFilled}
                tradeId={trade?.trade_id ?? ""}
                nodeType={currentStep}
                journalData={journalData}
                label={steps[stepIndex + 1] ? `Save ${currentNodeMeta.label}` : "Complete Journal"}
                onSubmitSuccess={handleSubmitNode}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default JournalPage;
