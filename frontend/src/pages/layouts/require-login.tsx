import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../contexts/auth-context";
import { useContext } from "react";

export function AuthRequired() {
  const authContext = useContext(AuthContext);

  if (!authContext?.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
