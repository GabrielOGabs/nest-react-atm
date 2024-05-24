import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext, LoggedUser } from "../contexts/auth-context";
import { useParams } from "react-router";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  transactionDate: Date;
}

export function Transactions() {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const authContext = useContext(AuthContext);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/accounts/${accountId}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        alert("Failed to fetch transactions");
        console.error("Failed to fetch transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="mb-2 cursor-pointer p-2 rounded-md hover:bg-gradient-to-r from-gray-300"
            >
              <div className="font-bold">{transaction.type}</div>
              <div>Balance: ${transaction.amount.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No transactions available.</div>
      )}
    </div>
  );
}
