import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-24">
      <Bell className="w-14 h-14 text-emerald-300" />
      <p className="text-2xl font-bold text-gray-700">Notifications</p>
      <p className="text-sm text-gray-400">Mock page — System notifications will appear here.</p>
    </div>
  );
}
