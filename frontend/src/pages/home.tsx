import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/auth-context";

interface Account {
  id: number;
  name: string;
  balance: number;
}

export function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-bold mb-2">Accounts</h2>
        {accounts.length > 0 ? (
          <ul>
            {accounts.map((account) => (
              <li key={account.id} className="mb-2">
                <div className="font-bold">{account.name}</div>
                <div>Balance: ${account.balance.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No accounts available.</div>
        )}
      </div>
    </div>
  );
}
