import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoginContextType {
  login: Boolean;
  toggleLogin: () => void;
}
const LoginContext = createContext<LoginContextType | undefined>(undefined);
export const useLoginButton = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a ThemeProvider");
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [login, setLogin] = useState(false);

  const toggleLogin = () => {
    setLogin((prevToggle) => !prevToggle);
  };

  const value: LoginContextType = {
    login,
    toggleLogin,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
