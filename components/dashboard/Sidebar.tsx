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
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home,          label: "Home",          href: "/"             },
  { icon: Calendar,      label: "Calendar",      href: "/calendar"     },
  { icon: Users,         label: "Patients",      href: "/patients"     },
  { icon: MessageSquare, label: "Messages",      href: "/messages"     },
  { icon: Bell,          label: "Notifications", href: "/notifications"},
];

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col z-50 shadow-sm",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-18" : "w-60"
      )}
    >
      {/* ── Top: Logo + Toggle ─────────────────────────── */}
      <div
        className={cn(
          "flex items-center py-4 border-b border-gray-100",
          collapsed ? "justify-center px-0" : "justify-between px-4"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 hover:bg-emerald-700 transition-colors">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-gray-800 text-sm truncate">Aushodam</span>
          )}
        </Link>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center",
            "text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors shrink-0",
            collapsed && "absolute -right-3.5 top-5 shadow-sm"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* ── Search bar ─────────────────────────────────── */}
      <div className={cn("px-3 py-3", collapsed && "flex justify-center")}>
        {collapsed ? (
          <button
            aria-label="Search"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        ) : (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9 text-sm bg-gray-50 border-gray-200 focus-visible:ring-emerald-500 rounded-xl"
            />
          </div>
        )}
      </div>

      {/* ── Nav label ──────────────────────────────────── */}
      {!collapsed && (
        <p className="px-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Menu
        </p>
      )}

      {/* ── Navigation links ───────────────────────────── */}
      <nav className="flex flex-col gap-0.5 flex-1 px-2 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                collapsed && "justify-center"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom section ─────────────────────────────── */}
      <div className="px-2 pb-4 space-y-0.5">
        <Separator className="mb-2" />

        {bottomNavItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
                collapsed && "justify-center"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600")} />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              )}
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {}}
          title={collapsed ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150",
            "text-gray-500 hover:text-red-600 hover:bg-red-50",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Profile section */}
        {!collapsed && (
          <>
            <Separator className="my-2" />
            <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-amber-400 text-white text-xs font-semibold">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">Dr. Ritika Sahu</p>
                <p className="text-[10px] text-gray-400 truncate">ritika@aushodam.in</p>
              </div>
            </div>
          </>
        )}

        {collapsed && (
          <div className="flex justify-center pt-1">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-amber-400 text-white text-xs font-semibold">
                RS
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </aside>
  );
}
