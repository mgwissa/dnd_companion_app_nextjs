"use client";

import { auth } from "../lib/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function AuthPage() {
  const { handleLogout, setUser, user } = useContext(UserContext);
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      setUser({
        email: result.user.email || "",
        uid: result.user.uid || "",
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-medieval text-accent mb-6 text-center">
          Adventure Awaits
        </h1>
        {user?.isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-100 transition-colors"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={16}
              height={16}
            />
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
