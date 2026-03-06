"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Phone, Mail } from "lucide-react";
import { mockPatients, type Patient } from "@/lib/mock-data";

const statusStyles: Record<Patient["status"], string> = {
  Active:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-100 text-gray-500 border-gray-200",
  Critical: "bg-red-100 text-red-600 border-red-200",
};

export default function PatientsPage() {
  const [query, setQuery] = useState("");

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.condition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Patients</h1>
          <p className="text-sm text-gray-400 mt-0.5">{mockPatients.length} total patients</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
          <UserPlus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      <main className="flex-1 p-6">
        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search patients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 rounded-xl border-gray-200 focus-visible:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((patient) => (
            <Card key={patient.id} className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-11 h-11 shrink-0">
                    <AvatarFallback className={`${patient.avatarColor} text-gray-700 font-semibold text-sm`}>
                      {patient.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{patient.name}</p>
                      <Badge variant="outline" className={`text-[11px] rounded-full px-2 py-0.5 shrink-0 ${statusStyles[patient.status]}`}>
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{patient.gender} · Age {patient.age}</p>
                    <p className="text-xs text-emerald-700 bg-emerald-50 rounded-md px-2 py-0.5 mt-1.5 inline-block">
                      {patient.condition}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="truncate">{patient.phone}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Last visit: {patient.lastVisit}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-10 h-10 mb-3 text-gray-300" />
            <p className="text-sm font-medium">No patients match &quot;{query}&quot;</p>
          </div>
        )}
      </main>
    </div>
  );
}
