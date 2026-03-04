"use client";

import { useState } from "react";
import { Search, Filter, Plus, Clock, Video, MapPin, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const appointments = [
  { id: 1, time: "08:00 AM", patient: "Dasha Shah",       purpose: "General Checkup",    type: "In-Person", status: "Completed",  duration: "30 min", initials: "DS", color: "bg-blue-100 text-blue-700" },
  { id: 2, time: "08:30 AM", patient: "Nupur Baghva",     purpose: "Follow-up",           type: "Online",    status: "Completed",  duration: "15 min", initials: "NB", color: "bg-purple-100 text-purple-700" },
  { id: 3, time: "09:00 AM", patient: "Rohan Mehra",      purpose: "Report Discussion",   type: "Online",    status: "In Progress",duration: "45 min", initials: "RM", color: "bg-teal-100 text-teal-700" },
  { id: 4, time: "10:00 AM", patient: "Vibha M",          purpose: "Consultation",        type: "In-Person", status: "Upcoming",   duration: "30 min", initials: "VM", color: "bg-green-100 text-green-700" },
  { id: 5, time: "10:30 AM", patient: "Team Meeting",     purpose: "Staff Sync",          type: "In-Person", status: "Upcoming",   duration: "30 min", initials: "TM", color: "bg-gray-100 text-gray-700" },
  { id: 6, time: "11:00 AM", patient: "Priya Sharma",     purpose: "Check Report",        type: "Online",    status: "Upcoming",   duration: "20 min", initials: "PS", color: "bg-orange-100 text-orange-700" },
  { id: 7, time: "11:15 AM", patient: "Akash Reddy",      purpose: "Eye Surgery",         type: "In-Person", status: "Upcoming",   duration: "60 min", initials: "AR", color: "bg-red-100 text-red-700" },
  { id: 8, time: "01:00 PM", patient: "—",                purpose: "Break",               type: "—",         status: "Break",      duration: "30 min", initials: "—",  color: "bg-gray-100 text-gray-400" },
  { id: 9, time: "01:40 PM", patient: "Laxmi Iyer",       purpose: "Consultation",        type: "In-Person", status: "Upcoming",   duration: "30 min", initials: "LI", color: "bg-pink-100 text-pink-700" },
  { id: 10,time: "02:15 PM", patient: "Swaminarayna",     purpose: "Follow-up",           type: "Online",    status: "Upcoming",   duration: "20 min", initials: "SW", color: "bg-indigo-100 text-indigo-700" },
  { id: 11,time: "03:00 PM", patient: "Rupesh Mishra",    purpose: "Consultation",        type: "In-Person", status: "Overdue",    duration: "30 min", initials: "RM", color: "bg-red-100 text-red-700" },
  { id: 12,time: "03:30 PM", patient: "Swati Naydu",      purpose: "General Checkup",     type: "In-Person", status: "Upcoming",   duration: "30 min", initials: "SN", color: "bg-teal-100 text-teal-700" },
  { id: 13,time: "04:00 PM", patient: "Payal Singh",      purpose: "Report Discussion",   type: "Online",    status: "Upcoming",   duration: "20 min", initials: "PS", color: "bg-blue-100 text-blue-700" },
];

const statusStyle: Record<string, string> = {
  Completed:    "bg-gray-100 text-gray-600",
  "In Progress":"bg-teal-100 text-teal-700",
  Upcoming:     "bg-blue-100 text-blue-700",
  Break:        "bg-purple-100 text-purple-600",
  Overdue:      "bg-red-100 text-red-600",
};

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Upcoming", "In Progress", "Completed", "Overdue"];
  const filtered = appointments.filter((a) => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) || a.purpose.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2 rounded-xl">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>
      </header>

      <div className="px-6 py-5 space-y-4">
        {/* Search + Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search patient or purpose..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-gray-200"
            />
          </div>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-teal-600 hover:bg-teal-700 text-white rounded-lg" : "rounded-lg border-gray-200 text-gray-600"}
              >
                {f}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-lg border-gray-200 text-gray-600 ml-auto">
            <Filter className="w-3.5 h-3.5" />
            Filter
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Today", value: appointments.length, color: "text-gray-800" },
            { label: "Completed",   value: appointments.filter(a => a.status === "Completed").length,    color: "text-gray-600" },
            { label: "Upcoming",    value: appointments.filter(a => a.status === "Upcoming").length,     color: "text-blue-600" },
            { label: "Overdue",     value: appointments.filter(a => a.status === "Overdue").length,      color: "text-red-500" },
          ].map((s) => (
            <Card key={s.label} className="rounded-xl shadow-sm border-gray-100">
              <CardContent className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* List */}
        <Card className="rounded-2xl shadow-sm border-gray-100 overflow-hidden">
          <div className="grid grid-cols-[90px_1fr_140px_100px_80px_110px] px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Time</span>
            <span>Patient / Purpose</span>
            <span>Type</span>
            <span>Duration</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {filtered.map((a, i) => (
            <div key={a.id}>
              <div
                className={`grid grid-cols-[90px_1fr_140px_100px_80px_110px] px-5 py-3.5 items-center hover:bg-teal-50/50 transition-colors ${
                  a.status === "In Progress" ? "bg-teal-50" :
                  a.status === "Overdue" ? "bg-red-50/40" :
                  a.status === "Break" ? "bg-gray-50" : ""
                }`}
              >
                {/* Time */}
                <div className="flex items-center gap-1.5">
                  <Clock className={`w-3.5 h-3.5 ${a.status === "In Progress" ? "text-teal-500" : a.status === "Overdue" ? "text-red-400" : "text-gray-400"}`} />
                  <span className={`text-sm font-semibold ${a.status === "In Progress" ? "text-teal-700" : a.status === "Overdue" ? "text-red-500" : "text-gray-700"}`}>
                    {a.time}
                  </span>
                </div>

                {/* Patient */}
                <div className="flex items-center gap-3 min-w-0">
                  {a.status !== "Break" ? (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={`text-xs font-semibold ${a.color}`}>{a.initials}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-xs">—</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{a.patient}</p>
                    <p className="text-xs text-gray-500 truncate">{a.purpose}</p>
                  </div>
                </div>

                {/* Type */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  {a.type === "Online" ? <Video className="w-3.5 h-3.5 text-blue-500" /> :
                   a.type === "In-Person" ? <MapPin className="w-3.5 h-3.5 text-teal-500" /> : null}
                  <span>{a.type}</span>
                </div>

                {/* Duration */}
                <span className="text-sm text-gray-600">{a.duration}</span>

                {/* Status */}
                <Badge className={`text-xs px-2 py-0.5 font-medium ${statusStyle[a.status] ?? ""}`}>
                  {a.status}
                </Badge>

                {/* Action */}
                <div className="flex justify-end">
                  {a.status === "In Progress" && (
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-7 px-3 rounded-lg gap-1">
                      <Video className="w-3 h-3" /> Join
                    </Button>
                  )}
                  {a.status === "Upcoming" && (
                    <Button size="sm" variant="outline" className="text-xs h-7 px-3 rounded-lg border-gray-200 text-gray-600">
                      Details
                    </Button>
                  )}
                </div>
              </div>
              {i < filtered.length - 1 && <Separator className="mx-5 w-auto" />}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
