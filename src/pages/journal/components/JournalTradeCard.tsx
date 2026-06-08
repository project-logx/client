import { TrendingUp, TrendingDown } from "lucide-react";
import type { Trade } from "../constants";

interface JournalTradeCardProps {
  trade: Trade;
}

const JournalTradeCard = ({ trade }: JournalTradeCardProps) => {
  return (
    <div className="journal-trade-card">
      <div className="journal-trade-card-header">
        <span className="journal-trade-symbol">{trade.tradingsymbol}</span>
        <span
          className={`journal-trade-badge ${
            trade.transaction_type === "BUY" ? "badge-buy" : "badge-sell"
          }`}
        >
          {trade.transaction_type === "BUY" ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}
          {trade.transaction_type}
        </span>
      </div>
      <div className="journal-trade-meta">
        <span>Qty: <strong>{trade.quantity}</strong></span>
        <span>₹<strong>{parseFloat(String(trade.average_price)).toFixed(2)}</strong></span>
        {trade.product && <span className="journal-trade-product">{trade.product}</span>}
      </div>
      {trade.order_timestamp && (
        <div className="journal-trade-time">
          {new Date(trade.order_timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default JournalTradeCard;
