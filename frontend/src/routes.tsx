import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { RequireLoginLayout } from "./pages/layouts/require-login";
import { Home } from "./pages/home";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireLoginLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}
