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
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

/**
 * AushodamLogo
 * Two teardrops meeting at tip:
 *   LEFT  — solid teal, rounded arc on left side
 *   RIGHT — white fill, grey stroke, mirror arc on right side
 * 5 teal icon circles stacked in diamond above the tip
 */
function AushodamLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 445"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Aushadham logo"
    >
      {/* LEFT teardrop — solid teal
          Tip at (230,185), upper-left at (115,70), lower-left at (115,415)
          Arc: rx=110 ry=185, small arc, CCW → curves left */}
      <path d="M 230,185 L 115,70 A 110,185 0 0 0 115,415 Z" fill="#2C7F73" />

      {/* RIGHT teardrop — white fill, grey outline, mirror of left */}
      <path
        d="M 230,185 L 345,70 A 110,185 0 0 1 345,415 Z"
        fill="white"
        stroke="#7A8C86"
        strokeWidth="13"
        strokeLinejoin="round"
      />

      {/* ── 1. Mortar & Pestle — top center (230, 26) ── */}
      <circle cx="230" cy="26" r="22" fill="#2C7F73" />
      <line x1="222" y1="16" x2="238" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="230" y1="16" x2="230" y2="26" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="220" y1="26" x2="240" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 221,26 L 219,33 Q 230,39 241,33 L 239,26" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round" />

      {/* ── 2. Stethoscope — upper left (178, 76) ── */}
      <circle cx="178" cy="76" r="20" fill="#2C7F73" />
      <line x1="171" y1="65" x2="170" y2="71" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="185" y1="65" x2="186" y2="71" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 170,71 Q 167,80 173,86 Q 179,91 185,89 Q 191,87 191,79 Q 191,72 186,71"
        fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="191" cy="70" r="3.5" stroke="white" strokeWidth="2" fill="none" />

      {/* ── 3. Microscope — upper right (282, 76) ── */}
      <circle cx="282" cy="76" r="20" fill="#2C7F73" />
      <line x1="275" y1="88" x2="291" y2="88" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="282" y1="88" x2="282" y2="67" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="282" y1="76" x2="291" y2="76" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="291" y1="76" x2="291" y2="67" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="287" y1="67" x2="295" y2="67" stroke="white" strokeWidth="2" strokeLinecap="round" />

      {/* ── 4. Ambulance — center (230, 122) ── */}
      <circle cx="230" cy="122" r="20" fill="#2C7F73" />
      <rect x="218" y="114" width="24" height="14" rx="3" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="223" cy="128.5" r="2.8" fill="white" />
      <circle cx="237" cy="128.5" r="2.8" fill="white" />
      <line x1="230" y1="116" x2="230" y2="125" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="225" y1="120.5" x2="235" y2="120.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* ── 5. Pill — just above tip (230, 165) ── */}
      <circle cx="230" cy="165" r="16" fill="#2C7F73" />
      <rect x="218" y="160" width="24" height="11" rx="5.5" stroke="white" strokeWidth="2.2" fill="none" />
      <line x1="230" y1="160" x2="230" y2="171" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
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



export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const open  = () => setExpanded(true);
  const close = () => setExpanded(false);
  const toggle = (e: React.MouseEvent) => { e.stopPropagation(); setExpanded(v => !v); };

  // Close sidebar and stop click from bubbling up to the aside's open() handler
  const handleNavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(false);
  };

  return (
    <>
      {/* Dim backdrop — fades in/out smoothly */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] transition-all duration-300",
          expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        onClick={!expanded ? open : undefined}
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col z-50 shadow-sm",
          "transition-[width] duration-300 ease-in-out",
          expanded ? "w-60 cursor-default" : "w-20 cursor-pointer"
        )}
      >
        {/* Logo / Brand */}
        <div className="flex items-center h-16 px-4 border-b border-gray-100 overflow-hidden">
          <AushodamLogo className={cn("shrink-0 transition-all duration-300", expanded ? "w-10" : "w-9 mx-auto")} />
          <div className={cn(
            "flex flex-col leading-tight ml-2 transition-all duration-300 overflow-hidden whitespace-nowrap",
            expanded ? "opacity-100 max-w-[160px]" : "opacity-0 max-w-0"
          )}>
            <span className="text-teal-700 font-bold text-base tracking-widest">AUSHADHAM</span>
            <span className="text-teal-600 text-[10px] tracking-wide">Hospital or clinic Name</span>
          </div>
        </div>

        {/* Toggle button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="w-full h-12 rounded-none text-gray-500 hover:text-teal-600 hover:bg-teal-100"
              aria-label="Toggle sidebar"
            >
              <Menu className={cn(
              "w-5 h-5 transition-transform duration-300",
              expanded ? "rotate-90" : "rotate-0"
            )} />
            </Button>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Toggle menu</TooltipContent>}
        </Tooltip>

        {/* Search — fades in when expanded */}
        <div className={cn(
          "px-3 pb-2 overflow-hidden transition-all duration-300",
          expanded ? "opacity-100 max-h-16" : "opacity-0 max-h-0 pb-0"
        )}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search"
              className="pl-8 h-8 text-sm bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-teal-300 rounded-lg"
            />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 group",
                    expanded ? "justify-start px-3" : "justify-center px-4",
                    isActive
                      ? "bg-teal-600 text-white shadow-sm shadow-teal-200"
                      : "text-gray-600 hover:bg-teal-100 hover:text-teal-700 hover:shadow-sm hover:shadow-teal-100"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-[22px] h-[22px] shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-teal-600"
                    )}
                  />
                  <span className={cn(
                    "flex-1 whitespace-nowrap overflow-hidden transition-all duration-300",
                    expanded ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                  )}>
                    {item.label}
                  </span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 shrink-0 transition-all duration-300",
                    item.hasChildren && expanded ? "opacity-100 max-w-full" : "opacity-0 max-w-0 overflow-hidden"
                  )} />
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
        <div className="p-3 space-y-1">
          <Separator className="mb-3" />
          {/* Avatar row — always rendered, text fades */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 px-2 py-2 mb-1 overflow-hidden">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
                </Avatar>
                <div className={cn(
                  "overflow-hidden transition-all duration-300 whitespace-nowrap",
                  expanded ? "opacity-100 max-w-[140px]" : "opacity-0 max-w-0"
                )}>
                  <p className="text-sm font-medium text-gray-800 truncate">Dr. Ritika Shah</p>
                  <Badge className="text-[10px] bg-amber-400 hover:bg-amber-400 text-white px-1.5 py-0.5 rounded font-medium">Admin</Badge>
                </div>
              </div>
            </TooltipTrigger>
            {!expanded && <TooltipContent side="right">Dr. Ritika Shah</TooltipContent>}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl py-2 text-sm text-gray-600 hover:bg-teal-100 hover:text-teal-700 transition-all duration-200 group",
                  expanded ? "justify-start px-3" : "justify-center px-4"
                )}
              >
                <Settings className="w-[22px] h-[22px] shrink-0 text-gray-400 group-hover:text-teal-600 transition-transform duration-200 group-hover:scale-110" />
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  expanded ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                )}>Settings</span>
              </Link>
            </TooltipTrigger>
            {!expanded && <TooltipContent side="right">Settings</TooltipContent>}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/logout"
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl py-2 text-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group",
                  expanded ? "justify-start px-3" : "justify-center px-4"
                )}
              >
                <LogOut className="w-[22px] h-[22px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  expanded ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                )}>Log out</span>
              </Link>
            </TooltipTrigger>
            {!expanded && <TooltipContent side="right">Log out</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </>
  );
}
