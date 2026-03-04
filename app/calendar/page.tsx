import { Calendar } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-24">
      <Calendar className="w-14 h-14 text-emerald-300" />
      <p className="text-2xl font-bold text-gray-700">Calendar</p>
      <p className="text-sm text-gray-400">Mock page — Appointment calendar will appear here.</p>
    </div>
  );
}
