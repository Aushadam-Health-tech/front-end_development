"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { mockAppointments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const statusColors: Record<string, string> = {
  "In-clinic": "bg-emerald-500",
  Online:      "bg-blue-500",
  Scheduled:   "bg-amber-400",
  Completed:   "bg-gray-400",
  Cancelled:   "bg-red-400",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const now = new Date(2022, 5, 24); // Jun 24, 2022 to match mock data
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(now.getDate());

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDayOfMonth(year, month);
  const today        = new Date(2022, 5, 24);

  // Build grid cells (leading blanks + days)
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full 6-row grid
  while (cells.length % 7 !== 0) cells.push(null);

  // Appointments for the selected day
  const selectedDateStr = `${MONTHS[month].slice(0,3)} ${String(selected).padStart(2,"0")}, ${year}`;
  const dayAppointments = mockAppointments.filter(a => a.date === selectedDateStr);

  // Dates that have appointments (for dot indicators)
  const datesWithApts = new Set(
    mockAppointments
      .filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(a => new Date(a.date).getDate())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Appointment Calendar</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your schedule</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>
      </div>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">

          {/* ── Calendar Grid ── */}
          <Card className="rounded-2xl shadow-sm border border-gray-100">
            <CardHeader className="pb-2 px-5 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-gray-800">
                  {MONTHS[month]} {year}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-gray-200" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-gray-200" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
              </div>
              {/* Date cells */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  if (day === null) return <div key={`blank-${i}`} />;
                  const isToday  = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSelected = day === selected;
                  const hasApt = datesWithApts.has(day);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelected(day)}
                      className={cn(
                        "relative flex flex-col items-center justify-center h-10 w-full rounded-xl text-sm font-medium transition-all",
                        isSelected
                          ? "bg-emerald-600 text-white shadow-sm"
                          : isToday
                          ? "bg-emerald-50 text-emerald-700 font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {day}
                      {hasApt && !isSelected && (
                        <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* ── Day Appointments ── */}
          <Card className="rounded-2xl shadow-sm border border-gray-100 h-fit">
            <CardHeader className="pb-2 px-5 pt-5">
              <CardTitle className="text-sm font-bold text-gray-800">
                {MONTHS[month].slice(0,3)} {selected} — Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-2">
              {dayAppointments.length === 0 ? (
                <p className="text-sm text-gray-400 py-6 text-center">No appointments on this day.</p>
              ) : (
                dayAppointments.map(apt => (
                  <div key={apt.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-1 h-10 rounded-full shrink-0 ${statusColors[apt.status] ?? "bg-gray-300"}`} />
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className={`${apt.avatarColor} text-gray-700 text-xs font-semibold`}>
                        {apt.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{apt.patient}</p>
                      <p className="text-xs text-gray-500">{apt.time} · {apt.reason}</p>
                    </div>
                    <Badge variant="outline" className="text-[11px] rounded-full px-2 shrink-0 border-0 bg-white">
                      {apt.status}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
