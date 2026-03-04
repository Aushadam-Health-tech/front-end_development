"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, Share2, ChevronDown, CalendarDays } from "lucide-react";
import { mockDates } from "@/data/mockData";

export default function Header() {
  const todayIndex = mockDates.indexOf("Jun 24, 2022");
  const [dateIndex, setDateIndex] = useState(todayIndex >= 0 ? todayIndex : 0);

  const currentDate = mockDates[dateIndex];
  const isToday = dateIndex === todayIndex;

  function prev() {
    setDateIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setDateIndex((i) => Math.min(mockDates.length - 1, i + 1));
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Left: Doctor Info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-11 h-11 border-2 border-emerald-200">
          <AvatarImage src="/doctor-avatar.jpg" alt="Dr. Ritika Sahu" />
          <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">
            RS
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-gray-500">Welcome back,</p>
          <h1 className="text-lg font-bold text-gray-800">Hi! Dr. Ritika Sahu</h1>
        </div>
      </div>

      {/* Right: Date Navigator + Invite */}
      <div className="flex items-center gap-3">
        {/* Date Navigator */}
        <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-gray-700"
            disabled={dateIndex === 0}
            onClick={prev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 px-2 text-sm font-medium text-gray-700 gap-1 hover:bg-transparent"
              >
                <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                {currentDate}
                {isToday && (
                  <span className="text-emerald-600 font-semibold ml-1">Today</span>
                )}
                <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                Select Date
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockDates.map((date, i) => (
                <DropdownMenuItem
                  key={date}
                  className={dateIndex === i ? "font-semibold text-emerald-700 bg-emerald-50" : ""}
                  onClick={() => setDateIndex(i)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{date}</span>
                    {i === todayIndex && (
                      <span className="text-[10px] text-emerald-600 bg-emerald-100 rounded px-1 font-semibold">
                        Today
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-gray-700"
            disabled={dateIndex === mockDates.length - 1}
            onClick={next}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Invite Button */}
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 px-4">
          <Share2 className="w-4 h-4" />
          Invite
        </Button>
      </div>
    </header>
  );
}
