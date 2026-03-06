"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: "Jan", male: 30, female: 20, inPerson: 35, online: 28 },
  { month: "Feb", male: 38, female: 30, inPerson: 42, online: 35 },
  { month: "Mar", male: 25, female: 38, inPerson: 30, online: 22 },
  { month: "Apr", male: 42, female: 28, inPerson: 38, online: 40 },
  { month: "May", male: 35, female: 45, inPerson: 40, online: 30 },
  { month: "Jun", male: 28, female: 35, inPerson: 32, online: 42 },
  { month: "Jul", male: 45, female: 25, inPerson: 44, online: 35 },
  { month: "Aug", male: 32, female: 40, inPerson: 28, online: 38 },
  { month: "Sep", male: 38, female: 32, inPerson: 35, online: 30 },
  { month: "Oct", male: 42, female: 38, inPerson: 40, online: 45 },
  { month: "Nov", male: 35, female: 42, inPerson: 38, online: 32 },
];

export default function PatientsChart() {
  return (
    <Card className="rounded-2xl flex-1 shadow-sm border-gray-100">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-800">Patients Visits</span>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-28 h-8 text-sm text-gray-500 border-none shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Line type="monotone" dataKey="male" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="female" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="inPerson" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="online" stroke="#06b6d4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
          <span>Male</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-400 rounded"></div>
          <span>Female</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-green-500 rounded"></div>
          <span>In-person</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-cyan-400 rounded"></div>
          <span>Online</span>
        </div>
      </div>
    </CardContent>
    </Card>
  );
}
