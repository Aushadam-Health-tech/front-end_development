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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="w-full h-12 rounded-none text-gray-500 hover:text-teal-600 hover:bg-teal-100"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </Button>
        </TooltipTrigger>
        {!expanded && <TooltipContent side="right">Toggle menu</TooltipContent>}
      </Tooltip>

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
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  item.active
                    ? "bg-teal-600 text-white shadow-sm shadow-teal-200"
                    : "text-gray-600 hover:bg-teal-100 hover:text-teal-700 hover:shadow-sm hover:shadow-teal-100"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    item.active ? "text-white" : "text-gray-400 group-hover:text-teal-600"
                  )}
                />
                {expanded && (
                  <span className="flex-1 whitespace-nowrap overflow-hidden">{item.label}</span>
                )}
                {expanded && item.hasChildren && (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>

      {/* Bottom: User profile */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        {expanded ? (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <Avatar className="w-9 h-9 flex-shrink-0">
              <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">Dr. Ritika Shah</p>
              <Badge className="text-[10px] bg-amber-400 hover:bg-amber-400 text-white px-1.5 py-0.5 rounded font-medium">Admin</Badge>
            </div>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center py-1 cursor-pointer">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Dr. Ritika Shah</TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-teal-100 hover:text-teal-700 transition-all duration-200 group"
            >
              <Settings className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-teal-600 transition-transform duration-200 group-hover:scale-110" />
              {expanded && <span>Settings</span>}
            </Link>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-3 rounded-xl px-3 py-2 h-auto text-sm text-red-400 hover:bg-red-50 hover:text-red-600 w-full group"
            >
              <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
              {expanded && <span>Log out</span>}
            </Button>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Log out</TooltipContent>}
        </Tooltip>
      </div>
    </aside>
  );
}
