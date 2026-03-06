import Header from "@/components/dashboard/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import EmergencyCard from "@/components/dashboard/EmergencyCard";
import MetricsCard from "@/components/dashboard/MetricsCard";
import UpdatesPanel from "@/components/dashboard/UpdatesPanel";
import AppointmentsTable from "@/components/dashboard/AppointmentsTable";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <Header />

      {/* Page Body */}
      <main className="flex-1 p-5 lg:p-6 space-y-5">
        {/* Stat Cards */}
        <StatsGrid />

        {/* 2-column grid: left content + right panel */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">
            {/* Emergency Messages */}
            <EmergencyCard />

            {/* Appointments Table */}
            <AppointmentsTable />
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">
            {/* Metrics Card */}
            <MetricsCard />

            {/* Updates Panel */}
            <UpdatesPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
