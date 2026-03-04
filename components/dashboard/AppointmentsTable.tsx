"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Video, Loader2, CheckCircle2 } from "lucide-react";
import {
  mockAppointments,
  type Appointment,
  type AppointmentStatus,
  simulateAsync,
} from "@/data/mockData";

// ── Types ─────────────────────────────────────────────────────────────────────
type JoinState = "idle" | "joining" | "connected";
type StatusFilter = AppointmentStatus | "All";

// ── Style maps ────────────────────────────────────────────────────────────────
const statusStyles: Record<AppointmentStatus, string> = {
  "In-clinic": "bg-emerald-100 text-emerald-700 border-emerald-200",
  Online: "bg-blue-100 text-blue-700 border-blue-200",
  Scheduled: "bg-gray-100 text-gray-500 border-gray-200",
};

// ── Join Now Button ───────────────────────────────────────────────────────────
function JoinButton({
  aptId,
  isActive,
  joinStates,
  onJoin,
}: {
  aptId: number;
  isActive: boolean | undefined;
  joinStates: Record<number, JoinState>;
  onJoin: (id: number) => void;
}) {
  const state = joinStates[aptId] ?? "idle";

  if (!isActive) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="rounded-xl text-xs h-8 px-4 text-gray-400 border-gray-200"
        disabled
      >
        Join Now
      </Button>
    );
  }

  if (state === "connected") {
    return (
      <Button
        size="sm"
        className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl gap-1.5 text-xs h-8 px-4"
        disabled
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        Connected
      </Button>
    );
  }

  if (state === "joining") {
    return (
      <Button
        size="sm"
        className="bg-emerald-500 text-white rounded-xl gap-1.5 text-xs h-8 px-4"
        disabled
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Joining…
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5 text-xs h-8 px-4"
      onClick={() => onJoin(aptId)}
    >
      <Video className="w-3.5 h-3.5" />
      Join Now
    </Button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AppointmentsTable() {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [joinStates, setJoinStates] = useState<Record<number, JoinState>>({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const handleJoin = useCallback(async (id: number) => {
    setJoinStates((prev) => ({ ...prev, [id]: "joining" }));
    console.log(`[Dashboard] Joining appointment #${id}…`);
    await simulateAsync(null, 1800);
    setJoinStates((prev) => ({ ...prev, [id]: "connected" }));
    console.log(`[Dashboard] Connected to appointment #${id}.`);
  }, []);

  const filtered =
    statusFilter === "All"
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  const remaining = appointments.filter(
    (a) => (joinStates[a.id] ?? "idle") !== "connected"
  ).length;

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100">
      <CardHeader className="pb-3 pt-5 px-5">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-gray-800">
            My Today&apos;s Appointments
          </h2>
          <Button
            variant="ghost"
            className="text-xs text-emerald-600 font-medium h-7 px-2 hover:text-emerald-700 w-fit"
          >
            View All
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">
              {appointments.length}
            </span>
            <span className="text-sm font-medium text-gray-600">Total Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Remaining Patients</span>
            <span className="w-8 h-8 rounded-full bg-yellow-400 text-white text-sm font-bold flex items-center justify-center">
              {remaining}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        {/* Table Header */}
        <div className="grid grid-cols-[90px_1fr_1fr_110px_140px] gap-2 px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
          <span>Time</span>
          <span>Patient Name</span>
          <span>Reason</span>
          {/* Status column with filter dropdown */}
          <div className="flex items-center gap-1">
            <span>Status</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 text-gray-400 hover:text-gray-600 p-0"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-36">
                {(["All", "In-clinic", "Online", "Scheduled"] as StatusFilter[]).map(
                  (opt) => (
                    <DropdownMenuItem
                      key={opt}
                      className={statusFilter === opt ? "font-semibold text-emerald-700" : ""}
                      onClick={() => setStatusFilter(opt)}
                    >
                      {opt}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {statusFilter !== "All" && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 rounded px-1">
                {statusFilter}
              </span>
            )}
          </div>
          <span>Action</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No appointments match &quot;{statusFilter}&quot;.
            </p>
          ) : (
            filtered.map((apt) => (
              <div
                key={apt.id}
                className={`grid grid-cols-[90px_1fr_1fr_110px_140px] gap-2 px-3 py-3.5 items-center rounded-xl transition-colors ${
                  apt.isActive
                    ? "bg-teal-600/5 border-l-2 border-l-teal-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Time */}
                <span className="text-sm text-gray-600 font-medium">{apt.time}</span>

                {/* Patient Name */}
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback
                      className={`${apt.avatarColor} text-gray-700 text-xs font-semibold`}
                    >
                      {apt.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-800 font-medium truncate">
                    {apt.patientName}
                  </span>
                </div>

                {/* Reason */}
                <span className="text-sm text-gray-600 truncate">{apt.reason}</span>

                {/* Status Badge */}
                <div>
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold rounded-full px-3 py-0.5 border ${statusStyles[apt.status]}`}
                  >
                    {apt.status}
                  </Badge>
                </div>

                {/* Action */}
                <JoinButton
                  aptId={apt.id}
                  isActive={apt.isActive}
                  joinStates={joinStates}
                  onJoin={handleJoin}
                />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
