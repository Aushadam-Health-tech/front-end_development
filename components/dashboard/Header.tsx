"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  UserPlus,
  ChevronDown,
  CalendarDays,
  Loader2,
  Mail,
  User,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { mockDates } from "@/data/mockData";
import { sendInvite } from "@/lib/mock-api";

const ROLES = ["Doctor", "Nurse", "Admin", "Staff"] as const;

const EMPTY_FORM = {
  name: "",
  email: "",
  role: "",
  department: "",
  message: "",
};

export default function Header() {
  const todayIndex = mockDates.indexOf("Jun 24, 2022");
  const [dateIndex, setDateIndex] = useState(todayIndex >= 0 ? todayIndex : 0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});
  const [loading, setLoading] = useState(false);

  const currentDate = mockDates[dateIndex];
  const isToday = dateIndex === todayIndex;

  function prev() { setDateIndex((i) => Math.max(0, i - 1)); }
  function next() { setDateIndex((i) => Math.min(mockDates.length - 1, i + 1)); }

  function handleClose() {
    setOpen(false);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.role) e.role = "Please select a role.";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      await sendInvite(form);
      handleClose();
      toast.success("Invitation sent!", {
        description: `${form.name} (${form.email}) has been invited as ${form.role}.`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Left: Doctor Info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-11 h-11 border-2 border-emerald-200">
          <AvatarImage src="/doctor-avatar.jpg" alt="Dr. Ritika Sahu" />
          <AvatarFallback className="bg-amber-400 text-white font-semibold text-sm">
            RS
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-gray-500">Welcome back,</p>
          <h1 className="text-lg font-bold text-gray-800">Hi! Dr. Ritika Sahu</h1>
        </div>
      </div>

      {/* Right: Date Navigator + Invite */}
      <div className="flex items-center gap-3">
        {/* Date Navigator */}
        <div className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-700" disabled={dateIndex === 0} onClick={prev}>
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-7 px-2 text-sm font-medium text-gray-700 gap-1 hover:bg-transparent">
                <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                {currentDate}
                {isToday && <span className="text-emerald-600 font-semibold ml-1">Today</span>}
                <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuLabel className="text-xs text-gray-400 font-normal">Select Date</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockDates.map((date, i) => (
                <DropdownMenuItem
                  key={date}
                  className={dateIndex === i ? "font-semibold text-emerald-700 bg-emerald-50" : ""}
                  onClick={() => setDateIndex(i)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{date}</span>
                    {i === todayIndex && (
                      <span className="text-[10px] text-emerald-600 bg-emerald-100 rounded px-1 font-semibold">Today</span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-gray-700" disabled={dateIndex === mockDates.length - 1} onClick={next}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Invite Button */}
        <Button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 px-4"
        >
          <UserPlus className="w-4 h-4" />
          Invite
        </Button>
      </div>

      {/* Invite Modal */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-800">Invite Team Member</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Send an invitation to a colleague to join the dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Dr. Anita Sharma"
                value={form.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: undefined })); }}
                className={errors.name ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="anita@aushodam.in"
                value={form.email}
                onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">
                Role <span className="text-red-500">*</span>
              </label>
              <Select
                value={form.role}
                onValueChange={(v) => { setForm((f) => ({ ...f, role: v })); setErrors((er) => ({ ...er, role: undefined })); }}
              >
                <SelectTrigger className={errors.role ? "border-red-400 focus:ring-red-400" : ""}>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Department
              </label>
              <Input
                placeholder="e.g. Cardiology"
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Message (optional)</label>
              <Textarea
                placeholder="Add a personal note to the invitation…"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" className="rounded-xl" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
              ) : (
                <><UserPlus className="w-4 h-4" /> Send Invite</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
