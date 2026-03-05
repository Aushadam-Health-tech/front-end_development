"use client";

import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Briefcase, CheckSquare, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: ElementType;
  accent: string;        // bg colour for icon circle
  iconColor: string;     // icon text colour
}

const stats: Stat[] = [
  {
    label: "Total Users",
    value: "1,240",
    change: "+12% this month",
    positive: true,
    icon: Users,
    accent: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Revenue",
    value: "₹48,295",
    change: "+8.3% this month",
    positive: true,
    icon: DollarSign,
    accent: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    label: "Projects",
    value: "24",
    change: "-2 from last week",
    positive: false,
    icon: Briefcase,
    accent: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    label: "Tasks",
    value: "183",
    change: "+31 this week",
    positive: true,
    icon: CheckSquare,
    accent: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.positive ? TrendingUp : TrendingDown;
        return (
          <Card
            key={stat.label}
            className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white"
          >
            <CardContent className="p-5 flex flex-col gap-3">
              {/* Icon + label row */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                    stat.accent
                  )}
                >
                  <Icon className={cn("w-4.5 h-4.5", stat.iconColor)} />
                </div>
              </div>

              {/* Value */}
              <p className="text-2xl font-bold text-gray-800 tracking-tight">
                {stat.value}
              </p>

              {/* Trend badge */}
              <Badge
                variant="secondary"
                className={cn(
                  "w-fit text-[11px] font-medium gap-1 px-2 py-0.5 rounded-lg border-0",
                  stat.positive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                )}
              >
                <TrendIcon className="w-3 h-3" />
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
