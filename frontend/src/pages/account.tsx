import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext, LoggedUser } from "../contexts/auth-context";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  amount: number;
  type: "Deposit" | "Withdraw";
  transactionDate: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
}

export function Transactions() {
  const [user, setUser] = useState<LoggedUser | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account>();
  const authContext = useContext(AuthContext);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/accounts/${accountId}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        alert("Failed to fetch transactions");
        console.error("Failed to fetch transactions", error);
      }
    };

    const setTargetAccount = async () => {
      const targetAccount = accounts.find((x) => x.id === accountId);
      setAccount(targetAccount);
    };

    fetchAccounts();
    fetchTransactions();
    setUser(authContext?.getLoggedUser());
    setTargetAccount();
  }, [accountId, authContext, accounts]);

  const getTransactionTypeColor = (transaction: "Deposit" | "Withdraw") => {
    return transaction === "Deposit" ? "text-green-500" : "text-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("pt-br")} ${date.toLocaleTimeString(
      "pt-br"
    )}`;
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <label className="m4 text-2xl">{user?.name},</label>
        <label className="m4 text-md">
          check your transactions for the <strong>{account?.name}</strong>{" "}
          account:
        </label>

        <div className="mt-4 p-4 bg-gray-200 rounded-lg w-96">
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className={`mb-2 p-2 border-b border-gray-300 ${getTransactionTypeColor(
                    transaction.type
                  )}`}
                >
                  <div className="flex flex-row justify-between">
                    <div className="w-[10rem]">
                      {formatDate(transaction.transactionDate)}
                    </div>
                    <div className=" w-[6rem] flex justify-between">
                      <label>$</label>
                      <label>{transaction.amount.toFixed(2)}</label>
                    </div>
                  </div>
                </li>
              ))}
              <li className="mb-2 p-2">
                <div className="flex flex-row justify-between">
                  <div className="w-[10rem]">BALANCE:</div>
                  <div className=" w-[6rem] flex justify-between">
                    <label>$</label>
                    <label>{account?.balance.toFixed(2)}</label>
                  </div>
                </div>
              </li>
            </ul>
          ) : (
            <div>No transactions available.</div>
          )}
        </div>
        <Link
          to="/home"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
