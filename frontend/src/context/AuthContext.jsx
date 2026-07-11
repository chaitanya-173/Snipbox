import { createContext, useContext, useState } from "react";
import { getSession, loginUser, logoutUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const login = async (credentials) => {
    const session = loginUser(credentials);
    setUser(session);
    return session;
  };

  const register = async (details) => {
    const session = registerUser(details);
    setUser(session);
    return session;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}