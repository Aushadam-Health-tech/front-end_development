"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDate } from "@/lib/DateContext";

export function DateSelector() {
  const { selectedDate, goToPreviousDay, goToNextDay } = useDate();

  const isToday = () => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = () => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 text-gray-400 hover:text-gray-600"
        onClick={goToPreviousDay}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm font-medium text-gray-700 px-2">
        {formatDate()}{" "}
        {isToday() && (
          <span className="text-emerald-600 font-semibold">Today</span>
        )}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 text-gray-400 hover:text-gray-600"
        onClick={goToNextDay}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
