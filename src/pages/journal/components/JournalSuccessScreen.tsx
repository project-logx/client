import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Trade } from "../constants";

interface JournalSuccessScreenProps {
  trade: Trade | null;
  onBack: () => void;
}

const JournalSuccessScreen = ({ trade, onBack }: JournalSuccessScreenProps) => {
  return (
    <div className="journal-page">
      <div className="journal-success-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="journal-success-icon"
        >
          <CheckCircle2 size={64} color="#10b981" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Trade Journal Submitted
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="journal-success-sub"
        >
          {trade?.transaction_type === "BUY"
            ? "Entry node recorded — great start to your journal!"
            : "Exit node recorded — your trade reflection is complete!"}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onBack}
          className="journal-back-btn"
        >
          Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
};

export default JournalSuccessScreen;
