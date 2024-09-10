import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import "./BalanceDisplay.scss";

const BalanceDisplay: React.FC = () => {
  const { balance } = useTransactionContext();

  return (
    <div className="balance-display">
      <h2>Total Balance: £{balance.toFixed(2)}</h2>
    </div>
  );
};

export default BalanceDisplay;
