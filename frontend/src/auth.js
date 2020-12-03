// Hook (use-auth.js)

import React, { useState, useContext, createContext } from "react";
import auth from "./api/session";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...

// ... available to any child component that calls useAuth().

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...

// ... and re-render when it changes.

export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state

function useProvideAuth() {
  const [token, setToken] = useState("");

  const signin = async (username, password) => {
    const token = await auth(username, password);
    setToken(token);
    return token;
  };

  const signout = () => setToken("");

  // Return the user object and auth methods

  return {
    token,
    signin,
    signout,
  };
}
