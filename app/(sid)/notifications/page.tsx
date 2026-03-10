"use client";

import { useState } from "react";
import { Bell, X, Check, CheckCheck, Calendar, FlaskConical, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type NType = "appointment" | "lab" | "message" | "alert";

interface Notification {
  id: number;
  type: NType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL: Notification[] = [
  { id: 1,  type: "appointment", title: "Upcoming Appointment",     body: "Rohan Mehra has an appointment at 09:00 AM today.",                               time: "Just now",     read: false },
  { id: 2,  type: "alert",       title: "Critical Patient Alert",   body: "Rupesh Mishra's vitals are unstable. Immediate attention required.",               time: "5 min ago",    read: false },
  { id: 3,  type: "lab",         title: "Lab Report Ready",         body: "Blood test results for Dasha Shah are now available in the system.",               time: "20 min ago",   read: false },
  { id: 4,  type: "message",     title: "New Message",              body: "Laxmi Iyer: 'Doctor, I wanted to ask about the new prescription...'",             time: "45 min ago",   read: false },
  { id: 5,  type: "appointment", title: "Appointment Rescheduled",  body: "Nupur Baghva moved her appointment from 3 PM to 5 PM today.",                     time: "1 hr ago",     read: true  },
  { id: 6,  type: "lab",         title: "Report Uploaded",          body: "MRI scan report for Akash Reddy has been uploaded and is ready to review.",        time: "2 hrs ago",    read: true  },
  { id: 7,  type: "message",     title: "New Message",              body: "Payal Singh: 'Can I reschedule my appointment to next week?'",                    time: "3 hrs ago",    read: true  },
  { id: 8,  type: "alert",       title: "Medication Reminder",      body: "Prescription renewal required for Swaminarayna — expires in 2 days.",             time: "Yesterday",    read: true  },
];

const TYPE_CONFIG: Record<NType, { icon: React.ElementType; color: string; bg: string }> = {
  appointment: { icon: Calendar,      color: "text-teal-600",   bg: "bg-teal-100"   },
  lab:         { icon: FlaskConical,  color: "text-blue-600",   bg: "bg-blue-100"   },
  message:     { icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-100" },
  alert:       { icon: AlertTriangle, color: "text-red-600",    bg: "bg-red-100"    },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL);
  const [filter, setFilter] = useState<"All" | "Unread">("All");

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifs(ns => ns.filter(n => n.id !== id));
  const markRead = (id: number) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  const visible = filter === "Unread" ? notifs.filter(n => !n.read) : notifs;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex items-center justify-center p-8">
      {/* Modal-style card ~60% of viewport */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ minHeight: "60vh", maxHeight: "75vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
              <p className="text-xs text-gray-500">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0 ml-1">{unreadCount}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAll} className="text-xs text-teal-600 hover:bg-teal-50 gap-1">
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-6 pt-3 pb-0">
          {(["All", "Unread"] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs" : "rounded-lg text-xs text-gray-500"}
            >
              {f} {f === "Unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
            </Button>
          ))}
        </div>

        <Separator className="mt-3" />

        {/* List */}
        <ScrollArea className="flex-1 px-4 py-3">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Bell className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-2">
              {visible.map(n => {
                const cfg = TYPE_CONFIG[n.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${n.read ? "bg-white" : "bg-teal-50/60 border border-teal-100"}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className={`text-sm font-semibold ${n.read ? "text-gray-700" : "text-gray-900"}`}>{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!n.read && (
                        <Button
                          variant="ghost" size="icon"
                          onClick={() => markRead(n.id)}
                          className="w-7 h-7 hover:bg-teal-100 text-teal-600"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => dismiss(n.id)}
                        className="w-7 h-7 hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
