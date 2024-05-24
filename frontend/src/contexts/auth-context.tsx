import { createContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

type AccessToken = {
  sub: string;
  loggedUser: LoggedUser;
};

type LoggedUser = {
  name: string;
  login: string;
};
interface AuthContextType {
  user: LoggedUser | null;
  handleLogin: (email: string, pin: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedUser | null>(null);

  const handleLogin = async (login: string, pin: string): Promise<boolean> => {
    try {
      const response = await api.post("auth/authorize", {
        login,
        pin,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode<AccessToken>(token);
      setUser(decodedToken.loggedUser);

      return true;
    } catch (error) {
      console.error("Login failed", error);
      //TODO: Implement a toast to give user feedback
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = () => {
    if (user) return true;

    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<AccessToken>(token);
      setUser(decodedToken.loggedUser);
    }

    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
