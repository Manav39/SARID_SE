// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  return (
    <AuthContext.Provider
      value={{ userName, setUserName, email, setEmail, role, setRole, isApproved, setIsApproved, waitingForConfirmation, setWaitingForConfirmation }}
    >
      {children}
    </AuthContext.Provider>
  );
};
