"use client";

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface UserContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextInterface>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleLogout: () => {},
  user: null,
  setUser: () => {},
});

export type User = {
  email: string;
  uid: string;
  isLoggedIn: boolean;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load initial state from cookie
  useEffect(() => {
    const loginState = Cookies.get("isLoggedIn");
    if (loginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Update cookie when login state changes
  const handleSetIsLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
    Cookies.set("isLoggedIn", value.toString(), { expires: 7 }); // Cookie expires in 7 days
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("isLoggedIn");
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn: handleSetIsLoggedIn,
        handleLogout,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
