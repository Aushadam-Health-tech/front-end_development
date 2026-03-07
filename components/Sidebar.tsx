"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  ClipboardList,
  Users,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * AushodamLogo — two teardrop halves meeting at inner tips
 *
 * viewBox 0 0 500 400
 * Tips touch at (250, 140).
 *
 * LEFT  teardrop: tip upper-right → fat rounded bulb lower-left. Solid teal.
 * RIGHT teardrop: tip upper-left  → fat rounded bulb lower-right. Grey outline.
 *
 * Each teardrop = two straight edges from tip + large arc connecting them.
 * Arc r=190, sweeps ~112° around the outside.
 *
 * 5 icon circles float above the meeting point.
 */
function AushodamLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aushodam logo"
    >
      {/* ── LEFT teardrop: solid teal ── */}
      {/* tip(250,140) → upper-left(70,60) → arc bulging left → lower(120,370) → back to tip */}
      <path
        d="M 250,140 L 70,60 A 190,190 0 0 1 120,370 Z"
        fill="#2C7F73"
      />

      {/* ── RIGHT teardrop: grey outline only (mirror) ── */}
      <path
        d="M 250,140 L 430,60 A 190,190 0 0 0 380,370 Z"
        fill="none"
        stroke="#6F7C76"
        strokeWidth="14"
        strokeLinejoin="round"
      />

      {/* ══ 1 – Mortar & Pestle  (top center: 250, 18) ══ */}
      <circle cx="250" cy="18" r="18" fill="#2C7F73" />
      <line x1="243" y1="9" x2="257" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="250" y1="9" x2="250" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="240" y1="19" x2="260" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M 241,19 L 240,25 Q 250,30 260,25 L 259,19" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round" />

      {/* ══ 2 – Stethoscope  (left: 202, 58) ══ */}
      <circle cx="202" cy="58" r="16" fill="#2C7F73" />
      <line x1="196" y1="49" x2="195" y2="53" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="208" y1="49" x2="209" y2="53" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 195,53 Q 193,59 197,63 Q 201,68 206,67 Q 211,66 212,60 Q 212,55 209,53"
        fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="209" cy="52" r="3" stroke="white" strokeWidth="1.5" fill="none" />

      {/* ══ 3 – Microscope  (right: 298, 58) ══ */}
      <circle cx="298" cy="58" r="16" fill="#2C7F73" />
      <line x1="291" y1="68" x2="305" y2="68" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="298" y1="68" x2="298" y2="51" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="298" y1="57" x2="305" y2="57" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="305" y1="57" x2="305" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="302" y1="50" x2="308" y2="50" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="292" y1="62" x2="304" y2="62" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* ══ 4 – Ambulance  (center: 250, 95) ══ */}
      <circle cx="250" cy="95" r="15" fill="#2C7F73" />
      <rect x="240" y="89" width="20" height="10" rx="2" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="245" cy="99.5" r="2.2" fill="white" />
      <circle cx="255" cy="99.5" r="2.2" fill="white" />
      <line x1="250" y1="91" x2="250" y2="97" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="247" y1="94" x2="253" y2="94" stroke="white" strokeWidth="1.4" strokeLinecap="round" />

      {/* ══ 5 – Pill  (just above tip: 250, 128) ══ */}
      <circle cx="250" cy="128" r="13" fill="#2C7F73" />
      <rect x="239" y="124" width="22" height="9" rx="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <line x1="250" y1="124" x2="250" y2="133" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",     href: "/dashboard"     },
  { icon: Home,             label: "Home",          href: "/home"          },
  { icon: ClipboardList,    label: "Appointments",  href: "/appointments"  },
  { icon: Users,            label: "Patients",      href: "/patients",     hasChildren: true },
  { icon: CalendarDays,     label: "Calendar",      href: "/calendar"      },
  { icon: Bell,             label: "Notifications", href: "/notifications" },
  { icon: MessageSquare,    label: "Messages",      href: "/messages"      },
];

const pranjalNavItems = [
  { icon: LayoutDashboard, label: "Pranjal Dashboard", href: "/pranjal"           },
  { icon: CalendarDays,     label: "Pranjal Calendar",  href: "/pranjal/calendar" },
  { icon: Users,            label: "Pranjal Patients",  href: "/pranjal/patients" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

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
            <AushodamLogo className="w-10 h-auto shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-teal-700 font-bold text-sm tracking-widest">AUSHODAM</span>
              <span className="text-gray-400 text-[10px]">Hospital or clinic Name</span>
            </div>
          </div>
        ) : (
          <AushodamLogo className="w-9 h-auto mx-auto" />
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
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-teal-600 text-white shadow-sm shadow-teal-200"
                    : "text-gray-600 hover:bg-teal-100 hover:text-teal-700 hover:shadow-sm hover:shadow-teal-100"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-teal-600"
                  )}
                />
                {expanded && (
                  <span className="flex-1 whitespace-nowrap overflow-hidden">{item.label}</span>
                )}
                {expanded && item.hasChildren && (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
          );
        })}

        {/* Separator */}
        {expanded && <div className="my-2 px-3"><div className="h-px bg-gray-200" /></div>}
        {!expanded && <div className="my-2 px-2"><div className="h-px bg-gray-200" /></div>}

        {/* Pranjal Nav Items */}
        {pranjalNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-purple-600 text-white shadow-sm shadow-purple-200"
                    : "text-gray-600 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm hover:shadow-purple-100"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-purple-600"
                  )}
                />
                {expanded && (
                  <span className="flex-1 whitespace-nowrap overflow-hidden">{item.label}</span>
                )}
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
          );
        })}
      </nav>

      {/* Bottom: User profile */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        {expanded ? (
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <Avatar className="w-9 h-9 shrink-0">
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
              <Settings className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-teal-600 transition-transform duration-200 group-hover:scale-110" />
              {expanded && <span>Settings</span>}
            </Link>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/logout"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              {expanded && <span>Log out</span>}
            </Link>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Log out</TooltipContent>}
        </Tooltip>
      </div>
    </aside>
  );
}
