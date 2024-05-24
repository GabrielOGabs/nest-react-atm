import { createContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

type AccessToken = {
  sub: string;
  loggedUser: LoggedUser;
};

export type LoggedUser = {
  name: string;
  login: string;
};
interface AuthContextType {
  getLoggedUser: () => LoggedUser | undefined;
  handleLogin: (email: string, pin: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

const getTokenFromLocalStorage = (): AccessToken | null => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode<AccessToken>(token);
    return decodedToken;
  }

  return null;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(getTokenFromLocalStorage());

  useEffect(() => {
    if (!token) {
      setToken(getTokenFromLocalStorage());
    }
  }, [token]);

  const handleLogin = async (login: string, pin: string): Promise<boolean> => {
    try {
      const response = await api.post("auth/authorize", {
        login,
        pin,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      return true;
    } catch (error) {
      console.error("Login failed", error);
      //TODO: Implement a toast to give user feedback
      return false;
    }
  };

  const logout = () => {
    removeTokenFromLocalStorage();
    setToken(null);
  };

  const isLoggedIn = () => {
    if (!token) {
      return !!getTokenFromLocalStorage();
    }

    return !!token;
  };

  const getLoggedUser = () => {
    return token?.loggedUser;
  };

  return (
    <AuthContext.Provider
      value={{ getLoggedUser, handleLogin, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
