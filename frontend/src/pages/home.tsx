import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext, LoggedUser } from "../contexts/auth-context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface Account {
  id: string;
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

  const handleOnAccountClick = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
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

      <div className="bg-gray-200 shadow-md rounded p-4 mt-5">
        <h2 className="text-xl font-bold mb-2">Accounts</h2>
        {accounts.length > 0 ? (
          <ul>
            {accounts.map((account) => (
              <li
                key={account.id}
                className="mb-2 cursor-pointer p-2 rounded-md hover:bg-gradient-to-r from-gray-300"
                onClick={(e) => handleOnAccountClick(account.id)}
              >
                <div className="font-bold">{account.name}</div>
                <div>Balance: ${account.balance.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No accounts available.</div>
        )}
      </div>

      <div className="flex justify-center items-center mt-24">
        <Link
          to="/withdraw"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          relative="path"
        >
          Withdraw
        </Link>
        <div className="w-10"></div>
        <Link
          to="/deposit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          relative="path"
        >
          Deposit
        </Link>
      </div>
    </div>
  );
}
