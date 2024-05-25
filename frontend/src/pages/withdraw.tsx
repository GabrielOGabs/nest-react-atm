import { useEffect, useState, ChangeEvent } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

interface Account {
  id: string;
  name: string;
  balance: number;
}

const AVAILABLE_BILLS = [100, 50, 20, 10, 5, 2];

export function Withdraw() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  };

  const handleConfirmClick = async () => {
    if (!selectedAccount) {
      //TODO Return a toast
      alert("Select an Account");
      return;
    }

    if (selectedAccount.balance < amount) {
      alert("Not enough Balance");
      return;
    }

    const isAvailable = checkWithDrawAvailability(amount);
    if (!isAvailable) {
      alert(
        "It is not possible to withdraw this amount with the available bills"
      );
      return;
    }

    const response = await api.post(`accounts/${selectedAccount.id}/withdraw`, {
      amount,
    });

    if (response.data) {
      alert("Withdrawal performed");
      fetchAccounts();
      setAmount(0);
    }
  };

  const handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAccountId = event.target.value;

    if (selectedAccountId) {
      const targetAccount = accounts.find((x) => x.id === selectedAccountId);

      if (targetAccount) {
        setSelectedAccount(targetAccount);
        return;
      }
    }

    setSelectedAccount(undefined);
  };

  const handleAmountChange = (value: number) => {
    if (value < 0) value = 0;
    setAmount(Math.floor(value));
  };

  const checkWithDrawAvailability = (value: number) => {
    for (let bill of AVAILABLE_BILLS) {
      if (value >= bill) {
        value -= bill * Math.floor(value / bill);
      }
    }
    return value === 0;
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-24">
        <div className="flex flex-col justify-center">
          <label className="text-lg font-bold">Withdraw from: </label>

          <select
            id="my-select"
            value={selectedAccount?.id}
            onChange={handleAccountChange}
            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
          >
            <option value={undefined}>Select an option</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {`${account.name} => $${account.balance.toFixed(2)}`}
              </option>
            ))}
          </select>

          <label className="text-lg font-bold">Amount: </label>
          <input
            type="number"
            id="amount"
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={amount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link
          to="/home"
          className="bg-red-500 hover:bg-red-700 text-red-950 font-bold py-2 px-4 rounded w-[200px] h-[200px] flex justify-center items-center"
        >
          Cancel
        </Link>

        <div className="w-10"></div>

        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-green-950 font-bold py-2 px-4 rounded w-[200px] h-[200px]"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
