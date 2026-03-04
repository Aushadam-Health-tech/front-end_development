"use client";

import { ChevronLeft, ChevronRight, Share2, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import PatientsChart from "@/components/dashboard/PatientsChart";
import AppointmentsPanel from "@/components/dashboard/AppointmentsPanel";

const stats = [
  {
    title: "Total patients",
    value: "1,250",
    change: "+4.8%",
    up: true,
    label: "from last week",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    title: "In pending",
    value: "60",
    change: "-25%",
    up: false,
    label: "from last week",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    title: "Total Booking",
    value: null,
    donut: true,
    percent: 100,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-500",
    change: "",
    up: true,
    label: "",
  },
  {
    title: "Regular",
    value: "60",
    change: "-20%",
    up: false,
    label: "from last week",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Subscribed",
    value: "100",
    change: "+3.6%",
    up: true,
    label: "from last week",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    title: "",
    value: "100",
    change: "+3.6%",
    up: true,
    label: "from last week",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-500",
    noTitle: true,
  },
];

function DonutChart({ percent }: { percent: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center w-24 h-24">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke="#0d9488" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-lg font-bold text-teal-700">{percent}%</span>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 min-w-0">
      {stat.donut ? (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full ${stat.iconBg} flex items-center justify-center`}>
              <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-600">{stat.title}</span>
          </div>
          <div className="relative flex items-center justify-center w-full">
            <DonutChart percent={stat.percent!} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full ${stat.iconBg} flex items-center justify-center`}>
              <svg className={`w-5 h-5 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {!stat.noTitle && <span className="text-sm font-medium text-gray-600">{stat.title}</span>}
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.up ? (
                <TrendingUp className="w-3 h-3 text-teal-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-xs font-medium ${stat.up ? "text-teal-600" : "text-red-400"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">{stat.label}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      {/* Top header */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-lg">
            RS
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-700">Hi! Dr. Ritika Sahu</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-gray-200 shadow-sm">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">Jun 24, 2022</span>
            <span className="text-sm text-teal-600 font-semibold">Today</span>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" />
            Invite
          </button>
        </div>
      </header>

      {/* Main content + appointments panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Weekly selector */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900">
              Weekly
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>

          {/* Chart + Revenue row */}
          <div className="flex gap-4">
            <PatientsChart />

            {/* Revenue card */}
            <div className="bg-white rounded-2xl p-5 w-48 flex-shrink-0 flex flex-col justify-between">
              <p className="font-semibold text-gray-800 text-sm">Revenues</p>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-4xl font-bold text-gray-800">15%</span>
                  <ArrowUpRight className="w-6 h-6 text-teal-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Increase compared to last week</p>
              </div>
              <button className="flex items-center gap-1 text-xs text-orange-500 font-medium hover:underline mt-2">
                Revenues report
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chats + Lab Reports */}
          <div className="grid grid-cols-2 gap-4">
            {/* Chats */}
            <div className="bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Chats</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">2 unread messages</p>
              <div className="flex -space-x-2 mb-4">
                {["RS", "AK", "VM", "NB"].map((init, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-1 text-sm text-orange-500 font-medium hover:underline">
                All messages
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Lab Reports */}
            <div className="bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-semibold text-gray-800">Lab Reports</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">2 unread messages</p>
              <div className="flex -space-x-2 mb-4">
                {["RK", "SP", "LI", "AR"].map((init, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-1 text-sm text-orange-500 font-medium hover:underline">
                All messages
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        {/* Right appointments panel */}
        <AppointmentsPanel />
      </div>
    </div>
  );
}
