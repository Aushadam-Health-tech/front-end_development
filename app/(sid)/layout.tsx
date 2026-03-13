"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { SettingsModal } from "@/components/SettingsModal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DateProvider } from "@/lib/DateContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <DateProvider>
      <TooltipProvider delayDuration={200}>
        <div 
          className="flex h-screen overflow-hidden bg-gray-50 transition-all duration-200"
          style={{
            filter: settingsOpen ? "blur(4px)" : "blur(0px)",
            pointerEvents: settingsOpen ? "none" : "auto",
          }}
        >
          {/* Fixed overlay sidebar */}
          <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
          {/* Spacer keeps content from going under the collapsed sidebar */}
          <div className="w-20 shrink-0" />
          <div className="flex flex-col flex-1 overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Settings Modal */}
        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </TooltipProvider>
    </DateProvider>
  );
}

