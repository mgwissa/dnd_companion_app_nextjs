import Link from "next/link";
import HeaderLinks from "./HeaderLinks";

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
          <HeaderLinks routes={routes} />
        </div>
      </nav>
    </header>
  );
}
