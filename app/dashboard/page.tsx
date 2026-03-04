import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-24">
      <LayoutDashboard className="w-14 h-14 text-emerald-300" />
      <p className="text-2xl font-bold text-gray-700">Dashboard Overview</p>
      <p className="text-sm text-gray-400">Mock page — Dashboard analytics will appear here.</p>
    </div>
  );
}
