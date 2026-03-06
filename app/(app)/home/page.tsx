"use client";

import {
  Clock, Users, FileText, AlertCircle, CheckCircle2, ChevronRight,
  Stethoscope, Pill, FlaskConical, UserCheck, Wifi, WifiOff, CalendarClock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

/* ── Today's Schedule timeline ─────────────────────────────────────── */
const schedule = [
  { time: "09:00", patient: "Rohan Mehra",    type: "Online",    status: "done",     condition: "Hypertension follow-up" },
  { time: "09:45", patient: "Dasha Shah",     type: "In-Person", status: "done",     condition: "Diabetes check-up" },
  { time: "10:30", patient: "Nupur Baghva",   type: "In-Person", status: "current",  condition: "Asthma review" },
  { time: "11:15", patient: "Laxmi Iyer",     type: "Online",    status: "upcoming", condition: "Migraine consultation" },
  { time: "12:00", patient: "— Lunch Break",  type: "Break",     status: "upcoming", condition: "" },
  { time: "14:00", patient: "Swati Naydu",    type: "In-Person", status: "upcoming", condition: "Thyroid report review" },
  { time: "15:00", patient: "Akash Reddy",    type: "In-Person", status: "upcoming", condition: "Glaucoma post-op" },
  { time: "16:00", patient: "Payal Singh",    type: "Online",    status: "upcoming", condition: "PCOS follow-up" },
];

const statusDot: Record<string, string> = {
  done:     "bg-green-400",
  current:  "bg-teal-500 ring-2 ring-teal-200",
  upcoming: "bg-gray-300",
};

/* ── Pending tasks ──────────────────────────────────────────────────── */
const tasks = [
  { icon: Pill,         text: "Renew prescription — Swaminarayna",          urgency: "high"   },
  { icon: FlaskConical, text: "Review MRI report — Akash Reddy",            urgency: "high"   },
  { icon: FileText,     text: "Sign discharge summary — Rupesh Mishra",     urgency: "medium" },
  { icon: Stethoscope,  text: "Update treatment plan — Dasha Shah",         urgency: "medium" },
  { icon: UserCheck,    text: "Confirm referral — Vibha M → Cardiologist",  urgency: "low"    },
  { icon: FileText,     text: "Reply to lab query — Nupur Baghva",          urgency: "low"    },
];

const urgencyStyle: Record<string, string> = {
  high:   "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low:    "bg-blue-100 text-blue-600",
};

/* ── Patient condition breakdown ────────────────────────────────────── */
const conditionBreakdown = [
  { label: "Hypertension", count: 42, pct: 72, color: "bg-teal-500"   },
  { label: "Diabetes",     count: 38, pct: 65, color: "bg-blue-500"   },
  { label: "Asthma/Resp.", count: 21, pct: 36, color: "bg-purple-500" },
  { label: "Cardiac",      count: 17, pct: 29, color: "bg-red-500"    },
  { label: "Others",       count: 29, pct: 50, color: "bg-gray-400"   },
];

/* ── Staff on duty ──────────────────────────────────────────────────── */
const staff = [
  { name: "Dr. Ritika Sahu",  role: "General Physician", online: true,  initials: "RS", color: "bg-amber-300 text-amber-800"  },
  { name: "Nurse Priya Rao",  role: "Head Nurse",        online: true,  initials: "PR", color: "bg-pink-200 text-pink-700"    },
  { name: "Dr. Aman Verma",   role: "Cardiologist",      online: true,  initials: "AV", color: "bg-blue-200 text-blue-700"    },
  { name: "Nurse Suresh K.",  role: "Duty Nurse",        online: false, initials: "SK", color: "bg-green-200 text-green-700"  },
  { name: "Dr. Meena Iyer",   role: "Pathologist",       online: false, initials: "MI", color: "bg-purple-200 text-purple-700"},
];

/* ── Announcements ───────────────────────────────────────────────────  */
const announcements = [
  { tag: "Reminder",  msg: "Monthly staff meeting on Friday, 6 PM — Conference Room B." },
  { tag: "System",    msg: "EMR system maintenance scheduled for Sunday 2–4 AM." },
  { tag: "Inventory", msg: "Amoxicillin stock running low. Reorder requested to pharmacy." },
  { tag: "Holiday",   msg: "Clinic closed on March 25 (Holi). Emergency only." },
];

const tagColor: Record<string, string> = {
  Reminder:  "bg-blue-100 text-blue-700",
  System:    "bg-purple-100 text-purple-700",
  Inventory: "bg-amber-100 text-amber-700",
  Holiday:   "bg-green-100 text-green-700",
};

export default function HomePage() {
  const done    = schedule.filter(s => s.status === "done").length;
  const total   = schedule.filter(s => s.type !== "Break").length;
  const pending = tasks.filter(t => t.urgency === "high").length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* ── Header ── */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dr. Ritika Sahu</h1>
          <p className="text-gray-500 text-sm mt-0.5">General Physician · AUSHADHAM Clinic</p>
        </div>
        <div className="flex items-center gap-3">
          {pending > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">{pending} urgent task{pending > 1 ? "s" : ""}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">{done}/{total} appointments done</span>
          </div>
        </div>
      </header>

      <div className="px-6 py-5 grid grid-cols-3 gap-4">
        {/* ── LEFT COL: Today's Schedule + Pending Tasks ── */}
        <div className="col-span-2 space-y-4">
          <Card className="rounded-2xl shadow-sm border-gray-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-teal-600" />
                  Today&apos;s Schedule
                </h2>
                <Link href="/appointments">
                  <Button variant="ghost" size="sm" className="text-xs text-teal-600 hover:bg-teal-50 gap-1">
                    Full view <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-100" />
                <div className="space-y-1">
                  {schedule.map((s, i) => (
                    <div key={i} className={`flex items-start gap-4 py-2.5 px-2 rounded-xl transition-colors ${s.status === "current" ? "bg-teal-50" : ""}`}>
                      <span className="text-xs font-mono text-gray-400 w-10 flex-shrink-0 pt-0.5">{s.time}</span>
                      <div className="relative flex items-center justify-center w-3 flex-shrink-0 mt-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.type === "Break" ? "bg-amber-300" : statusDot[s.status]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${s.status === "current" ? "text-teal-700" : "text-gray-700"}`}>{s.patient}</p>
                          {s.type !== "Break" && (
                            <Badge className={`text-[10px] px-1.5 py-0 ${s.type === "Online" ? "bg-teal-100 text-teal-700" : "bg-blue-100 text-blue-700"}`}>{s.type}</Badge>
                          )}
                        </div>
                        {s.condition && <p className="text-xs text-gray-400 mt-0.5">{s.condition}</p>}
                      </div>
                      {s.status === "current" && (
                        <Badge className="bg-teal-600 text-white text-[10px] px-1.5 py-0 flex-shrink-0">Now</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-gray-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Pending Tasks
                  <Badge className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0 ml-1">{tasks.filter(t => t.urgency === "high").length} urgent</Badge>
                </h2>
                <span className="text-xs text-gray-400">{tasks.length} total</span>
              </div>
              <div className="space-y-2">
                {tasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${urgencyStyle[t.urgency]}`}>
                      <t.icon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{t.text}</p>
                    <Badge className={`text-[10px] px-1.5 py-0 flex-shrink-0 ${urgencyStyle[t.urgency]}`}>{t.urgency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT COL ── */}
        <div className="space-y-4">
          {/* Patient Condition Breakdown */}
          <Card className="rounded-2xl shadow-sm border-gray-100">
            <CardContent className="p-5">
              <h2 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Patient Breakdown
              </h2>
              <p className="text-xs text-gray-400 mb-4">Top conditions · 147 total patients</p>
              <div className="space-y-3">
                {conditionBreakdown.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">{c.label}</span>
                      <span className="text-xs font-semibold text-gray-700">{c.count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/patients" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full text-xs rounded-xl border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600">
                  View all patients <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Staff on Duty */}
          <Card className="rounded-2xl shadow-sm border-gray-100">
            <CardContent className="p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-purple-500" />
                Staff on Duty
              </h2>
              <ScrollArea className="max-h-48">
                <div className="space-y-2.5">
                  {staff.map((s) => (
                    <div key={s.name} className="flex items-center gap-2.5">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`text-[10px] font-semibold ${s.color}`}>{s.initials}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${s.online ? "bg-green-500" : "bg-gray-300"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{s.name}</p>
                        <p className="text-[10px] text-gray-400">{s.role}</p>
                      </div>
                      {s.online ? <Wifi className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> : <WifiOff className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="rounded-2xl shadow-sm border-gray-100">
            <CardContent className="p-5">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Announcements
              </h2>
              <div className="space-y-2.5">
                {announcements.map((a, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2">
                      <Badge className={`text-[10px] px-1.5 py-0 flex-shrink-0 mt-0.5 ${tagColor[a.tag]}`}>{a.tag}</Badge>
                      <p className="text-xs text-gray-600 leading-relaxed">{a.msg}</p>
                    </div>
                    {i < announcements.length - 1 && <Separator className="mt-2.5" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
