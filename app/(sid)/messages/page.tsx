"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, Search, Phone, Video, MoreVertical, Check, CheckCheck, 
  ChevronDown, ChevronUp, User, Mail, MapPin, Heart, Users, 
  FileText, Shield, Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Message {
  id: number;
  from: "doctor" | "patient";
  text: string;
  time: string;
  read: boolean;
}

interface PatientDetails {
  age: number;
  dob: string;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  diagnosis: string[];
}

interface Conversation {
  id: number;
  name: string;
  initials: string;
  color: string;
  lastMsg: string;
  lastTime: string;
  unread: number;
  online: boolean;
  messages: Message[];
  patientDetails: PatientDetails;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1, name: "Rohan Mehra", initials: "RM", color: "bg-blue-200 text-blue-700",
    lastMsg: "Thank you doctor!", lastTime: "09:12", unread: 0, online: true,
    patientDetails: {
      age: 32,
      dob: "03/28/1985",
      gender: "Male",
      bloodGroup: "AB +ve",
      email: "adrain.rasder@gmail.com",
      phone: "+1 (969)-258-5147",
      address: "286, El Camino Real, California, Zip code: 86251",
      diagnosis: ["Diabetes", "BP"],
    },
    messages: [
      { id: 1, from: "patient", text: "Good morning, Doctor. I wanted to ask about my latest report.", time: "08:45", read: true },
      { id: 2, from: "doctor",  text: "Good morning Rohan! Your blood pressure readings have improved significantly.", time: "08:47", read: true },
      { id: 3, from: "patient", text: "That's great news. Should I continue the same medication?", time: "08:50", read: true },
      { id: 4, from: "doctor",  text: "Yes, please continue for another 2 weeks and come for a follow-up on the 28th.", time: "08:55", read: true },
      { id: 5, from: "patient", text: "Understood. Also I've been having mild headaches after the evening dose.", time: "09:10", read: true },
      { id: 6, from: "doctor",  text: "That can be a side effect. Let's switch to the morning dose instead. Try that for a week.", time: "09:11", read: true },
      { id: 7, from: "patient", text: "Thank you doctor!", time: "09:12", read: true },
    ],
  },
  {
    id: 2, name: "Dasha Shah", initials: "DS", color: "bg-pink-200 text-pink-700",
    lastMsg: "I'll keep monitoring my levels.", lastTime: "Yesterday", unread: 2, online: false,
    patientDetails: {
      age: 28,
      dob: "05/15/1998",
      gender: "Female",
      bloodGroup: "O +ve",
      email: "dasha.shah@gmail.com",
      phone: "+1 (555)-123-4567",
      address: "123, Main Street, California, Zip code: 90210",
      diagnosis: ["Diabetes"],
    },
    messages: [
      { id: 1, from: "patient", text: "Doctor, my sugar levels were 180 this morning.", time: "10:30", read: true },
      { id: 2, from: "doctor",  text: "That's higher than usual. What did you have for dinner last night?", time: "10:35", read: true },
      { id: 3, from: "patient", text: "I had rice and dal, nothing too heavy.", time: "10:40", read: false },
      { id: 4, from: "patient", text: "I'll keep monitoring my levels.", time: "10:42", read: false },
    ],
  },
  {
    id: 3, name: "Laxmi Iyer", initials: "LI", color: "bg-purple-200 text-purple-700",
    lastMsg: "Thanks for the quick response!", lastTime: "Yesterday", unread: 0, online: true,
    patientDetails: {
      age: 45,
      dob: "12/10/1980",
      gender: "Female",
      bloodGroup: "B +ve",
      email: "laxmi.iyer@gmail.com",
      phone: "+1 (555)-234-5678",
      address: "456, Park Avenue, New York, Zip code: 10001",
      diagnosis: ["Migraine"],
    },
    messages: [
      { id: 1, from: "patient", text: "Doctor, I wanted to ask about the new prescription for my migraines.", time: "14:00", read: true },
      { id: 2, from: "doctor",  text: "The Sumatriptan should be taken at the first sign of a migraine. Don't wait for it to worsen.", time: "14:05", read: true },
      { id: 3, from: "patient", text: "Got it. What about side effects?", time: "14:10", read: true },
      { id: 4, from: "doctor",  text: "Some drowsiness is normal. Avoid driving for the first few hours after taking it.", time: "14:12", read: true },
      { id: 5, from: "patient", text: "Thanks for the quick response!", time: "14:15", read: true },
    ],
  },
  {
    id: 4, name: "Payal Singh", initials: "PS", color: "bg-green-200 text-green-700",
    lastMsg: "Can I reschedule to next week?", lastTime: "2 days ago", unread: 1, online: false,
    patientDetails: {
      age: 26,
      dob: "08/22/2000",
      gender: "Female",
      bloodGroup: "A +ve",
      email: "payal.singh@gmail.com",
      phone: "+1 (555)-345-6789",
      address: "789, Sunset Blvd, Los Angeles, Zip code: 90028",
      diagnosis: ["PCOS"],
    },
    messages: [
      { id: 1, from: "patient", text: "Hi Doctor, I had my PCOS scan done. The report is attached.", time: "11:00", read: true },
      { id: 2, from: "doctor",  text: "Thank you Payal. I'll review it and update your treatment plan.", time: "11:30", read: true },
      { id: 3, from: "patient", text: "Can I reschedule to next week?", time: "16:00", read: false },
    ],
  },
  {
    id: 5, name: "Akash Reddy", initials: "AR", color: "bg-amber-200 text-amber-700",
    lastMsg: "See you then.", lastTime: "3 days ago", unread: 0, online: false,
    patientDetails: {
      age: 58,
      dob: "02/14/1968",
      gender: "Male",
      bloodGroup: "O +ve",
      email: "akash.reddy@gmail.com",
      phone: "+1 (555)-456-7890",
      address: "321, Ocean Drive, Miami, Zip code: 33139",
      diagnosis: ["Glaucoma"],
    },
    messages: [
      { id: 1, from: "patient", text: "Doctor, my eye pressure has been building up again.", time: "09:00", read: true },
      { id: 2, from: "doctor",  text: "Please apply the eye drops twice daily and avoid strong light.", time: "09:15", read: true },
      { id: 3, from: "patient", text: "Okay, my appointment is on the 3rd right?", time: "09:17", read: true },
      { id: 4, from: "doctor",  text: "Yes, 10 AM on the 3rd.", time: "09:18", read: true },
      { id: 5, from: "patient", text: "See you then.", time: "09:19", read: true },
    ],
  },
];

