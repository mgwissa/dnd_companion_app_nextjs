import Link from "next/link";

// Define your routes
const routes = [
  { path: "/", label: "Home" },
  { path: "/notes", label: "Notes" },
  { path: "/backstory", label: "Backstory" },
  { path: "/next", label: "NextJS Docs" },
];

export default function Header() {
  return (
    <header className="p-4 bg-background border-b border-foreground/10">
      <nav className="flex gap-4">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="hover:text-foreground/70 transition-colors"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
