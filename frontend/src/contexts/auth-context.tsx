import { createContext, useState, ReactNode } from "react";
import api from "../services/api";

interface AuthContextType {
  user: string | null;
  handleLogin: (email: string, pin: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = async (login: string, pin: string): Promise<boolean> => {
    try {
      const response = await api.post("auth/authorize", {
        login,
        pin,
      });
      const token = response.data.access_token;

      localStorage.setItem("token", token);

      setUser(login);
      console.log("User logged in");
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    }

    return false; //!!localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
