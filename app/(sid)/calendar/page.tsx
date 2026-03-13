"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  CalendarDays,
  Wifi,
  WifiOff,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "Daily" | "Weekly" | "Monthly";
type Location = "Clinic A" | "Clinic B" | "Clinic C" | "Leave";
type PatientFilter = "Online" | "Offline" | "Subscribed";

interface CalEvent {
  id: number;
  /** ISO date string: "2026-03-09" */
  date: string;
  /** "09:00" */
  startTime: string;
  endTime: string;
  patient: string;
  location: Location;
  isOnline: boolean;
  isSubscribed: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const EVENTS: CalEvent[] = [
  // Week of Mar 2–8 (and a few in March around today Mar 9, 2026)
  { id:  1, date: "2026-03-02", startTime: "09:00", endTime: "09:30", patient: "Rohan Mehra",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id:  2, date: "2026-03-02", startTime: "09:30", endTime: "10:00", patient: "Dasha Shah",      location: "Clinic A", isOnline: true,  isSubscribed: true  },
  { id:  3, date: "2026-03-02", startTime: "10:00", endTime: "10:30", patient: "Laxmi Iyer",      location: "Clinic A", isOnline: false, isSubscribed: false },
  { id:  4, date: "2026-03-02", startTime: "10:30", endTime: "11:00", patient: "Akash Reddy",     location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id:  5, date: "2026-03-02", startTime: "11:00", endTime: "12:00", patient: "Nupur Baghva",    location: "Clinic B", isOnline: false, isSubscribed: true  },

  { id:  6, date: "2026-03-03", startTime: "09:00", endTime: "09:30", patient: "Payal Singh",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id:  7, date: "2026-03-03", startTime: "09:30", endTime: "10:00", patient: "Vibha M",         location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id:  8, date: "2026-03-03", startTime: "10:30", endTime: "11:00", patient: "Rupesh Mishra",   location: "Clinic A", isOnline: false, isSubscribed: true  },
  { id:  9, date: "2026-03-03", startTime: "13:00", endTime: "14:00", patient: "Swati Naidu",     location: "Clinic C", isOnline: true,  isSubscribed: false },

  { id: 10, date: "2026-03-04", startTime: "09:00", endTime: "09:45", patient: "Kalyani Rao",     location: "Clinic A", isOnline: false, isSubscribed: true  },
  { id: 11, date: "2026-03-04", startTime: "10:00", endTime: "10:30", patient: "Radhika Iyer",    location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id: 12, date: "2026-03-04", startTime: "11:00", endTime: "11:30", patient: "Anjali Verma",    location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 13, date: "2026-03-04", startTime: "14:00", endTime: "15:00", patient: "Nikhil Sharma",   location: "Clinic C", isOnline: false, isSubscribed: true  },

  { id: 14, date: "2026-03-05", startTime: "09:00", endTime: "09:30", patient: "Suresh Menon",    location: "Clinic B", isOnline: false, isSubscribed: false },
  { id: 15, date: "2026-03-05", startTime: "09:30", endTime: "10:00", patient: "Priya Nair",      location: "Clinic A", isOnline: true,  isSubscribed: true  },
  { id: 16, date: "2026-03-05", startTime: "10:00", endTime: "10:30", patient: "Ramya Reddy",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 17, date: "2026-03-05", startTime: "13:00", endTime: "14:00", patient: "Rohan Mehra",     location: "Clinic C", isOnline: true,  isSubscribed: false },
  { id: 18, date: "2026-03-05", startTime: "14:30", endTime: "15:00", patient: "Dasha Shah",      location: "Clinic B", isOnline: false, isSubscribed: true  },
  { id: 19, date: "2026-03-05", startTime: "15:30", endTime: "16:00", patient: "Laxmi Iyer",      location: "Clinic A", isOnline: true,  isSubscribed: true  },

  { id: 20, date: "2026-03-06", startTime: "09:00", endTime: "09:30", patient: "Akash Reddy",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 21, date: "2026-03-06", startTime: "10:00", endTime: "10:30", patient: "Nupur Baghva",    location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id: 22, date: "2026-03-06", startTime: "13:00", endTime: "14:00", patient: "Payal Singh",     location: "Clinic B", isOnline: false, isSubscribed: true  },

  // Friday Mar 7 — Leave
  { id: 23, date: "2026-03-07", startTime: "09:00", endTime: "17:00", patient: "—",               location: "Leave",    isOnline: false, isSubscribed: false },

  { id: 24, date: "2026-03-08", startTime: "09:00", endTime: "09:30", patient: "Vibha M",         location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 25, date: "2026-03-08", startTime: "10:00", endTime: "10:30", patient: "Rupesh Mishra",   location: "Clinic B", isOnline: true,  isSubscribed: true  },
  { id: 26, date: "2026-03-08", startTime: "13:30", endTime: "14:00", patient: "Kalyani Rao",     location: "Clinic A", isOnline: false, isSubscribed: true  },

  // Current week  Mar 9–15
  { id: 27, date: "2026-03-09", startTime: "09:00", endTime: "09:30", patient: "Rohan Mehra",     location: "Clinic A", isOnline: true,  isSubscribed: false },
  { id: 28, date: "2026-03-09", startTime: "10:00", endTime: "10:30", patient: "Dasha Shah",      location: "Clinic A", isOnline: false, isSubscribed: true  },
  { id: 29, date: "2026-03-09", startTime: "11:00", endTime: "11:30", patient: "Radhika Iyer",    location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id: 30, date: "2026-03-10", startTime: "09:00", endTime: "09:45", patient: "Anjali Verma",    location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 31, date: "2026-03-10", startTime: "10:30", endTime: "11:00", patient: "Nikhil Sharma",   location: "Clinic C", isOnline: true,  isSubscribed: true  },
  { id: 32, date: "2026-03-11", startTime: "09:00", endTime: "09:30", patient: "Suresh Menon",    location: "Clinic B", isOnline: false, isSubscribed: false },
  { id: 33, date: "2026-03-12", startTime: "09:30", endTime: "10:00", patient: "Priya Nair",      location: "Clinic A", isOnline: true,  isSubscribed: true  },
  { id: 34, date: "2026-03-13", startTime: "10:00", endTime: "10:30", patient: "Ramya Reddy",     location: "Clinic B", isOnline: false, isSubscribed: false },
  { id: 35, date: "2026-03-14", startTime: "09:00", endTime: "17:00", patient: "—",               location: "Leave",    isOnline: false, isSubscribed: false },
  { id: 36, date: "2026-03-15", startTime: "10:00", endTime: "10:30", patient: "Laxmi Iyer",      location: "Clinic A", isOnline: false, isSubscribed: true  },

  // Later in March
  { id: 37, date: "2026-03-17", startTime: "09:00", endTime: "09:30", patient: "Nupur Baghva",    location: "Clinic B", isOnline: true,  isSubscribed: false },
  { id: 38, date: "2026-03-19", startTime: "11:00", endTime: "11:30", patient: "Akash Reddy",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 39, date: "2026-03-21", startTime: "09:30", endTime: "10:00", patient: "Vibha M",         location: "Clinic C", isOnline: true,  isSubscribed: true  },
  { id: 40, date: "2026-03-24", startTime: "10:00", endTime: "10:30", patient: "Payal Singh",     location: "Clinic A", isOnline: false, isSubscribed: false },
  { id: 41, date: "2026-03-26", startTime: "09:00", endTime: "17:00", patient: "—",               location: "Leave",    isOnline: false, isSubscribed: false },
  { id: 42, date: "2026-03-28", startTime: "10:00", endTime: "10:30", patient: "Rupesh Mishra",   location: "Clinic B", isOnline: false, isSubscribed: true  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const LOCATION_STYLE: Record<Location, { bg: string; dot: string; text: string; border: string; accent: string; swatch: string }> = {
  "Clinic A": { bg: "bg-blue-50",   dot: "bg-blue-400",   text: "text-blue-800",   border: "border-blue-200",   accent: "#3b82f6", swatch: "bg-blue-200"   },
  "Clinic B": { bg: "bg-teal-50",   dot: "bg-teal-400",   text: "text-teal-800",   border: "border-teal-200",   accent: "#0d9488", swatch: "bg-teal-300"   },
  "Clinic C": { bg: "bg-amber-50",  dot: "bg-amber-400",  text: "text-amber-800",  border: "border-amber-200",  accent: "#d97706", swatch: "bg-amber-300"  },
  "Leave":    { bg: "bg-gray-100",  dot: "bg-gray-400",   text: "text-gray-600",   border: "border-gray-200",   accent: "#9ca3af", swatch: "bg-gray-300"   },
};

const GRID_HOURS = Array.from({ length: 9 }, (_, i) => i + 9); // [9,10,...,17]
const SLOT_HEIGHT = 60; // px per hour row

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Monday-based week start */
function getWeekStart(d: Date) {
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(d);
  start.setDate(d.getDate() + diff);
  return start;
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function eventsForDate(date: string, filters: Set<PatientFilter>, events: CalEvent[]) {
  return events.filter((e) => {
    if (e.date !== date) return false;
    if (filters.size === 0) return true;
    if (filters.has("Online") && e.isOnline) return true;
    if (filters.has("Offline") && !e.isOnline) return true;
    if (filters.has("Subscribed") && e.isSubscribed) return true;
    return false;
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EventChip({ event }: { event: CalEvent }) {
  const s = LOCATION_STYLE[event.location];
  if (event.location === "Leave") {
    return (
      <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-500 border-gray-200 gap-1 truncate w-full justify-start">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
        Leave
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className={cn("rounded-md px-2 py-0.5 gap-1 text-[10px] font-medium truncate w-full justify-start", s.bg, s.text, s.border)}>
      {event.isOnline
        ? <Wifi className="w-2.5 h-2.5 shrink-0" />
        : <WifiOff className="w-2.5 h-2.5 shrink-0" />}
      <span className="truncate">{event.patient.split(" ")[0]}</span>
      {event.isSubscribed && <Star className="w-2 h-2 shrink-0 fill-current ml-auto" />}
    </Badge>
  );
}

// ─── Weekly view ──────────────────────────────────────────────────────────────

function WeeklyView({
  weekStart,
  activeFilters,
  today,
}: {
  weekStart: Date;
  activeFilters: Set<PatientFilter>;
  today: Date;
}) {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Day header row */}
      <div className="grid border-b border-gray-100 bg-gray-50/60" style={{ gridTemplateColumns: "64px repeat(7, 1fr)" }}>
        <div className="border-r border-gray-100" />
        {weekDays.map((d) => {
          const isToday = isoDate(d) === isoDate(today);
          return (
            <div
              key={isoDate(d)}
              className={cn(
                "py-2.5 text-center border-r border-gray-100 last:border-r-0",
                isToday && "bg-teal-50/40"
              )}
            >
              <div className={cn(
                "text-base font-bold mx-auto w-8 h-8 flex items-center justify-center rounded-full",
                isToday ? "bg-teal-500 text-white shadow-sm" : "text-gray-800"
              )}>
                {String(d.getDate()).padStart(2, "0")}
              </div>
              <p className={cn("text-[11px] font-medium mt-0.5 uppercase tracking-wide", isToday ? "text-teal-500" : "text-gray-400")}>
                {DAYS_SHORT[d.getDay()]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <ScrollArea className="flex-1">
        <div className="relative" style={{ minHeight: GRID_HOURS.length * SLOT_HEIGHT }}>
          {/* Hour lines + time labels */}
          {GRID_HOURS.map((h, idx) => (
            <div
              key={h}
              className="absolute left-0 right-0 border-t border-gray-100 flex"
              style={{ top: idx * SLOT_HEIGHT, height: SLOT_HEIGHT }}
            >
              <div className="w-16 shrink-0 px-3 pt-1.5 text-[11px] text-gray-400 font-medium select-none">
                {String(h).padStart(2, "0")}
              </div>
              {weekDays.map((d) => {
                const isToday = isoDate(d) === isoDate(today);
                return (
                  <div key={isoDate(d)} className={cn(
                    "flex-1 border-l border-gray-100",
                    isToday && "bg-teal-50/20"
                  )} />
                );
              })}
            </div>
          ))}

          {/* Events overlay */}
          <div
            className="absolute inset-0 grid pointer-events-none"
            style={{ gridTemplateColumns: "64px repeat(7, 1fr)" }}
          >
            <div />
            {weekDays.map((d) => {
              const dateStr = isoDate(d);
              const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);
              return (
                <div key={dateStr} className="relative pointer-events-auto px-1">
                  {dayEvents.map((e) => {
                    const startMin = timeToMinutes(e.startTime);
                    const endMin = timeToMinutes(e.endTime);
                    const gridStart = 9 * 60;
                    const top = ((startMin - gridStart) / 60) * SLOT_HEIGHT;
                    const height = Math.max(((endMin - startMin) / 60) * SLOT_HEIGHT - 3, 22);
                    const s = LOCATION_STYLE[e.location];
                    return (
                      <div
                        key={e.id}
                        className={cn(
                          "absolute left-1 right-1 rounded-md px-2 py-1 text-[11px] font-medium overflow-hidden cursor-pointer hover:brightness-95 hover:shadow-sm transition-all",
                          s.bg,
                          s.text,
                        )}
                        style={{ top, height }}
                      >
                        {e.location === "Leave" ? (
                          <span className="font-semibold text-gray-500">Leave</span>
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              {e.isOnline
                                ? <Wifi className="w-2.5 h-2.5 shrink-0" />
                                : <WifiOff className="w-2.5 h-2.5 shrink-0" />}
                              <span className="truncate font-semibold">{e.patient.split(" ")[0]}</span>
                              {e.isSubscribed && <Star className="w-2.5 h-2.5 shrink-0 fill-current ml-auto" />}
                            </div>
                            {height > 36 && (
                              <div className="flex items-center gap-1 mt-0.5 opacity-70">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{e.startTime}–{e.endTime}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Daily view ───────────────────────────────────────────────────────────────

function DailyView({
  date,
  activeFilters,
  today,
}: {
  date: Date;
  activeFilters: Set<PatientFilter>;
  today: Date;
}) {
  const dateStr = isoDate(date);
  const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);
  const isToday = dateStr === isoDate(today);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Time axis */}
      <div className="w-16 shrink-0 border-r border-gray-100 bg-gray-50/60 select-none">
        {GRID_HOURS.map((h) => (
          <div key={h} className="flex items-start px-3 pt-2" style={{ height: SLOT_HEIGHT }}>
            <span className="text-[11px] text-gray-400 font-medium">
              {String(h).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Events column */}
      <ScrollArea className="flex-1">
        <div className="relative" style={{ minHeight: GRID_HOURS.length * SLOT_HEIGHT }}>
          {GRID_HOURS.map((h) => (
            <div
              key={h}
              className={cn("border-t border-gray-100", isToday && "bg-teal-50/10")}
              style={{ height: SLOT_HEIGHT }}
            />
          ))}
          {dayEvents.map((e) => {
            const startMin = timeToMinutes(e.startTime);
            const endMin = timeToMinutes(e.endTime);
            const gridStart = 9 * 60;
            const top = ((startMin - gridStart) / 60) * SLOT_HEIGHT;
            const height = Math.max(((endMin - startMin) / 60) * SLOT_HEIGHT - 6, 28);
            const s = LOCATION_STYLE[e.location];
            return (
              <div
                key={e.id}
                className={cn(
                  "absolute left-3 right-4 rounded-xl px-4 py-2.5 cursor-pointer hover:shadow-md transition-all border-l-4 shadow-sm",
                  s.bg, s.text,
                )}
                style={{ top, height, borderLeftColor: s.accent }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm truncate">
                    {e.location === "Leave" ? "🏖 Leave" : e.patient}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {e.isSubscribed && (
                      <Badge className={cn("text-[10px] px-1.5 h-4 rounded-full gap-0.5", s.bg, s.text, "border-0")}>
                        <Star className="w-2 h-2 fill-current" /> Pro
                      </Badge>
                    )}
                    {e.location !== "Leave" && (
                      <Badge className={cn("text-[10px] px-1.5 h-4 rounded-full", s.bg, s.text, "border border-current/20")}>
                        {e.location}
                      </Badge>
                    )}
                  </div>
                </div>
                {height > 36 && e.location !== "Leave" && (
                  <div className="flex items-center gap-3 mt-1 text-xs opacity-75">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {e.startTime} – {e.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      {e.isOnline
                        ? <><Wifi className="w-3 h-3" /> Online</>
                        : <><WifiOff className="w-3 h-3" /> In-Person</>}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          {dayEvents.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
              <CalendarDays className="w-8 h-8 opacity-30" />
              <p className="text-sm font-medium">No appointments scheduled</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Monthly view ─────────────────────────────────────────────────────────────

function MonthlyView({
  year,
  month,
  selectedDay,
  onSelectDay,
  activeFilters,
  today,
}: {
  year: number;
  month: number;
  selectedDay: number | null;
  onSelectDay: (d: number) => void;
  activeFilters: Set<PatientFilter>;
  today: Date;
}) {
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_SHORT.map((d, i) => (
          <div
            key={d}
            className={cn(
              "text-center text-[11px] font-bold uppercase tracking-wider py-2",
              i === 0 || i === 6 ? "text-gray-300" : "text-gray-400"
            )}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`b-${i}`} />)}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);
          const active = selectedDay === day;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isWeekend = (new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6);

          return (
            <div
              key={day}
              onClick={() => onSelectDay(day)}
              className={cn(
                "min-h-[130px] rounded-xl p-2 cursor-pointer border transition-all",
                active
                  ? "border-teal-400 bg-teal-50 shadow-sm"
                  : isToday
                  ? "border-teal-200 bg-teal-50/40 hover:border-teal-300"
                  : isWeekend
                  ? "border-transparent bg-gray-50/60 hover:border-gray-200 hover:bg-gray-50"
                  : "border-transparent bg-white hover:border-gray-200 hover:bg-gray-50/60",
              )}
            >
              <div className={cn(
                "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-1.5",
                isToday
                  ? "bg-teal-500 text-white shadow-sm"
                  : active
                  ? "text-teal-700"
                  : isWeekend
                  ? "text-gray-400"
                  : "text-gray-700",
              )}>
                {day}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <EventChip key={e.id} event={e} />
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-gray-400 font-medium pl-1 pt-0.5">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const today = new Date(2026, 2, 9); // March 9, 2026

  const [view, setView] = useState<ViewMode>("Weekly");
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [activeFilters, setActiveFilters] = useState<Set<PatientFilter>>(new Set());

  // Derived navigation state
  const viewYear = currentDate.getFullYear();
  const viewMonth = currentDate.getMonth();
  const weekStart = useMemo(() => getWeekStart(currentDate), [currentDate]);
  const weekEnd = addDays(weekStart, 6);

  const navigate = (dir: 1 | -1) => {
    if (view === "Monthly") {
      const d = new Date(currentDate);
      d.setMonth(d.getMonth() + dir);
      setCurrentDate(d);
      setSelectedDay(null);
    } else if (view === "Weekly") {
      setCurrentDate(addDays(currentDate, dir * 7));
    } else {
      setCurrentDate(addDays(currentDate, dir));
    }
  };

  const goToday = () => {
    setCurrentDate(today);
    setSelectedDay(today.getDate());
  };

  const toggleFilter = (f: PatientFilter) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  // Range label
  const rangeLabel = useMemo(() => {
    if (view === "Monthly") return `${MONTHS[viewMonth]} ${viewYear}`;
    if (view === "Weekly") {
      const ws = weekStart;
      const we = weekEnd;
      if (ws.getMonth() === we.getMonth())
        return `${String(ws.getDate()).padStart(2, "0")} ${MONTHS[ws.getMonth()].slice(0, 3)} – ${String(we.getDate()).padStart(2, "0")} ${MONTHS[we.getMonth()].slice(0, 3)} ${ws.getFullYear()}`;
      return `${String(ws.getDate()).padStart(2, "0")} ${MONTHS[ws.getMonth()].slice(0, 3)} – ${String(we.getDate()).padStart(2, "0")} ${MONTHS[we.getMonth()].slice(0, 3)} ${we.getFullYear()}`;
    }
    return `${String(currentDate.getDate()).padStart(2, "0")} ${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, [view, currentDate, weekStart, weekEnd, viewMonth, viewYear]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white">

      {/* ── Compact header: title + month + today + edit ── */}
      <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-teal-600 tracking-tight">Your Calendar</h1>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-800">{`${MONTHS[viewMonth]} ${viewYear}`}</h2>
            <span className="text-xs text-gray-400 hidden sm:inline">({rangeLabel})</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goToday}
            className="rounded-full text-teal-600 border-teal-200 hover:bg-teal-50 text-xs font-semibold h-7 px-3"
          >
            Today
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-teal-600 gap-1 text-xs font-medium shrink-0"
        >
          Edit Availability <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* ── Teal command bar: nav + legend + filters all-in-one ── */}
      <div className="shrink-0 bg-teal-500 flex items-center px-3 py-2 gap-3 flex-wrap">
        {/* View navigation */}
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20 w-7 h-7 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Tabs value={view} onValueChange={(v) => setView(v as ViewMode)}>
            <TabsList className="bg-white/15 h-8 gap-0 p-0.5 rounded-full border-0 shadow-none">
              {(["Daily", "Weekly", "Monthly"] as ViewMode[]).map((v) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="px-4 h-7 rounded-full text-xs font-semibold text-white/80 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm hover:text-white transition-all"
                >
                  {v}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(1)}
            className="text-white hover:bg-white/20 w-7 h-7 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/25 shrink-0" />

        {/* Location legend */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {(Object.entries(LOCATION_STYLE) as [Location, typeof LOCATION_STYLE[Location]][]).map(([loc, s]) => (
            <div key={loc} className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
              <span className={cn("w-3 h-3 rounded-sm shrink-0", s.swatch)} />
              {loc}
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="w-5 h-5 text-white/50 hover:text-white p-0 shrink-0"
          >
            <Pencil className="w-3 h-3" />
          </Button>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/25 shrink-0 ml-auto" />

        {/* Patient filters */}
        <div className="flex items-center gap-1.5 shrink-0">
          {(["Online", "Offline", "Subscribed"] as PatientFilter[]).map((f) => {
            const active = activeFilters.has(f);
            return (
              <Button
                key={f}
                variant="ghost"
                size="sm"
                onClick={() => toggleFilter(f)}
                className={cn(
                  "h-7 gap-1 text-[11px] rounded-full px-2.5 transition-all border",
                  active
                    ? "bg-white text-teal-700 border-transparent font-semibold"
                    : "border-white/30 text-white/80 hover:bg-white/15 hover:border-white/50 bg-transparent",
                )}
              >
                {f === "Online" && <Wifi className="w-3 h-3" />}
                {f === "Offline" && <WifiOff className="w-3 h-3" />}
                {f === "Subscribed" && <Star className="w-3 h-3" />}
                {f}
              </Button>
            );
          })}
        </div>
      </div>

      {/* ── Calendar grid ── */}
      <Card className="flex-1 overflow-hidden flex flex-col m-3 rounded-xl border border-gray-100 shadow-sm bg-white">
        {view === "Monthly" && (
          <MonthlyView
            year={viewYear}
            month={viewMonth}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            activeFilters={activeFilters}
            today={today}
          />
        )}
        {view === "Weekly" && (
          <WeeklyView
            weekStart={weekStart}
            activeFilters={activeFilters}
            today={today}
          />
        )}
        {view === "Daily" && (
          <DailyView
            date={currentDate}
            activeFilters={activeFilters}
            today={today}
          />
        )}
      </Card>
    </div>
  );
}
