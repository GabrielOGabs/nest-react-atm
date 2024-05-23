import { createContext, useState, ReactNode } from "react";
import api from "../services/api";

interface AuthContextType {
  user: string | null;
  handleLogin: (email: string, pin: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = async (login: string, pin: string) => {
    try {
      const response = await api.post("auth/authorize", {
        login,
        pin,
      });
      const token = response.data.access_token;

      localStorage.setItem("token", token);

      setUser(login);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