export default function MessagesPage() {
  const [convos, setConvos] = useState(CONVERSATIONS);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [convoFilter, setConvoFilter] = useState<"all" | "unread">("all");
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = convos.find(c => c.id === activeId)!;

  const filteredConvos = convos.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = convoFilter === "all" || c.unread > 0;
    return matchSearch && matchFilter;
  });

  const openConvo = (id: number) => {
    setActiveId(id);
    setShowPatientDetails(false); // Close patient details when switching conversations
    // Mark all messages as read
    setConvos(cs => cs.map(c =>
      c.id === id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c
    ));
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(), from: "doctor",
      text: input.trim(), time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setConvos(cs => cs.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], lastMsg: newMsg.text, lastTime: newMsg.time }
        : c
    ));
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length]);

  return (
    <div className="flex-1 flex overflow-hidden bg-gray-50">
      {/* Conversation list */}
      <div className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-gray-200 text-sm"
            />
          </div>
        </div>

        {/* All / Unread filter */}
        <div className="px-4 pt-3 pb-1 shrink-0">
          <Tabs value={convoFilter} onValueChange={(v) => setConvoFilter(v as "all" | "unread")}>
            <TabsList className="w-full grid grid-cols-2 h-8 rounded-lg bg-gray-100">
              <TabsTrigger value="all" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">All</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs rounded-md data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">
                Unread {convos.filter(c => c.unread > 0).length > 0 && `(${convos.filter(c => c.unread > 0).length})`}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-2">
            {filteredConvos.map(c => (
              <button
                key={c.id}
                onClick={() => openConvo(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                  activeId === c.id ? "bg-teal-50 border-r-2 border-teal-500" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className={`text-xs font-semibold ${c.color}`}>{c.initials}</AvatarFallback>
                  </Avatar>
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{c.lastTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-500 truncate">{c.lastMsg}</p>
                    {c.unread > 0 && (
                      <Badge className="bg-teal-600 text-white text-[10px] px-1.5 py-0 ml-1 shrink-0">{c.unread}</Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-100 px-3 sm:px-5 py-3 flex items-center justify-between shrink-0 gap-2 overflow-x-auto">
          <button 
            onClick={() => setShowPatientDetails(!showPatientDetails)}
            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors shrink-0"
          >
            <div className="relative shrink-0">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`text-sm font-semibold ${active.color}`}>{active.initials}</AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="text-left min-w-0">
              <p className="font-semibold text-gray-800 truncate">{active.name}</p>
              <p className="text-xs text-teal-600 whitespace-nowrap">{active.online ? "Active" : "Offline"}</p>
            </div>
          </button>
          <div className="flex items-center gap-1 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100"><Phone className="w-4 h-4 text-gray-500" /></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Voice call</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100"><Video className="w-4 h-4 text-gray-500" /></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Video call</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-gray-100"><MoreVertical className="w-4 h-4 text-gray-500" /></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">More options</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-5 py-4 bg-gray-50 overflow-y-auto">
          <div className="space-y-3 max-w-2xl mx-auto">
            {active.messages.map((msg, idx) => {
              const isDoctor = msg.from === "doctor";
              const showAvatar = idx === 0 || active.messages[idx - 1].from !== msg.from;
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isDoctor ? "flex-row-reverse" : "flex-row"}`}>
                  {showAvatar && !isDoctor ? (
                    <Avatar className="w-7 h-7 shrink-0 mb-0.5">
                      <AvatarFallback className={`text-[10px] font-semibold ${active.color}`}>{active.initials}</AvatarFallback>
                    </Avatar>
                  ) : !isDoctor ? <div className="w-7 shrink-0" /> : null}

                  <div className={`max-w-[65%] ${isDoctor ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isDoctor
                        ? "bg-teal-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${isDoctor ? "flex-row-reverse" : ""}`}>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                      {isDoctor && (
                        msg.read
                          ? <CheckCheck className="w-3 h-3 text-teal-400" />
                          : <Check className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </div>

        <Separator />

        {/* Input bar */}
        <div className="bg-white px-5 py-3 flex items-end gap-3 shrink-0">
          <Textarea
            placeholder={`Message ${active.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            className="flex-1 rounded-xl border-gray-200 resize-none min-h-10 max-h-32"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl w-10 h-10 p-0 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Patient Details Panel */}
      {showPatientDetails && (
        <div className="w-80 bg-white border-l border-gray-100 shrink-0 flex flex-col">
          {/* Patient Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={`text-sm font-semibold ${active.color}`}>{active.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">{active.name}</p>
                <p className="text-xs text-red-500">Diagnosed: <span className="font-semibold">{active.patientDetails.diagnosis.join(" | ")}</span></p>
              </div>
            </div>
            <button onClick={() => setShowPatientDetails(false)}>
              <ChevronUp className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-5 space-y-4">
              {/* Patient Details Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Patient Details</h3>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit2 className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{active.patientDetails.age} years ({active.patientDetails.dob})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{active.patientDetails.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{active.patientDetails.bloodGroup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600 truncate">{active.patientDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{active.patientDetails.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span className="text-gray-600">{active.patientDetails.address}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Medical History */}
              <div>
                <button className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Medical History</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <Separator />

              {/* Allergies */}
              <div>
                <button className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Allergies</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <Separator />

              {/* Family History */}
              <div>
                <button className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Family History</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <Separator />

              {/* Attachments */}
              <div>
                <button className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Attachments</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <Separator />

              {/* Insurance Details */}
              <div>
                <button className="w-full flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Insurance Details</h3>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
