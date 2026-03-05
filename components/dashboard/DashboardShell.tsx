"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50/60">
      {/* Sidebar — receives & controls collapsed state */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      {/* Main content — shifts based on sidebar width */}
      <div
        className={cn(
          "flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out",
          collapsed ? "ml-18" : "ml-60"
        )}
      >
        {children}
      </div>
    </div>
  );
}
