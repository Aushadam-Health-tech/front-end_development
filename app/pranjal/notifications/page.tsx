"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, FileText, CheckCheck, ChevronRight } from "lucide-react";
import { mockNotifications, type Notification, type NotificationCategory } from "@/lib/mock-data";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(mockNotifications);
  const [tab, setTab] = useState<NotificationCategory>("subscribed");

  const subscribed = items.filter(n => n.category === "subscribed");
  const regular    = items.filter(n => n.category === "regular");

  const unreadSubscribed = subscribed.filter(n => !n.read).length;
  const unreadRegular    = regular.filter(n => !n.read).length;

  function markRead(id: number) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }
  function markAllRead() {
    setItems(prev => prev.map(n => n.category === tab ? { ...n, read: true } : n));
  }

  function NotifItem({ item }: { item: Notification }) {
    return (
      <>
        <div
          onClick={() => markRead(item.id)}
          className={`flex items-start gap-3 py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl ${!item.read ? "bg-amber-50/40" : ""}`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${item.read ? "bg-gray-50 border-gray-100" : "bg-amber-50 border-amber-100"}`}>
            <FileText className={`w-4 h-4 ${item.read ? "text-gray-400" : "text-amber-500"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className={`text-sm ${item.read ? "font-medium text-gray-600" : "font-semibold text-gray-800"}`}>{item.title}</p>
              {!item.read && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.uploader}</p>
            <p className="text-xs text-gray-400">{item.time}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-2" />
        </div>
        <Separator />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
            <p className="text-sm text-gray-400 mt-0.5">Stay up to date</p>
          </div>
        </div>
        {(tab === "subscribed" ? unreadSubscribed : unreadRegular) > 0 && (
          <Button variant="outline" className="gap-1.5 rounded-xl text-sm border-gray-200" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      <main className="flex-1 p-6 max-w-2xl">
        <Tabs value={tab} onValueChange={v => setTab(v as NotificationCategory)}>
          <TabsList className="w-full rounded-xl bg-gray-50 border border-gray-100 p-1 mb-4">
            <TabsTrigger value="subscribed" className="flex-1 rounded-lg text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm data-[state=active]:font-semibold">
              Subscribed {unreadSubscribed > 0 && <Badge className="h-4 px-1.5 text-[10px] bg-emerald-500 text-white rounded-full">{unreadSubscribed}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="regular" className="flex-1 rounded-lg text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm data-[state=active]:font-semibold">
              Regular {unreadRegular > 0 && <Badge className="h-4 px-1.5 text-[10px] bg-emerald-500 text-white rounded-full">{unreadRegular}</Badge>}
            </TabsTrigger>
          </TabsList>

          <Card className="rounded-2xl border border-gray-100 shadow-sm">
            <TabsContent value="subscribed">
              <ScrollArea className="h-125">
                {subscribed.map(n => <NotifItem key={n.id} item={n} />)}
                {subscribed.length === 0 && <p className="text-sm text-gray-400 text-center py-10">No notifications.</p>}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="regular">
              <ScrollArea className="h-125">
                {regular.map(n => <NotifItem key={n.id} item={n} />)}
                {regular.length === 0 && <p className="text-sm text-gray-400 text-center py-10">No notifications.</p>}
              </ScrollArea>
            </TabsContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
