"use client";

import { useState } from "react";
import { Search, Plus, ChevronRight, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const patients = [
  { id: "P001", name: "Rohan Mehra",     age: 34, gender: "Male",   condition: "Hypertension",   lastVisit: "Today",        status: "Active",     blood: "B+",  phone: "+91 98201 11234", email: "rohan.m@email.com" },
  { id: "P002", name: "Dasha Shah",      age: 28, gender: "Female", condition: "Diabetes Type 2",lastVisit: "2 days ago",   status: "Active",     blood: "O+",  phone: "+91 98201 22345", email: "dasha.s@email.com" },
  { id: "P003", name: "Nupur Baghva",    age: 42, gender: "Female", condition: "Asthma",          lastVisit: "1 week ago",   status: "Follow-up",  blood: "A-",  phone: "+91 98201 33456", email: "nupur.b@email.com" },
  { id: "P004", name: "Akash Reddy",     age: 55, gender: "Male",   condition: "Glaucoma",        lastVisit: "Today",        status: "Critical",   blood: "AB+", phone: "+91 98201 44567", email: "akash.r@email.com" },
  { id: "P005", name: "Laxmi Iyer",      age: 38, gender: "Female", condition: "Migraine",        lastVisit: "3 days ago",   status: "Active",     blood: "A+",  phone: "+91 98201 55678", email: "laxmi.i@email.com" },
  { id: "P006", name: "Swati Naydu",     age: 47, gender: "Female", condition: "Thyroid",         lastVisit: "5 days ago",   status: "Active",     blood: "B-",  phone: "+91 98201 66789", email: "swati.n@email.com" },
  { id: "P007", name: "Rupesh Mishra",   age: 61, gender: "Male",   condition: "Cardiac Arrest",  lastVisit: "Today",        status: "Critical",   blood: "O-",  phone: "+91 98201 77890", email: "rupesh.m@email.com" },
  { id: "P008", name: "Payal Singh",     age: 29, gender: "Female", condition: "PCOS",            lastVisit: "1 week ago",   status: "Active",     blood: "A+",  phone: "+91 98201 88901", email: "payal.s@email.com" },
  { id: "P009", name: "Vibha M",         age: 35, gender: "Female", condition: "Anemia",          lastVisit: "2 weeks ago",  status: "Follow-up",  blood: "B+",  phone: "+91 98201 99012", email: "vibha.m@email.com" },
  { id: "P010", name: "Swaminarayna",    age: 52, gender: "Male",   condition: "Arthritis",       lastVisit: "4 days ago",   status: "Active",     blood: "AB-", phone: "+91 98201 10123", email: "swami.n@email.com" },
];

const statusStyle: Record<string, string> = {
  Active:      "bg-green-100 text-green-700",
  "Follow-up": "bg-amber-100 text-amber-700",
  Critical:    "bg-red-100 text-red-600",
};

const genderColor = (g: string) => g === "Male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Active", "Follow-up", "Critical"];
  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500 text-sm mt-0.5">{patients.length} total patients registered</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2 rounded-xl">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </header>

      <div className="px-6 py-5 space-y-4">
        {/* Search + Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, ID or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-teal-600 hover:bg-teal-700 text-white rounded-lg" : "rounded-lg border-gray-200 text-gray-600"}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Active", count: patients.filter(p => p.status === "Active").length, color: "text-green-600 bg-green-50" },
            { label: "Follow-up Needed", count: patients.filter(p => p.status === "Follow-up").length, color: "text-amber-600 bg-amber-50" },
            { label: "Critical", count: patients.filter(p => p.status === "Critical").length, color: "text-red-600 bg-red-50" },
          ].map((s) => (
            <Card key={s.label} className={`rounded-xl shadow-sm border-0 ${s.color}`}>
              <CardContent className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium">{s.label}</span>
                <span className="text-2xl font-bold">{s.count}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Patient cards */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <Card key={p.id} className="rounded-2xl shadow-sm border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-11 h-11 flex-shrink-0">
                    <AvatarFallback className={`font-semibold text-sm ${genderColor(p.gender)}`}>
                      {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <Badge className={`text-[10px] px-1.5 py-0 ${statusStyle[p.status]}`}>{p.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{p.id} · {p.age} yrs · {p.gender} · Blood: {p.blood}</p>
                    <p className="text-xs font-medium text-teal-600 mt-1">{p.condition}</p>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span>{p.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Mail className="w-3 h-3" />
                      <span>{p.email}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Last visit</p>
                    <p className="text-xs font-medium text-gray-700">{p.lastVisit}</p>
                    <Button variant="ghost" size="sm" className="mt-1 h-6 px-2 text-xs text-teal-600 hover:bg-teal-50 gap-1 group-hover:bg-teal-50">
                      View <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
