// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("event-noter-user");
    const storedToken = localStorage.getItem("event-noter-token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("event-noter-user", JSON.stringify(user));
    localStorage.setItem("event-noter-token", token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("event-noter-user");
    localStorage.removeItem("event-noter-token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
