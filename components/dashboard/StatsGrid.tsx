"use client";

import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, AlertTriangle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: number;
  badge: string;
  icon: ElementType;
  accent: string;
  iconColor: string;
  badgeStyle: string;
}

const stats: Stat[] = [
  {
    label: "Total Patients",
    value: 124,
    badge: "+8 new this week",
    icon: Users,
    accent: "bg-blue-50",
    iconColor: "text-blue-500",
    badgeStyle: "bg-blue-50 text-blue-700",
  },
  {
    label: "Today's Appointments",
    value: 10,
    badge: "3 remaining",
    icon: Calendar,
    accent: "bg-emerald-50",
    iconColor: "text-emerald-500",
    badgeStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Emergency Alerts",
    value: 2,
    badge: "Needs attention",
    icon: AlertTriangle,
    accent: "bg-red-50",
    iconColor: "text-red-500",
    badgeStyle: "bg-red-50 text-red-600",
  },
  {
    label: "Pending Lab Reports",
    value: 6,
    badge: "Awaiting review",
    icon: FileText,
    accent: "bg-amber-50",
    iconColor: "text-amber-500",
    badgeStyle: "bg-amber-50 text-amber-700",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white"
          >
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", stat.accent)}>
                  <Icon className={cn("w-4.5 h-4.5", stat.iconColor)} />
                </div>
              </div>

              <p className="text-2xl font-bold text-gray-800 tracking-tight">
                {stat.value}
              </p>

              <Badge
                variant="secondary"
                className={cn("w-fit text-[11px] font-medium px-2 py-0.5 rounded-lg border-0", stat.badgeStyle)}
              >
                {stat.badge}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
