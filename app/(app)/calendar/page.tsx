"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type EventType = "Online" | "In-Person" | "Surgery" | "Break";

interface CalEvent {
  id: number;
  day: number;
  time: string;
  title: string;
  patient: string;
  type: EventType;
}

const EVENTS_BY_MONTH: Record<string, CalEvent[]> = {
  "2025-5": [
    { id: 1,  day: 1,  time: "09:00", title: "Video Consultation", patient: "Rohan Mehra",   type: "Online"    },
    { id: 2,  day: 1,  time: "11:30", title: "Clinic Visit",        patient: "Dasha Shah",    type: "In-Person" },
    { id: 3,  day: 3,  time: "10:00", title: "Appendix Surgery",    patient: "Akash Reddy",   type: "Surgery"   },
    { id: 4,  day: 5,  time: "14:00", title: "Lunch Break",         patient: "—",             type: "Break"     },
    { id: 5,  day: 7,  time: "09:30", title: "Video Consultation",  patient: "Laxmi Iyer",   type: "Online"    },
    { id: 6,  day: 8,  time: "10:15", title: "Clinic Visit",        patient: "Nupur Baghva",  type: "In-Person" },
    { id: 7,  day: 12, time: "11:00", title: "Eye Surgery",         patient: "Swaminarayna",  type: "Surgery"   },
    { id: 8,  day: 14, time: "15:00", title: "Video Consultation",  patient: "Swati Naydu",   type: "Online"    },
    { id: 9,  day: 15, time: "09:00", title: "Clinic Visit",        patient: "Payal Singh",   type: "In-Person" },
    { id: 10, day: 19, time: "13:00", title: "Team Meeting",        patient: "—",             type: "Break"     },
    { id: 11, day: 21, time: "10:30", title: "Video Consultation",  patient: "Vibha M",       type: "Online"    },
    { id: 12, day: 22, time: "14:00", title: "Clinic Visit",        patient: "Rupesh Mishra", type: "In-Person" },
    { id: 13, day: 26, time: "08:30", title: "Knee Surgery",        patient: "Rohan Mehra",   type: "Surgery"   },
    { id: 14, day: 28, time: "12:00", title: "Holiday",             patient: "—",             type: "Break"     },
  ],
  "2025-6": [
    { id: 15, day: 2,  time: "10:00", title: "Video Consultation", patient: "Dasha Shah",    type: "Online"    },
    { id: 16, day: 4,  time: "11:00", title: "Clinic Visit",       patient: "Akash Reddy",   type: "In-Person" },
    { id: 17, day: 9,  time: "09:00", title: "Cataract Surgery",   patient: "Laxmi Iyer",   type: "Surgery"   },
    { id: 18, day: 11, time: "14:30", title: "Video Consultation", patient: "Nupur Baghva",  type: "Online"    },
    { id: 19, day: 16, time: "10:00", title: "Clinic Visit",       patient: "Payal Singh",   type: "In-Person" },
    { id: 20, day: 20, time: "12:00", title: "Conference Break",   patient: "—",             type: "Break"     },
  ],
};

const TYPE_STYLE: Record<EventType, { dot: string; badge: string; label: string }> = {
  Online:     { dot: "bg-teal-500",   badge: "bg-teal-100 text-teal-700",   label: "Online" },
  "In-Person":{ dot: "bg-blue-500",   badge: "bg-blue-100 text-blue-700",   label: "In-Person" },
  Surgery:    { dot: "bg-purple-500", badge: "bg-purple-100 text-purple-700",label: "Surgery" },
  Break:      { dot: "bg-amber-400",  badge: "bg-amber-100 text-amber-700",  label: "Break" },
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const key = `${viewYear}-${viewMonth + 1}`;
  const events: CalEvent[] = EVENTS_BY_MONTH[key] ?? [];

  const totalDays = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };
  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  const eventsForDay = (day: number) => events.filter(e => e.day === day);
  const selectedEvents = selectedDay ? eventsForDay(selectedDay) : [];
  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">{events.length} events this month</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Legend */}
          <div className="flex items-center gap-3 mr-4">
            {(Object.entries(TYPE_STYLE) as [EventType, typeof TYPE_STYLE[EventType]][]).map(([type, s]) => (
              <span key={type} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={goToday} className="rounded-lg text-teal-600 border-teal-200 hover:bg-teal-50">
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold text-gray-700 w-32 text-center">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Calendar grid */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsForDay(day);
              const active = selectedDay === day;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[88px] rounded-xl p-2 cursor-pointer border transition-all ${
                    active
                      ? "border-teal-500 bg-teal-50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/30"
                  }`}
                >
                  <div className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
                    isToday(day) ? "bg-teal-600 text-white" : active ? "text-teal-700" : "text-gray-700"
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(e => (
                      <div key={e.id} className={`flex items-center gap-1 rounded px-1 py-0.5 ${TYPE_STYLE[e.type].badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${TYPE_STYLE[e.type].dot}`} />
                        <span className="text-[10px] font-medium truncate">{e.time}</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-[10px] text-gray-400 pl-1">+{dayEvents.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="w-72 bg-white border-l border-gray-100 flex flex-col flex-shrink-0">
          <div className="px-4 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-700">
              {selectedDay
                ? `${MONTHS[viewMonth]} ${selectedDay}, ${viewYear}`
                : "Select a day"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {selectedDay ? `${selectedEvents.length} event${selectedEvents.length !== 1 ? "s" : ""}` : ""}
            </p>
          </div>
          <ScrollArea className="flex-1 px-4 py-3">
            {selectedDay && selectedEvents.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">No events</div>
            )}
            <div className="space-y-3">
              {selectedEvents.map(e => (
                <Card key={e.id} className="rounded-xl border-gray-100 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500">{e.time}</span>
                      <Badge className={`text-[10px] px-1.5 py-0 ${TYPE_STYLE[e.type].badge}`}>{e.type}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{e.title}</p>
                    {e.patient !== "—" && (
                      <p className="text-xs text-gray-500 mt-0.5">Patient: {e.patient}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
