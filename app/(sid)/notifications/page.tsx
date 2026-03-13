"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Folder,
  RefreshCw,
  Share2,
  XCircle,
} from "lucide-react";
import { InviteDialog } from "@/components/InviteDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
type NotificationSection = "updates" | "appointments" | "emergency";
type UpdatesFilter = "subscribed" | "regular";
type MedicalFilter = "all" | "scheduled" | "rescheduled" | "cancelled";
type NotificationTone = "upload" | "scheduled" | "rescheduled" | "cancelled" | "emergency";

interface NotificationItem {
  id: number;
  section: NotificationSection;
  filter: UpdatesFilter | MedicalFilter;
  title: string;
  subtitle: string;
  time: string;
  tone: NotificationTone;
}

const notifications: NotificationItem[] = [
  { id: 1, section: "updates", filter: "subscribed", title: "You have a new laboratory medical report.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 2, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 3, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 4, section: "updates", filter: "subscribed", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago", tone: "upload" },
  { id: 5, section: "updates", filter: "regular", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "2 hr ago", tone: "upload" },
  { id: 6, section: "updates", filter: "regular", title: "You have a new medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "3 hr ago", tone: "upload" },

  { id: 7, section: "appointments", filter: "scheduled", title: "You have a new appointment for 1st Sept, 3pm.", subtitle: "Scheduled by patient: Radhika Shetty", time: "30 min ago", tone: "scheduled" },
  { id: 8, section: "appointments", filter: "scheduled", title: "You have a new appointment for 1st Sept, 3pm.", subtitle: "Scheduled by patient: Radhika Shetty", time: "30 min ago", tone: "scheduled" },
  { id: 9, section: "appointments", filter: "cancelled", title: "Your appointment for 11th June, 4 pm was cancelled.", subtitle: "Cancelled by patient: Ramya Reddy", time: "18 min ago", tone: "cancelled" },
  { id: 10, section: "appointments", filter: "rescheduled", title: "You have a reschedule appointment for 31st July, 5 pm.", subtitle: "Rescheduled by patient: Aman Rathod", time: "39 min ago", tone: "rescheduled" },
  { id: 11, section: "appointments", filter: "cancelled", title: "Your appointment for 18th July, 1 pm was cancelled.", subtitle: "Cancelled by patient: Ramya Reddy", time: "30 min ago", tone: "cancelled" },
  { id: 12, section: "appointments", filter: "rescheduled", title: "You have a reschedule appointment for 10th Oct, 11:30 am.", subtitle: "Rescheduled by patient: Aman Rathod", time: "2 days ago", tone: "rescheduled" },

  { id: 13, section: "emergency", filter: "scheduled", title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54", time: "Just now", tone: "emergency" },
  { id: 14, section: "emergency", filter: "scheduled", title: "Severe allergic reaction, swelling in throat, trouble breathing.", subtitle: "Patient: Pramod Iyyer | Age: 65", time: "17 min ago", tone: "emergency" },
  { id: 15, section: "emergency", filter: "rescheduled", title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54", time: "24 min ago", tone: "emergency" },
  { id: 16, section: "emergency", filter: "cancelled", title: "Severe allergic reaction, swelling in throat, trouble breathing.", subtitle: "Patient: Pramod Iyyer | Age: 65", time: "45 min ago", tone: "emergency" },
];

const updatesFilters: UpdatesFilter[] = ["subscribed", "regular"];
const medicalFilters: MedicalFilter[] = ["all", "scheduled", "rescheduled", "cancelled"];

function getFiltered(section: NotificationSection, filter: UpdatesFilter | MedicalFilter) {
  if (filter === "all") {
    return notifications.filter((item) => item.section === section);
  }
  return notifications.filter((item) => item.section === section && item.filter === filter);
}

function NotificationTypeIcon({ tone }: { tone: NotificationTone }) {
  if (tone === "emergency") {
    return (
      <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-[#D64545]" />
      </div>
    );
  }

  if (tone === "cancelled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
        <XCircle className="h-5 w-5 text-red-500" />
      </div>
    );
  }

  if (tone === "rescheduled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <RefreshCw className="h-5 w-5 text-blue-500" />
      </div>
    );
  }

  if (tone === "scheduled") {
    return (
      <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
        <Calendar className="h-5 w-5 text-green-600" />
      </div>
    );
  }

  return (
    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
      <Folder className="h-5 w-5 text-amber-500" />
    </div>
  );
}

function NotificationList({ items }: { items: NotificationItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-90 items-center justify-center px-6 text-center">
        <p className="text-sm font-medium text-teal-700">
          No important updates are available at this time.
          <br />
          Please keep checking Notifications to view them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      {items.map((item) => (
        <Card key={item.id} className="rounded-xl border border-gray-200 p-4 shadow-none">
          <div className="flex items-start gap-3">
            <NotificationTypeIcon tone={item.tone} />
            <div className="min-w-0 flex-1">
              <p className={`text-base font-semibold leading-snug ${item.section === "emergency" ? "text-[#D64545]" : "text-gray-900"}`}>
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
              <p className="mt-1 text-xs text-gray-400">{item.time}</p>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-gray-400" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function NotificationsPage() {
  const [activeDateLabel] = useState("Jun 24, 2022 · Today");
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-gray-50">
      <header className="grid grid-cols-1 gap-3 border-b border-gray-100 bg-white px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-emerald-100">
            <AvatarFallback className="bg-amber-300 text-sm font-semibold text-emerald-900">RS</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <p className="px-2 text-sm font-semibold text-teal-700">{activeDateLabel}</p>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
            <ChevronRight className="h-4 w-4" />
          </Button>
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

      <main className="min-h-0 flex-1 p-4 sm:p-6">
        <div className="h-full rounded-2xl border border-gray-100 bg-white">
          <div className="flex items-center justify-between px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-teal-700">Notifications</h2>
            </div>
            <Button variant="link" className="h-auto p-0 text-sm font-medium text-teal-700 hover:underline">
              View All
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="updates" className="h-[calc(100%-81px)]">
            <TabsList className="grid h-auto w-full grid-cols-1 items-stretch gap-2 rounded-none bg-transparent px-4 py-4 sm:grid-cols-3 sm:gap-3 sm:px-6">
              <TabsTrigger value="updates" className="h-11 w-full justify-center rounded-xl bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700">updates</TabsTrigger>
              <TabsTrigger value="appointments" className="h-11 w-full justify-center rounded-xl bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700">appointments</TabsTrigger>
              <TabsTrigger value="emergency" className="h-11 w-full justify-center rounded-xl bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold capitalize data-[state=active]:bg-emerald-100 data-[state=active]:text-teal-700">emergency</TabsTrigger>
            </TabsList>

            <Separator />

            <TabsContent value="updates" className="mt-0 h-[calc(100%-98px)]">
              <Tabs defaultValue="subscribed" className="h-full">
                <TabsList className="grid h-auto w-full grid-cols-2 items-stretch rounded-none bg-transparent px-4 py-2 sm:px-6">
                  {updatesFilters.map((filter) => (
                    <TabsTrigger key={filter} value={filter} className="h-11 w-full justify-center rounded-none border-b-2 border-transparent px-3 py-2 text-center text-sm font-medium capitalize text-gray-500 data-[state=active]:border-teal-600 data-[state=active]:text-gray-900">
                      {filter}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {updatesFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-48px)]">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFiltered("updates", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="appointments" className="mt-0 h-[calc(100%-98px)]">
              <Tabs defaultValue="all" className="h-full">
                <TabsList className="grid h-auto w-full grid-cols-2 items-stretch rounded-none bg-transparent px-4 py-2 sm:grid-cols-4 sm:px-6">
                  {medicalFilters.map((filter) => (
                    <TabsTrigger key={filter} value={filter} className="h-11 w-full justify-center rounded-none border-b-2 border-transparent px-3 py-2 text-center text-sm font-medium capitalize text-gray-500 data-[state=active]:border-teal-600 data-[state=active]:text-gray-900">
                      {filter}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {medicalFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-48px)]">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFiltered("appointments", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="emergency" className="mt-0 h-[calc(100%-98px)]">
              <Tabs defaultValue="all" className="h-full">
                <TabsList className="grid h-auto w-full grid-cols-2 items-stretch rounded-none bg-transparent px-4 py-2 sm:grid-cols-4 sm:px-6">
                  {medicalFilters.map((filter) => (
                    <TabsTrigger key={filter} value={filter} className="h-11 w-full justify-center rounded-none border-b-2 border-transparent px-3 py-2 text-center text-sm font-medium capitalize text-gray-500 data-[state=active]:border-teal-600 data-[state=active]:text-gray-900">
                      {filter}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {medicalFilters.map((filter) => (
                  <TabsContent key={filter} value={filter} className="mt-0 h-[calc(100%-48px)]">
                    <ScrollArea className="h-full">
                      <NotificationList items={getFiltered("emergency", filter)} />
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
