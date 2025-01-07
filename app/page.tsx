"use client";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export default function Home() {
  const { isLoggedIn, user } = useContext(UserContext);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Your D&D Campaign Hub</h1>
        <p className="text-lg mb-8">
          Your one-stop destination for managing and exploring your D&D campaign. Access your notes,
          character details, and campaign resources all in one place.
        </p>
        <div className="space-y-4">
          {isLoggedIn ? (
            <p>Welcome back, {user?.email}</p>
          ) : (
            <Link href="/auth" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
