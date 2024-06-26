import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { AuthRequired } from "./pages/layouts/require-login";
import { Home } from "./pages/home";
import { Withdraw } from "./pages/withdraw";
import { Deposit } from "./pages/deposit";
import { Transactions } from "./pages/account";
import { NotFound } from "./pages/not-found";
import { GetMoney } from "./pages/get-money";

export function AppRouter() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />

      <Route path="/" element={<AuthRequired />}>
        <Route path="home" element={<Home />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="accounts/:accountId" element={<Transactions />} />
        <Route path="getmoney/:amount" element={<GetMoney />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
