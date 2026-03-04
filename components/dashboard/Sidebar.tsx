"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home,         label: "Home",          href: "/" },
  { icon: Calendar,     label: "Calendar",       href: "/calendar" },
  { icon: Users,        label: "Patients",       href: "/users" },
  { icon: MessageSquare,label: "Messages",       href: "/messages" },
  { icon: Bell,         label: "Notifications",  href: "/notifications" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-100 flex flex-col items-center py-4 z-50 shadow-sm">
      {/* Logo — links back to home */}
      <Link href="/" aria-label="Go to Home" className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center hover:bg-emerald-700 transition-colors">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
      </Link>

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col items-center gap-1">
        {bottomItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
        {/* Logout — no navigation, just a visual button */}
        <button
          aria-label="Logout"
          title="Logout"
          onClick={() => console.log("[Dashboard] Logout clicked")}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
