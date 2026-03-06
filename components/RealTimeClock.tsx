"use client";
import { useEffect, useState } from "react";

export default function RealTimeClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const datePart = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isToday = (() => {
    const d = new Date();
    return now.getDate() === d.getDate() && now.getMonth() === d.getMonth() && now.getFullYear() === d.getFullYear();
  })();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-700">{datePart}</span>
      {isToday && <span className="text-teal-600 font-semibold">Today</span>}
    </div>
  );
}
