"use client";
import { Gamepad2, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/personajes", label: "Personajes", icon: Users },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-bold text-white">
        <Gamepad2 className="w-6 h-6 text-emerald-400" />
        <span className="text-lg">GamingHub</span>
      </div>

      <div className="flex items-center gap-6">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 text-sm md:text-base ${
              pathname === href
                ? "text-emerald-400 font-bold border-b-2 border-emerald-400 pb-1"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;