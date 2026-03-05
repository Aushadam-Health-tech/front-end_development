"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { mockPatients } from "@/lib/mock-data";

const mockConversations = mockPatients.slice(0, 6).map((p, i) => ({
  id: p.id,
  name: p.name,
  initials: p.initials,
  avatarColor: p.avatarColor,
  preview: ["Lab report is ready for review.", "When is my next appointment?", "I need a prescription refill.", "My symptoms have improved!", "Can we schedule a follow-up?", "I have a question about medications."][i],
  time: ["2 min ago", "15 min ago", "1 hr ago", "3 hr ago", "Yesterday", "2 days ago"][i],
  unread: [3, 1, 0, 0, 2, 0][i],
}));

const mockMessages = [
  { id: 1, from: "patient", text: "Hello Doctor, I wanted to update you on my condition.", time: "09:00 AM" },
  { id: 2, from: "doctor",  text: "Hi! Thank you for reaching out. How are you feeling today?", time: "09:02 AM" },
  { id: 3, from: "patient", text: "I've been having chest tightness since yesterday evening.", time: "09:03 AM" },
  { id: 4, from: "doctor",  text: "That sounds concerning. Have you checked your blood pressure?", time: "09:05 AM" },
  { id: 5, from: "patient", text: "Yes, it was 145/90. Is that too high?", time: "09:06 AM" },
  { id: 6, from: "doctor",  text: "Slightly elevated. I'd like to see you today if possible. Can you come in at 3 PM?", time: "09:08 AM" },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(mockConversations[0]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const filtered = mockConversations.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-gray-100 bg-white">
        <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        <p className="text-sm text-gray-400 mt-0.5">Patient communications</p>
      </div>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-160px)]">

          {/* Contact list */}
          <Card className="rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Search..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-9 h-9 rounded-xl text-sm border-gray-200"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filtered.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selected.id === conv.id ? "bg-emerald-50" : ""}`}
                >
                  <Avatar className="w-9 h-9 shrink-0 mt-0.5">
                    <AvatarFallback className={`${conv.avatarColor} text-gray-700 text-xs font-semibold`}>{conv.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800 truncate">{conv.name}</p>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{conv.preview}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-emerald-500 text-white text-[10px] h-4 px-1.5 rounded-full shrink-0">{conv.unread}</Badge>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Chat window */}
          <Card className="rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className={`${selected.avatarColor} text-gray-700 text-xs font-semibold`}>{selected.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-gray-800">{selected.name}</p>
                <p className="text-xs text-emerald-600">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mockMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === "doctor" ? "bg-emerald-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.from === "doctor" ? "text-emerald-200" : "text-gray-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && setMessage("")}
                className="flex-1 rounded-xl border-gray-200 text-sm"
              />
              <Button
                size="icon"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                onClick={() => setMessage("")}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
