import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "taxpayer" | "officer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "taxpayer" | "officer") => boolean;
  signup: (email: string, name: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: "taxpayer" | "officer") => {
    // Mock auth — officer uses admin@mor.gov.et / admin123
    if (role === "officer") {
      if (email === "admin@mor.gov.et" && password === "admin123") {
        setUser({ id: "officer-1", email, name: "Registration Officer", role: "officer" });
        return true;
      }
      return false;
    }
    // Taxpayer — accept any non-empty credentials
    if (email && password) {
      setUser({ id: `tp-${Date.now()}`, email, name: email.split("@")[0].toUpperCase(), role: "taxpayer" });
      return true;
    }
    return false;
  };

  const signup = (email: string, name: string, password: string) => {
    if (email && name && password) {
      setUser({ id: `tp-${Date.now()}`, email, name: name.toUpperCase(), role: "taxpayer" });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
