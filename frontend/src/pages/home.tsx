import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext, LoggedUser } from "../contexts/auth-context";
import { useNavigate } from "react-router";

interface Account {
  id: number;
  name: string;
  balance: number;
}

export function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [user, setUser] = useState<LoggedUser | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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
    const loggedUser = authContext?.getLoggedUser();
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, [authContext]);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
      navigate("/login");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <label className="text-2xl font-bold">Welcome, {user?.name}</label>
        <div className="flex-1"></div>
        <label className="text-xl mr-3">{user?.login}</label>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

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

      <div className="flex justify-center items-center bg-green-300">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Withdraw
        </button>
        <div className="w-10"></div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
