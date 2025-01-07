"use client";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserContext";


export default function HeaderLinks({ routes }: { routes: { path: string; label: string }[] }) {
    const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="flex gap-6">
        {isLoggedIn ? (
        routes.map((route) => (
            <Link
            key={route.path}
            href={route.path}
            className="font-fantasy text-lg hover:text-accent transition-colors duration-300 relative group"
            >
            {route.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
        ))
        ) : (
            <Link href="/auth" className="font-fantasy text-lg hover:text-accent transition-colors duration-300 relative group">
                Sign In
            </Link>
        )}
    </div>
  );
}
