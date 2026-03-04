"use client";

import { Activity, Users, ClipboardList, TrendingUp, ArrowRight, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const quickStats = [
  { label: "Total Patients", value: "1,250", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Today's Appointments", value: "18", icon: ClipboardList, color: "bg-teal-100 text-teal-600" },
  { label: "Pending Reports", value: "7", icon: Activity, color: "bg-amber-100 text-amber-600" },
  { label: "Recovery Rate", value: "94%", icon: TrendingUp, color: "bg-green-100 text-green-600" },
];

const recentActivity = [
  { name: "Rohan Mehra", action: "Appointment confirmed", time: "9:00 AM", type: "appointment" },
  { name: "Laxmi Iyer", action: "Lab report uploaded", time: "8:45 AM", type: "report" },
  { name: "Swati Naydu", action: "New message received", time: "8:30 AM", type: "message" },
  { name: "Akash Reddy", action: "Surgery scheduled", time: "8:00 AM", type: "surgery" },
  { name: "Nupur Baghva", action: "Follow-up reminder", time: "7:50 AM", type: "reminder" },
];

const quickLinks = [
  { label: "View Appointments", href: "/appointments", color: "bg-teal-600 hover:bg-teal-700", icon: ClipboardList },
  { label: "Patient Records", href: "/patients", color: "bg-blue-600 hover:bg-blue-700", icon: Users },
  { label: "Open Calendar", href: "/calendar", color: "bg-purple-600 hover:bg-purple-700", icon: Activity },
  { label: "Messages", href: "/messages", color: "bg-amber-500 hover:bg-amber-600", icon: Bell },
];

const typeColor: Record<string, string> = {
  appointment: "bg-teal-100 text-teal-700",
  report: "bg-blue-100 text-blue-700",
  message: "bg-amber-100 text-amber-700",
  surgery: "bg-red-100 text-red-700",
  reminder: "bg-purple-100 text-purple-700",
};

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Ritika Sahu 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening at your clinic today.</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          {quickStats.map((s) => (
            <Card key={s.label} className="rounded-2xl shadow-sm border-gray-100">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Recent Activity */}
          <div className="col-span-2">
            <Card className="rounded-2xl shadow-sm border-gray-100 h-full">
              <CardContent className="p-5">
                <h2 className="font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                      <Avatar className="w-9 h-9 flex-shrink-0">
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-xs font-semibold">
                          {a.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.action}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-400">{a.time}</span>
                        <Badge className={`text-[10px] px-1.5 py-0 ${typeColor[a.type]}`}>{a.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="rounded-2xl shadow-sm border-gray-100">
              <CardContent className="p-5">
                <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {quickLinks.map((l) => (
                    <Link key={l.label} href={l.href}>
                      <Button className={`w-full justify-between text-white ${l.color} rounded-xl mb-1`}>
                        <div className="flex items-center gap-2">
                          <l.icon className="w-4 h-4" />
                          <span className="text-sm">{l.label}</span>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-gray-100 bg-teal-50 border-teal-100">
              <CardContent className="p-5">
                <h3 className="font-semibold text-teal-800 text-sm mb-2">Clinic Status</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Beds Available", value: "12/20" },
                    { label: "Doctors On Duty", value: "5" },
                    { label: "Emergency Cases", value: "2" },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between text-teal-700">
                      <span>{s.label}</span>
                      <span className="font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
