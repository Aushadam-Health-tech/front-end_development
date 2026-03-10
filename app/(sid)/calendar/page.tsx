"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Monitor,
  UserCheck,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const LOCATION_STYLE: Record<Location, { bg: string; dot: string; text: string }> = {
  "Clinic A": { bg: "bg-blue-100",   dot: "bg-blue-300",   text: "text-blue-800"   },
  "Clinic B": { bg: "bg-teal-100",   dot: "bg-teal-400",   text: "text-teal-800"   },
  "Clinic C": { bg: "bg-yellow-100", dot: "bg-yellow-400", text: "text-yellow-800" },
  "Leave":    { bg: "bg-gray-200",   dot: "bg-gray-400",   text: "text-gray-600"   },
};

// Hours shown in weekly/daily grid (9 AM – 5 PM)
const GRID_HOURS = Array.from({ length: 9 }, (_, i) => i + 9); // [9,10,...,17]
const SLOT_HEIGHT = 56; // px per hour row

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

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

function EventChip({ event, compact = false }: { event: CalEvent; compact?: boolean }) {
  const s = LOCATION_STYLE[event.location];
  if (event.location === "Leave") {
    return (
      <div className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text} flex items-center gap-1`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        Leave
      </div>
    );
  }
  return (
    <div
      className={cn(
        "rounded px-1.5 py-0.5 flex items-center gap-1 text-[10px] font-medium",
        s.bg,
        s.text,
      )}
    >
      {event.isOnline
        ? <Monitor className="w-2.5 h-2.5 shrink-0" />
        : <UserCheck className="w-2.5 h-2.5 shrink-0" />}
      {!compact && <span className="truncate">{event.startTime}</span>}
      {event.isSubscribed && <Star className="w-2 h-2 shrink-0 fill-current" />}
    </div>
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
      {/* Header row */}
      <div className="grid border-b border-gray-100 bg-white" style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}>
        <div className="border-r border-gray-100" />
        {weekDays.map((d) => {
          const isToday = isoDate(d) === isoDate(today);
          return (
            <div key={isoDate(d)} className="py-2 text-center border-r border-gray-100 last:border-r-0">
              <p className="text-[11px] text-gray-400 font-medium">{DAYS_SHORT[d.getDay()]}</p>
              <p className={cn(
                "text-sm font-bold mx-auto w-7 h-7 flex items-center justify-center rounded-full",
                isToday ? "bg-teal-500 text-white" : "text-gray-700"
              )}>
                {d.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative" style={{ minHeight: GRID_HOURS.length * SLOT_HEIGHT }}>
          {/* Hour lines */}
          {GRID_HOURS.map((h, idx) => (
            <div
              key={h}
              className="absolute left-0 right-0 border-t border-gray-100 flex"
              style={{ top: idx * SLOT_HEIGHT, height: SLOT_HEIGHT }}
            >
              <div className="w-14 shrink-0 px-2 pt-1 text-[10px] text-gray-400 font-medium">
                {h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`}
              </div>
              {weekDays.map((d) => (
                <div key={isoDate(d)} className="flex-1 border-l border-gray-100 last:border-r-0" />
              ))}
            </div>
          ))}

          {/* Events overlay */}
          <div
            className="absolute inset-0 grid pointer-events-none"
            style={{ gridTemplateColumns: "56px repeat(7, 1fr)" }}
          >
            <div />
            {weekDays.map((d) => {
              const dateStr = isoDate(d);
              const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);
              return (
                <div key={dateStr} className="relative pointer-events-auto px-0.5">
                  {dayEvents.map((e) => {
                    const startMin = timeToMinutes(e.startTime);
                    const endMin = timeToMinutes(e.endTime);
                    const gridStart = 9 * 60;
                    const top = ((startMin - gridStart) / 60) * SLOT_HEIGHT;
                    const height = Math.max(((endMin - startMin) / 60) * SLOT_HEIGHT - 2, 20);
                    const s = LOCATION_STYLE[e.location];
                    return (
                      <div
                        key={e.id}
                        className={cn(
                          "absolute left-0.5 right-0.5 rounded-md px-1.5 py-1 text-[10px] font-medium overflow-hidden border-l-2 cursor-pointer hover:brightness-95 transition-all",
                          s.bg,
                          s.text,
                          `border-l-[3px]`,
                        )}
                        style={{ top, height, borderLeftColor: s.dot.replace("bg-", "") }}
                      >
                        {e.location === "Leave" ? (
                          <span className="font-semibold">Leave</span>
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              {e.isOnline
                                ? <Monitor className="w-2.5 h-2.5 shrink-0" />
                                : <UserCheck className="w-2.5 h-2.5 shrink-0" />}
                              <span className="truncate">{e.patient.split(" ")[0]}</span>
                              {e.isSubscribed && <Star className="w-2 h-2 shrink-0 fill-current ml-auto" />}
                            </div>
                            {height > 32 && (
                              <div className="flex items-center gap-0.5 mt-0.5 opacity-70">
                                <Clock className="w-2 h-2" />
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
      </div>
    </div>
  );
}

// ─── Daily view ───────────────────────────────────────────────────────────────

function DailyView({
  date,
  activeFilters,
}: {
  date: Date;
  activeFilters: Set<PatientFilter>;
}) {
  const dateStr = isoDate(date);
  const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Time axis */}
      <div className="w-14 shrink-0 border-r border-gray-100 bg-white" style={{ minHeight: GRID_HOURS.length * SLOT_HEIGHT }}>
        {GRID_HOURS.map((h, idx) => (
          <div key={h} className="flex items-start px-2 pt-1" style={{ height: SLOT_HEIGHT }}>
            <span className="text-[10px] text-gray-400 font-medium">
              {h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`}
            </span>
          </div>
        ))}
      </div>

      {/* Events column */}
      <div className="flex-1 overflow-y-auto relative" style={{ minHeight: GRID_HOURS.length * SLOT_HEIGHT }}>
        {GRID_HOURS.map((h, idx) => (
          <div key={h} className="border-t border-gray-100" style={{ height: SLOT_HEIGHT }} />
        ))}
        {dayEvents.map((e) => {
          const startMin = timeToMinutes(e.startTime);
          const endMin = timeToMinutes(e.endTime);
          const gridStart = 9 * 60;
          const top = ((startMin - gridStart) / 60) * SLOT_HEIGHT;
          const height = Math.max(((endMin - startMin) / 60) * SLOT_HEIGHT - 4, 24);
          const s = LOCATION_STYLE[e.location];
          return (
            <div
              key={e.id}
              className={cn(
                "absolute left-2 right-4 rounded-xl px-3 py-2 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-all",
                s.bg, s.text,
              )}
              style={{ top, height }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm truncate">
                  {e.location === "Leave" ? "Leave" : e.patient}
                </span>
                {e.isSubscribed && <Star className="w-3 h-3 fill-current shrink-0" />}
              </div>
              {height > 36 && e.location !== "Leave" && (
                <div className="flex items-center gap-3 mt-1 text-xs opacity-80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{e.startTime}–{e.endTime}
                  </span>
                  <span className="flex items-center gap-1">
                    {e.isOnline
                      ? <><Monitor className="w-3 h-3" />Online</>
                      : <><UserCheck className="w-3 h-3" />In-Person</>}
                  </span>
                  <Badge className={cn("text-[10px] px-2 py-0 h-4 rounded-full", s.bg, s.text, "border border-current/20")}>
                    {e.location}
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
        {dayEvents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
            No appointments
          </div>
        )}
      </div>
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
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1.5">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`b-${i}`} />)}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsForDate(dateStr, activeFilters, EVENTS);
          const active = selectedDay === day;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

          return (
            <div
              key={day}
              onClick={() => onSelectDay(day)}
              className={cn(
                "min-h-22.5 rounded-xl p-2 cursor-pointer border transition-all",
                active
                  ? "border-teal-500 bg-teal-50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/30",
              )}
            >
              <div className={cn(
                "text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1",
                isToday ? "bg-teal-500 text-white" : active ? "text-teal-700" : "text-gray-700",
              )}>
                {day}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((e) => (
                  <EventChip key={e.id} event={e} compact />
                ))}
                {dayEvents.length > 3 && (
                  <p className="text-[10px] text-gray-400 pl-1">+{dayEvents.length - 3} more</p>
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

  // Month header label for weekly/daily
  const monthLabel = useMemo(() => {
    if (view === "Monthly") return `${MONTHS[viewMonth]} ${viewYear}`;
    return `${MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
  }, [view, viewMonth, viewYear, weekStart]);

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
      {/* ── Page header ── */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Your Calendar</h1>
        </div>
        <button className="text-sm font-medium text-gray-600 hover:text-teal-600 flex items-center gap-1 transition-colors">
          Edit Availability <ChevronRight className="w-4 h-4" />
        </button>
      </header>

      {/* ── Toolbar ── */}
      <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 flex-wrap gap-3">
        {/* Month + nav */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-800 w-48">{monthLabel}</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="w-7 h-7 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate(1)} className="w-7 h-7 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-xs text-gray-400 font-medium">({rangeLabel})</span>
        </div>

        {/* View toggle */}
        <div className="flex bg-teal-500 rounded-full p-1 gap-0.5">
          {(["Daily", "Weekly", "Monthly"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                view === v ? "bg-white text-teal-700 shadow-sm" : "text-white hover:bg-teal-400",
              )}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Today button */}
        <Button variant="outline" size="sm" onClick={goToday} className="rounded-lg text-teal-600 border-teal-200 hover:bg-teal-50 text-xs h-7">
          Today
        </Button>
      </div>

      {/* ── Legend + Filters ── */}
      <div className="px-6 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 flex-wrap gap-2">
        {/* Location legend */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</span>
          {(Object.entries(LOCATION_STYLE) as [Location, typeof LOCATION_STYLE[Location]][]).map(([loc, s]) => (
            <span key={loc} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className={cn("w-3 h-3 rounded-sm", s.bg, "border border-gray-200")} />
              {loc}
            </span>
          ))}
          <button className="text-gray-400 hover:text-gray-600 ml-1">
            <Edit2 className="w-3 h-3" />
          </button>
        </div>

        {/* Patient type filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Patients</span>
          {(["Online", "Offline", "Subscribed"] as PatientFilter[]).map((f) => {
            const active = activeFilters.has(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={cn(
                  "flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border transition-all",
                  active
                    ? "bg-teal-50 border-teal-300 text-teal-700 font-semibold"
                    : "border-gray-200 text-gray-500 hover:border-gray-300",
                )}
              >
                {f === "Online" && <Monitor className="w-3 h-3" />}
                {f === "Offline" && <UserCheck className="w-3 h-3" />}
                {f === "Subscribed" && <Star className="w-3 h-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Calendar body ── */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white mx-4 my-3 rounded-2xl border border-gray-100 shadow-sm">
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
          />
        )}
      </div>
    </div>
  );
}
