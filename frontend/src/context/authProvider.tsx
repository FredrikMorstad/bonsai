import React, { useState, useEffect, createContext } from "react";
import { verifyAuthentication } from "api/auth";

export const AuthenticateContext = createContext({
  authenticated: false,
  setAuthenticated: (authenticated: boolean) => {},
  isValidating: true,
});

const AuthenticateProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [isValidating, setValidating] = useState(true);

  const isAuth = async () => {
    setValidating(true);
    const auth = await verifyAuthentication();
    // console.log("auth : ", auth);
    setAuthenticated(auth);
    setValidating(false);
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{ authenticated, setAuthenticated, isValidating }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateProvider;
