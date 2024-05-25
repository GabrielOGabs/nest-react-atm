import { useParams } from "react-router";
import { AVAILABLE_BILLS } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Link } from "react-router-dom";

interface MoneyBillProps {
  amount: number;
  quantity: number;
  color: string;
  borderColor: string;
}

export const GetMoney = () => {
  const { amount } = useParams();
  const [billsDispensed, setBillsDispensed] = useState<{
    [key: number]: number;
  }>({});
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(authContext?.getLoggedUser());

  useEffect(() => {
    const getBills = (value: number) => {
      let billsCalc: { [key: number]: number } = {};

      for (let bill of AVAILABLE_BILLS) {
        if (value >= bill) {
          billsCalc[bill] = Math.floor(value / bill);
          value -= billsCalc[bill] * bill;
        } else {
          billsCalc[bill] = 0;
        }
      }

      setBillsDispensed(billsCalc);
    };

    getBills(Number(amount));
  }, [amount]);

  const MoneyBill = ({
    amount,
    color,
    borderColor,
    quantity,
  }: MoneyBillProps) => {
    if (quantity === 0) return <></>;

    console.log(`Quantity ${amount}`, quantity);

    return (
      <div>
        <div
          className={`w-40 h-64 ${color} border-8 ${borderColor} text-white text-center flex items-center justify-center rounded-lg mb-4 shadow-lg`}
        >
          <span
            className={`text-2xl h-24 w-24 border-8 ${borderColor} font-bold border rounded-full flex justify-center items-center`}
          >
            {amount}
          </span>
        </div>
        <div className="flex justify-center text-lg font-extrabold">
          {quantity}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-4xl mb-8 self-center">
        Hey {user?.name}, here's your money
      </div>
      <div className="flex justify-around mt-24">
        <MoneyBill
          quantity={billsDispensed[100]}
          amount={100}
          color="bg-green-600"
          borderColor="border-green-300"
        />
        <MoneyBill
          quantity={billsDispensed[50]}
          amount={50}
          color="bg-blue-600"
          borderColor="border-blue-300"
        />
        <MoneyBill
          quantity={billsDispensed[20]}
          amount={20}
          color="bg-yellow-500"
          borderColor="border-yellow-200"
        />
        <MoneyBill
          quantity={billsDispensed[10]}
          amount={10}
          color="bg-red-500"
          borderColor="border-red-200"
        />
        <MoneyBill
          quantity={billsDispensed[5]}
          amount={5}
          color="bg-purple-600"
          borderColor="border-purple-300"
        />
        <MoneyBill
          quantity={billsDispensed[2]}
          amount={2}
          color="bg-teal-600"
          borderColor="border-teal-300"
        />
      </div>

      <Link
        to="/home"
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 w-96 text-center self-center mt-24"
      >
        Return to Home
      </Link>
    </div>
  );
};
