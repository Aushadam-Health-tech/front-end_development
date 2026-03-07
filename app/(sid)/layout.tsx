import Sidebar from "@/components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Fixed overlay sidebar */}
        <Sidebar />
        {/* Spacer keeps content from going under the collapsed sidebar */}
        <div className="w-16 shrink-0" />
        <div className="flex flex-col flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
