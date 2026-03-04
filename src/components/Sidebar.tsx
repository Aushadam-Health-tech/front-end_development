"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Users,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Home, label: "Home", href: "/" },
  { icon: CalendarDays, label: "Appointments", href: "/appointments" },
  { icon: Users, label: "Patients", href: "/patients", hasChildren: true },
  { icon: CalendarDays, label: "Calendar", href: "/calendar" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 ease-in-out z-50 relative",
        expanded ? "w-60" : "w-16"
      )}
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100">
        {expanded ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-teal-600 rounded-md flex items-center justify-center flex-shrink-0">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-teal-700 font-bold text-sm tracking-wide">AUSHADHAM</span>
              <span className="text-gray-400 text-[10px]">Hospital or clinic Name</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-teal-600 rounded-md flex items-center justify-center mx-auto">
            <Plus className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-center h-12 w-full text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search (only when expanded) */}
      {expanded && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            />
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group",
              item.active
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
            )}
          >
            <item.icon className={cn("w-5 h-5 flex-shrink-0", item.active ? "text-white" : "text-gray-500 group-hover:text-teal-600")} />
            {expanded && (
              <span className="flex-1 whitespace-nowrap overflow-hidden">{item.label}</span>
            )}
            {expanded && item.hasChildren && (
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom: User profile */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        {expanded ? (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              RS
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">Dr. Ritika Shah</p>
              <span className="text-[10px] bg-amber-400 text-white px-1.5 py-0.5 rounded font-medium">Admin</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white font-semibold text-sm">
              RS
            </div>
          </div>
        )}

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          <Settings className="w-5 h-5 flex-shrink-0 text-gray-500" />
          {expanded && <span>Settings</span>}
        </Link>

        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {expanded && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
