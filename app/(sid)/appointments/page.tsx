"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, ChevronDown, Heart, ShieldAlert, User, Pencil, ChevronUp, Mail, Phone, MapPin, Cake, Droplets, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Appointment = {
  id: number;
  time: string;
  name: string;
  reason: string;
  status: "In-clinic" | "Online";
  gender: string;
  location: string;
  test: string;
  active: boolean;
  initials: string;
  avatarColor: string;
};

const appointments: Appointment[] = [
  {
    id: 1, time: "09:00 AM", name: "Kalyan Rao", reason: "Report Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: true,
    initials: "KR", avatarColor: "bg-orange-200",
  },
  {
    id: 2, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RI", avatarColor: "bg-purple-200",
  },
  {
    id: 3, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RR", avatarColor: "bg-blue-200",
  },
];

// After "Slot free", more appointments
const moreAppointments: Appointment[] = [
  {
    id: 4, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RI", avatarColor: "bg-green-200",
  },
  {
    id: 5, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RI", avatarColor: "bg-pink-200",
  },
  {
    id: 6, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RI", avatarColor: "bg-teal-200",
  },
  {
    id: 7, time: "10:00 AM", name: "Radhika Iyer\nRadhakrishanan", reason: "Lab Test Discussion",
    status: "In-clinic", gender: "Male", location: "K.K..nagar, Chennai",
    test: "Upper Abdomen General – Test Code 2705", active: false,
    initials: "RI", avatarColor: "bg-indigo-200",
  },
];

function AppointmentRow({ apt }: { apt: Appointment }) {
  return (
    <Link
      href={`/appointments/${apt.id}`}
      className={`grid grid-cols-[90px_1fr_1fr_90px_70px_120px_1fr] gap-x-4 items-center px-5 py-4 transition-colors cursor-pointer ${
        apt.active
          ? "bg-teal-50/60 border-l-[3px] border-l-teal-600"
          : "hover:bg-gray-50 border-l-[3px] border-l-transparent"
      }`}
    >
      {/* TIME */}
      <span className={`text-sm font-semibold ${apt.active ? "text-gray-900" : "text-gray-500"}`}>
        {apt.time}
      </span>

      {/* PATIENT NAME */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="w-9 h-9 shrink-0">
          <AvatarImage src="" />
          <AvatarFallback className={`${apt.avatarColor} text-gray-700 text-xs font-semibold`}>
            {apt.initials}
          </AvatarFallback>
        </Avatar>
        <span className={`text-sm leading-tight ${apt.active ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
          {apt.name.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && apt.name.includes("\n") && <br />}
            </span>
          ))}
        </span>
      </div>

      {/* REASON */}
      <span className={`text-sm ${apt.active ? "font-semibold text-gray-900" : "text-gray-600"}`}>
        {apt.reason}
      </span>

      {/* STATUS */}
      <Badge
        variant="outline"
        className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border whitespace-nowrap ${
          apt.status === "In-clinic"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}
      >
        {apt.status}
      </Badge>

      {/* GENDER */}
      <span className={`text-sm ${apt.active ? "font-medium text-gray-900" : "text-gray-600"}`}>
        {apt.gender}
      </span>

      {/* LOCATION */}
      <span className={`text-sm leading-tight ${apt.active ? "font-semibold text-gray-900" : "text-gray-600"}`}>
        {apt.location}
      </span>

      {/* TEST */}
      <span className={`text-sm leading-tight ${apt.active ? "font-medium text-teal-700" : "text-teal-600"}`}>
        {apt.test}
      </span>
    </Link>
  );
}

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("All");
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-emerald-200">
            <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>
        <div className="flex items-center gap-3">
          <DateSelector />
          <Button
            onClick={() => setInviteOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full gap-2 px-5 py-2.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </header>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-5">
          {/* Title + Filter */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-teal-700">My Today&apos;s Appointments</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 text-sm font-medium text-gray-700 gap-1.5 h-9 px-4"
                >
                  {filter}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("In-clinic")}>In-clinic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Online")}>Online</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[90px_1fr_1fr_90px_70px_120px_1fr] gap-x-4 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Patient Name</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Test</span>
            </div>

            {/* Table Body */}
            <ScrollArea className="max-h-[calc(100vh-260px)]">
              <div className="divide-y divide-gray-100">
                {/* First group of appointments */}
                {appointments
                  .filter(a => filter === "All" || a.status === filter)
                  .map((apt) => (
                    <AppointmentRow key={apt.id} apt={apt} />
                  ))}

                {/* Slot free divider */}
                <div className="py-4 text-center border-y border-gray-100">
                  <span className="text-sm text-teal-500 font-medium cursor-pointer hover:text-teal-600 hover:underline transition-colors">
                    Slot free
                  </span>
                </div>

                {/* Second group of appointments */}
                {moreAppointments
                  .filter(a => filter === "All" || a.status === filter)
                  .map((apt) => (
                    <AppointmentRow key={apt.id} apt={apt} />
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
