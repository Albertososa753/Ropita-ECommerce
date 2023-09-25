import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoggedError, setIsLoggedError] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 201) {
        setIsRegisterError(false);
      }
    } catch (error) {
      setIsRegisterError(true);
      console.log(error);
      return;
    }
    return true;
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      console.log(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));

      setIsLoggedError(false);
    } catch (error) {
      setIsLoggedError(true);
      console.log(error);
      return;
    }
    return true;
  };
  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("cartItems");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isRegisterError,
        isLoggedError,
        singup,
        singin,
        user,
        isAuthenticated,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
