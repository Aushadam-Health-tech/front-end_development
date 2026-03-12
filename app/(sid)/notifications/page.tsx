"use client";

import { useState } from "react";
import {
  Bell, ChevronRight, Calendar, AlertTriangle, LayoutGrid,
  FileText, Share2, XCircle, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DateSelector } from "@/components/DateSelector";
import { InviteDialog } from "@/components/InviteDialog";

type Section = "updates" | "appointments" | "emergency";
type ApptType = "scheduled" | "rescheduled" | "cancelled";

interface NotifItem {
  id: number;
  section: Section;
  updateTab?: "subscribed" | "regular";
  apptType?: ApptType;
  title: string;
  subtitle: string;
  time: string;
}

const NOTIFS: NotifItem[] = [
  // Updates – Subscribed
  { id: 1,  section: "updates", updateTab: "subscribed", title: "You have a new laboratory medical reports.", subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  { id: 2,  section: "updates", updateTab: "subscribed", title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  { id: 3,  section: "updates", updateTab: "subscribed", title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  { id: 4,  section: "updates", updateTab: "subscribed", title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  { id: 5,  section: "updates", updateTab: "subscribed", title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  { id: 6,  section: "updates", updateTab: "subscribed", title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago"  },
  // Updates – Regular
  { id: 7,  section: "updates", updateTab: "regular",    title: "You have a new medical reports.",            subtitle: "Uploaded by patient: Rohan Mehra",    time: "2 hr ago"  },
  { id: 8,  section: "updates", updateTab: "regular",    title: "System update available.",                   subtitle: "Platform system notification",         time: "3 hr ago"  },
  // Appointments – Scheduled
  { id: 9,  section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  { id: 10, section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  { id: 11, section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  { id: 12, section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  { id: 13, section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  { id: 14, section: "appointments", apptType: "scheduled",   title: "You have a new appointment for 1st Sept, 3pm.",          subtitle: "Scheduled by patient: Radhika Shetty",   time: "30 min ago" },
  // Appointments – Rescheduled
  { id: 15, section: "appointments", apptType: "rescheduled", title: "You have a reschedule appointment for 16th June, 11 am.",  subtitle: "Rescheduled by patient: Aman Rathod",    time: "5 min ago"  },
  { id: 16, section: "appointments", apptType: "rescheduled", title: "You have a reschedule appointment for 1st Aug, 4 pm.",    subtitle: "Rescheduled by patient: Aman Rathod",    time: "26 min ago" },
  { id: 17, section: "appointments", apptType: "rescheduled", title: "You have a reschedule appointment for 31st July, 5 pm.",  subtitle: "Rescheduled by patient: Aman Rathod",    time: "39 min ago" },
  { id: 18, section: "appointments", apptType: "rescheduled", title: "You have a reschedule appointment for 22nd Aug, 12:30 pm.", subtitle: "Rescheduled by patient: Aman Rathod", time: "2 hr ago"   },
  { id: 19, section: "appointments", apptType: "rescheduled", title: "You have a reschedule appointment for 10th Oct, 11:30 am.", subtitle: "Rescheduled by patient: Aman Rathod", time: "2 days ago" },
  // Appointments – Cancelled
  { id: 20, section: "appointments", apptType: "cancelled",   title: "Your appointment for 1st June, 1 pm was cancelled.",      subtitle: "Cancelled by patient: Ramya Reddy",      time: "18 min ago" },
  { id: 21, section: "appointments", apptType: "cancelled",   title: "You have a reschedule appointment for 22nd Aug, 11am.",   subtitle: "Cancelled by patient: Ramya Reddy",      time: "2 min ago"  },
  { id: 22, section: "appointments", apptType: "cancelled",   title: "Your appointment for 11th June, 4 pm was cancelled.",     subtitle: "Cancelled by patient: Ramya Reddy",      time: "18 min ago" },
  { id: 23, section: "appointments", apptType: "cancelled",   title: "Your appointment for 18th July, 1 pm was cancelled.",     subtitle: "Cancelled by patient: Ramya Reddy",      time: "30 min ago" },
  // Emergency
  { id: 24, section: "emergency", apptType: "scheduled",   title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54",   time: "Just now"   },
  { id: 25, section: "emergency", apptType: "scheduled",   title: "Severe allergic reaction, swelling in throat, trouble breathing.",                subtitle: "Patient: Pramod Iyyer | Age: 65", time: "17 min ago" },
  { id: 26, section: "emergency", apptType: "scheduled",   title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54",   time: "24 min ago" },
  { id: 27, section: "emergency", apptType: "rescheduled", title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54",   time: "45 min ago" },
  { id: 28, section: "emergency", apptType: "cancelled",   title: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.", subtitle: "Patient: Ramya Reddy | Age: 54",   time: "1 hr ago"   },
];

const SECTIONS: { key: Section; label: string; icon: React.ElementType }[] = [
  { key: "updates",      label: "Updates",      icon: LayoutGrid    },
  { key: "appointments", label: "Appointments", icon: Calendar      },
  { key: "emergency",    label: "Emergency",    icon: AlertTriangle },
];

const TABS_BY_SECTION: Record<Section, string[]> = {
  updates:      ["subscribed", "regular"],
  appointments: ["all", "scheduled", "rescheduled", "cancelled"],
  emergency:    ["all", "scheduled", "rescheduled", "cancelled"],
};

const TAB_LABELS: Record<string, string> = {
  subscribed: "Subscribed", regular: "Regular",
  all: "All", scheduled: "Scheduled", rescheduled: "Rescheduled", cancelled: "Cancelled",
};

function getItems(section: Section, tab: string): NotifItem[] {
  if (section === "updates") return NOTIFS.filter(n => n.section === "updates" && n.updateTab === tab);
  if (tab === "all") return NOTIFS.filter(n => n.section === section);
  return NOTIFS.filter(n => n.section === section && n.apptType === tab);
}

function NotifIcon({ section, apptType }: { section: Section; apptType?: ApptType }) {
  if (section === "emergency") {
    return <AlertTriangle className="w-8 h-8 text-orange-500 shrink-0" />;
  }
  if (section === "updates") {
    return (
      <div className="relative shrink-0">
        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-amber-500" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
      </div>
    );
  }
  if (apptType === "rescheduled") {
    return (
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
        <RefreshCw className="w-5 h-5 text-blue-500" />
      </div>
    );
  }
  if (apptType === "cancelled") {
    return <XCircle className="w-10 h-10 text-red-500 shrink-0" />;
  }
  // scheduled (default)
  return (
    <div className="relative shrink-0">
      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
        <FileText className="w-5 h-5 text-green-600" />
      </div>
      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    </div>
  );
}

function EmptyState({ section }: { section: Section }) {
  if (section === "updates") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <p className="text-teal-700 font-medium text-sm leading-relaxed">
          No important updates are available at this time.
          <br />
          For general notifications unrelated to patient records or reports,
        </p>
        <p className="text-teal-700 font-medium text-sm mt-4">
          Please keep checking{" "}
          <span className="font-bold underline cursor-pointer">Notifications</span>
          {" "}to view them.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Bell className="w-10 h-10 mb-3 opacity-30" />
      <p className="text-sm">No notifications</p>
    </div>
  );
}

export default function NotificationsPage() {
  const [activeSection, setActiveSection] = useState<Section>("updates");
  const [inviteOpen, setInviteOpen] = useState(false);

  const tabs = TABS_BY_SECTION[activeSection];

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Page Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shrink-0">
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

          {/* Panel Title */}
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>
            <button className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
              View All
            </button>
          </div>

          <Separator />

          {/* Section Selector */}
          <div className="flex items-center gap-10 px-6 py-5">
            {SECTIONS.map(({ key, label, icon: Icon }) => {
              const active = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className="flex flex-col items-center gap-2 focus:outline-none"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      active
                        ? "bg-teal-50 shadow-[0_0_0_3px_rgba(13,148,136,0.2),0_0_20px_rgba(13,148,136,0.25)]"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className={`w-6 h-6 transition-colors ${active ? "text-teal-600" : "text-gray-400"}`} />
                  </div>
                  <span className={`text-xs font-medium transition-colors ${active ? "text-teal-700" : "text-gray-400"}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <Separator />

          {/* Tabs — keyed by section so they reset when section changes */}
          <Tabs key={activeSection} defaultValue={tabs[0]}>
            <TabsList className="w-full justify-start rounded-none bg-transparent h-auto px-6 gap-0 border-b border-gray-100">
              {tabs.map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none px-5 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:text-gray-800 data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {TAB_LABELS[tab]}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(tab => {
              const items = getItems(activeSection, tab);
              return (
                <TabsContent key={tab} value={tab} className="mt-0 focus-visible:ring-0 focus-visible:outline-none">
                  <ScrollArea className="h-[calc(100vh-26rem)]">
                    {items.length === 0 ? (
                      <EmptyState section={activeSection} />
                    ) : (
                      items.map((n, idx) => (
                        <div key={n.id}>
                          <div
                            className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-colors cursor-pointer ${
                              idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                            }`}
                          >
                            <NotifIcon section={activeSection} apptType={n.apptType} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold leading-snug ${activeSection === "emergency" ? "text-red-600" : "text-gray-800"}`}>
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">{n.subtitle}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                          </div>
                          <Separator />
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </TabsContent>
              );
            })}
          </Tabs>

        </div>
      </div>
    </div>
  );
}
