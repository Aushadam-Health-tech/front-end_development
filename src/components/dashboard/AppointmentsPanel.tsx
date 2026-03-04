"use client";

import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Appointment = {
  time: string;
  name: string;
  status: "past" | "current" | "upcoming" | "break" | "overdue" | "pending";
  patient?: string;
  duration?: string;
  purpose?: string;
  apptStatus?: string;
};

const appointments: Appointment[] = [
  { time: "08:00 AM", name: "Consultation Dasha Shah", status: "past" },
  { time: "08:30 AM", name: "Consultation Nupur Baghva", status: "past" },
  {
    time: "09:00 AM", name: "Consultation Rohan Mehra", status: "current",
    patient: "Rohan Mehra", duration: "9:00 - 9:45", purpose: "Report Discussion", apptStatus: "Online Appointment",
  },
  { time: "10:00 AM", name: "Consultation Vibha M", status: "upcoming" },
  { time: "10:30 AM", name: "Team Meeting", status: "upcoming" },
  { time: "11:00 AM", name: "Check Report", status: "pending" },
  { time: "11:15 AM", name: "Eye Surgery | Patient: Akash Reddy", status: "pending" },
  { time: "01:00 PM", name: "30 min Break", status: "break" },
  { time: "01:40 PM", name: "Consultation Laxmi Iyer", status: "pending" },
  { time: "02:15 PM", name: "Consultation Swaminarayna", status: "pending" },
  { time: "03:00 PM", name: "Consultation Rupesh Mishra", status: "overdue" },
  { time: "03:30 PM", name: "Consultation Swati Naydu", status: "pending" },
  { time: "04:00 PM", name: "Consultation Payal Singh", status: "pending" },
];

export default function AppointmentsPanel() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(2);

  return (
    <div className="w-80 flex-shrink-0 bg-white border-l border-gray-100 flex flex-col h-screen overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-800 text-base">Today's Appointments</h2>
        <button className="text-teal-600 text-sm font-medium hover:underline">View All</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {appointments.map((appt, idx) => (
          <div key={idx} className="relative">
            {/* Time dot row */}
            <div
              className={cn(
                "flex items-start gap-3 py-2.5 cursor-pointer group",
              )}
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <span
                className={cn(
                  "text-xs font-medium w-16 flex-shrink-0 mt-0.5",
                  appt.status === "current" ? "text-teal-600 font-bold" : "",
                  appt.status === "overdue" ? "text-red-500 font-bold" : "",
                  appt.status === "break" ? "text-purple-500 font-bold" : "",
                  appt.status === "past" ? "text-gray-400" : "text-gray-700",
                )}
              >
                {appt.time}
              </span>

              {/* Dot */}
              <div className="flex flex-col items-center mt-1">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    appt.status === "current" ? "bg-teal-500" : "",
                    appt.status === "upcoming" ? "bg-gray-800" : "",
                    appt.status === "past" ? "bg-gray-200" : "",
                    appt.status === "overdue" ? "bg-red-500" : "",
                    appt.status === "break" ? "bg-purple-400" : "",
                    appt.status === "pending" ? "bg-gray-300" : "",
                  )}
                />
              </div>

              <span
                className={cn(
                  "text-sm flex-1",
                  appt.status === "current" ? "text-teal-700 font-semibold" : "",
                  appt.status === "past" ? "text-gray-400 line-through" : "text-gray-700",
                  appt.status === "overdue" ? "text-red-500 line-through" : "",
                  appt.status === "break" ? "text-purple-500 font-medium" : "",
                )}
              >
                {appt.name}
              </span>

              {appt.status === "current" && (
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-gray-400 transition-transform flex-shrink-0 mt-0.5",
                    expandedIdx === idx ? "rotate-180" : ""
                  )}
                />
              )}
            </div>

            {/* Expanded detail */}
            {expandedIdx === idx && appt.patient && (
              <div className="ml-[76px] mb-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Patient", value: appt.patient },
                    { label: "Time", value: appt.duration },
                    { label: "Purpose", value: appt.purpose },
                    { label: "Status", value: appt.apptStatus },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4">
                      <span className="text-gray-400 w-16 flex-shrink-0">{label}</span>
                      <span className="text-gray-700 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1.5 bg-teal-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Join Now
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
