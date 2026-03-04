"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Activity, ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockMetrics, type MetricPeriod } from "@/data/mockData";

const periods = Object.keys(mockMetrics) as string[];

const trendConfig = {
  up: { icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  down: { icon: TrendingDown, color: "text-red-500", bg: "bg-red-50" },
  flat: { icon: Minus, color: "text-gray-400", bg: "bg-gray-50" },
} as const;

// Animated number using framer-motion
function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="text-5xl font-bold text-gray-800 tabular-nums"
      >
        {value.toLocaleString()}
      </motion.p>
    </AnimatePresence>
  );
}

export default function MetricsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Weekly");

  const metric: MetricPeriod = mockMetrics[selectedPeriod];
  const Trend = trendConfig[metric.trend];
  const TrendIcon = Trend.icon;

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100 h-full">
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Period Dropdown */}
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 rounded-xl text-sm font-medium text-gray-700 gap-1.5 px-3 border-gray-200"
              >
                {selectedPeriod}
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {periods.map((p) => (
                <DropdownMenuItem
                  key={p}
                  className={selectedPeriod === p ? "font-semibold text-emerald-700" : ""}
                  onClick={() => setSelectedPeriod(p)}
                >
                  {p}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Metric Body */}
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          {/* ECG / Activity Icon */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
            <Activity className="w-7 h-7 text-emerald-600" />
          </div>

          {/* Label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedPeriod + "-label"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-gray-500 font-medium mt-1"
            >
              In-process
            </motion.p>
          </AnimatePresence>

          {/* Number  */}
          <AnimatedNumber value={metric.inProcess} />

          {/* Trend badge */}
          <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${Trend.bg} ${Trend.color}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {metric.trendValue} vs last {selectedPeriod.toLowerCase()}
          </div>
        </div>

        {/* Sub-metrics row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPeriod + "-sub"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3"
          >
            <div className="text-center">
              <p className="text-xs text-gray-400 font-medium mb-0.5">Completed</p>
              <p className="text-lg font-bold text-emerald-600">{metric.completed}</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-0.5">Cancelled</p>
              <p className="text-lg font-bold text-red-400">{metric.cancelled}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
