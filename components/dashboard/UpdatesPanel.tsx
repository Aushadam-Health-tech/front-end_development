"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUpdates, type UpdateItem, type UpdateCategory } from "@/data/mockData";

// ── Individual Update Row ────────────────────────────────────────────────────
function UpdateRow({
  item,
  onMarkRead,
}: {
  item: UpdateItem;
  onMarkRead: (id: number) => void;
}) {
  return (
    <>
      <div
        className={`flex items-start gap-3 py-3 px-1 group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${
          !item.read ? "bg-amber-50/40" : ""
        }`}
        onClick={() => onMarkRead(item.id)}
      >
        {/* File Icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
            item.read
              ? "bg-gray-50 border-gray-100"
              : "bg-amber-50 border-amber-100"
          }`}
        >
          <FileText className={`w-4 h-4 ${item.read ? "text-gray-400" : "text-amber-500"}`} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p
              className={`text-sm leading-snug ${
                item.read ? "font-medium text-gray-600" : "font-semibold text-gray-800"
              }`}
            >
              {item.title}
            </p>
            {!item.read && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{item.uploader}</p>
          <p className="text-xs text-gray-400">{item.time}</p>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-2" />
      </div>
      <Separator />
    </>
  );
}

// ── Tab Panel ────────────────────────────────────────────────────────────────
function UpdateList({
  items,
  onMarkRead,
}: {
  items: UpdateItem[];
  onMarkRead: (id: number) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-8">No updates yet.</p>
    );
  }
  return (
    <ScrollArea className="h-75 pr-2">
      <div>
        {items.map((item) => (
          <UpdateRow key={item.id} item={item} onMarkRead={onMarkRead} />
        ))}
      </div>
    </ScrollArea>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UpdatesPanel() {
  const [updates, setUpdates] = useState<UpdateItem[]>(mockUpdates);
  const [activeTab, setActiveTab] = useState<UpdateCategory>("subscribed");

  const subscribed = updates.filter((u) => u.category === "subscribed");
  const regular = updates.filter((u) => u.category === "regular");

  const unreadSubscribed = subscribed.filter((u) => !u.read).length;
  const unreadRegular = regular.filter((u) => !u.read).length;

  function markRead(id: number) {
    setUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, read: true } : u))
    );
  }

  function markAllRead() {
    setUpdates((prev) =>
      prev.map((u) =>
        u.category === activeTab ? { ...u, read: true } : u
      )
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm border border-gray-100">
      <CardHeader className="pb-0 pt-5 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-gray-800">Updates</CardTitle>
          {(activeTab === "subscribed" ? unreadSubscribed : unreadRegular) > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-emerald-600 gap-1 h-7 px-2 hover:text-emerald-700"
              onClick={markAllRead}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-3">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as UpdateCategory)}
        >
          <TabsList className="w-full rounded-xl bg-gray-50 p-1 border border-gray-100 mb-3">
            <TabsTrigger
              value="subscribed"
              className="flex-1 rounded-lg text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm data-[state=active]:font-semibold"
            >
              Subscribed
              {unreadSubscribed > 0 && (
                <Badge className="h-4 px-1 text-[10px] bg-emerald-500 text-white rounded-full">
                  {unreadSubscribed}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="regular"
              className="flex-1 rounded-lg text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm data-[state=active]:font-semibold"
            >
              Regular
              {unreadRegular > 0 && (
                <Badge className="h-4 px-1 text-[10px] bg-emerald-500 text-white rounded-full">
                  {unreadRegular}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subscribed">
            <UpdateList items={subscribed} onMarkRead={markRead} />
          </TabsContent>

          <TabsContent value="regular">
            <UpdateList items={regular} onMarkRead={markRead} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
