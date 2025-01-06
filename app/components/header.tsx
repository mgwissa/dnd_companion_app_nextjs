import Link from "next/link";

// Define your routes
const routes = [
  { path: "/", label: "Tavern" },
  { path: "/notes", label: "Quest Log" },
  { path: "/backstory", label: "Chronicles" },
  { path: "/next", label: "Arcane Docs" },
];

export default function Header() {
  return (
    <header className="p-4 bg-background/80 border-b-2 border-primary/30 shadow-lg">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-medieval text-2xl text-primary">D&D Companion</h1>
          <div className="flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="font-fantasy text-lg hover:text-accent transition-colors duration-300 relative group"
              >
                {route.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
