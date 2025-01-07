"use client";

import { createContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
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

  useEffect(() => {
    // This listener will fire whenever auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          email: firebaseUser.email || "",
          uid: firebaseUser.uid,
          isLoggedIn: true,
        });
        setIsLoggedIn(true);
        Cookies.set("isLoggedIn", "true", { expires: 7 });
      } else {
        // User is signed out
        setUser(null);
        setIsLoggedIn(false);
        Cookies.remove("isLoggedIn");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      Cookies.remove("isLoggedIn");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn: handleLogout,
        handleLogout,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
