import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { AuthRequired } from "./pages/layouts/require-login";
import { Home } from "./pages/home";
import { Withdraw } from "./pages/withdraw";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/">
        <Route index path="/login" element={<Login />} />

        <Route path="/app" element={<AuthRequired />}>
          <Route path="home" element={<Home />} />
          <Route path="withdraw" element={<Withdraw />} />
        </Route>
      </Route>
    </Routes>
  );
}
