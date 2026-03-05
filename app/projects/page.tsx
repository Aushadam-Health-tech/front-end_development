"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Briefcase, Plus, Search, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "Active" | "In Review" | "Completed" | "On Hold";

interface Project {
  id: number;
  name: string;
  description: string;
  status: Status;
  dueDate: string;
  team: string[];
  progress: number;
  tasks: { done: number; total: number };
}

const mockProjects: Project[] = [
  { id: 1, name: "Patient Onboarding Flow",      description: "Redesign and streamline new patient registration and intake process.", status: "Active",      dueDate: "20 Mar 2026", team: ["RS","AK","MK"], progress: 65, tasks: { done: 13, total: 20 } },
  { id: 2, name: "Teleconsultation Module",       description: "Build video consultation with scheduling, chat and e-prescription.",  status: "In Review",   dueDate: "15 Apr 2026", team: ["RS","DP"],       progress: 88, tasks: { done: 22, total: 25 } },
  { id: 3, name: "Lab Reports Integration",       description: "Connect external labs API and auto-populate patient record system.",   status: "Active",      dueDate: "01 May 2026", team: ["AK","JR","NP"],  progress: 42, tasks: { done: 8,  total: 19 } },
  { id: 4, name: "Billing & Insurance Portal",    description: "Patient-facing portal for claims, invoices and insurance tracking.", status: "On Hold",     dueDate: "30 Jun 2026", team: ["MK","DP"],       progress: 20, tasks: { done: 4,  total: 20 } },
  { id: 5, name: "Mobile App – Phase 1",          description: "Cross-platform mobile client for patients and frontline staff.",      status: "Active",      dueDate: "10 Apr 2026", team: ["RS","NP","JR"],  progress: 55, tasks: { done: 11, total: 20 } },
  { id: 6, name: "Analytics Dashboard v2",        description: "Real-time clinical KPIs and capacity planning for management.",       status: "Completed",   dueDate: "28 Feb 2026", team: ["DP","MK"],       progress: 100, tasks: { done: 18, total: 18 } },
];

const STATUS_STYLES: Record<Status, { badge: string; bar: string }> = {
  "Active":    { badge: "bg-emerald-50 text-emerald-700 border-emerald-100", bar: "bg-emerald-500" },
  "In Review": { badge: "bg-blue-50 text-blue-700 border-blue-100",          bar: "bg-blue-500"    },
  "Completed": { badge: "bg-gray-100 text-gray-600 border-gray-200",         bar: "bg-gray-400"    },
  "On Hold":   { badge: "bg-amber-50 text-amber-700 border-amber-100",       bar: "bg-amber-400"   },
};

const AVATAR_COLORS = ["bg-emerald-400","bg-blue-400","bg-violet-400","bg-amber-400","bg-rose-400","bg-teal-400"];

function ProjectCard({ project }: { project: Project }) {
  const style = STATUS_STYLES[project.status];
  return (
    <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white flex flex-col">
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">{project.name}</h3>
          <Badge variant="outline" className={cn("text-[11px] font-medium rounded-lg shrink-0 border", style.badge)}>
            {project.status}
          </Badge>
        </div>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{project.description}</p>
      </CardHeader>

      <CardContent className="px-5 pb-5 flex flex-col gap-4 flex-1">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-gray-500">Progress</span>
            <span className="text-[11px] font-bold text-gray-700">{project.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", style.bar)}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-400 gap-2">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {project.dueDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            {project.tasks.done}/{project.tasks.total} tasks
          </span>
        </div>

        {/* Team avatars */}
        <div className="flex items-center gap-2 mt-auto">
          <Users className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <div className="flex -space-x-2">
            {project.team.map((initials, i) => (
              <Avatar key={`${initials}-${i}`} className="w-6 h-6 border-2 border-white">
                <AvatarFallback className={cn("text-white text-[9px] font-bold", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                  {initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-[11px] text-gray-400">{project.team.length} members</span>
        </div>
      </CardContent>
    </Card>
  );
}

const ALL_STATUSES: Status[] = ["Active", "In Review", "Completed", "On Hold"];

export default function ProjectsPage() {
  const [query,  setQuery]  = useState("");
  const [filter, setFilter] = useState<Status | "All">("All");

  const visible = mockProjects.filter(p => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) ||
                         p.description.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts: Record<string, number> = { All: mockProjects.length };
  ALL_STATUSES.forEach(s => { counts[s] = mockProjects.filter(p => p.status === s).length; });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-gray-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Projects</h1>
            <p className="text-sm text-gray-400 mt-0.5">{mockProjects.length} total · {counts["Active"]} active</p>
          </div>
        </div>
        <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2 text-sm">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <main className="flex-1 p-6 space-y-5">
        {/* Search + filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search projects…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9 rounded-xl border-gray-200 bg-gray-50 focus:bg-white h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["All", ...ALL_STATUSES] as (Status | "All")[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors border",
                  filter === s
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {s} <span className={cn("ml-1 font-bold", filter === s ? "text-emerald-100" : "text-gray-400")}>{counts[s]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Briefcase className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No projects found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search or filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
