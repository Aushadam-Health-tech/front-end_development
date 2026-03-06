"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, User, Bell, Shield, KeyRound, Save } from "lucide-react";

const SECTIONS = [
  { id: "profile",  label: "Profile",      icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security",     icon: Shield },
] as const;
type Section = typeof SECTIONS[number]["id"];

export default function SettingsPage() {
  const [section, setSection] = useState<Section>("profile");
  const [saved,   setSaved]   = useState(false);
  const [form, setForm] = useState({ name: "Dr. Ritika Sahu", email: "ritika.sahu@healthcare.in", phone: "+91 98765 43210", hospital: "Apollo Medcare", specialty: "Cardiology", language: "English" });
  const [notifs, setNotifs] = useState({ email: true, sms: false, push: true, appt: true, lab: true, emerg: true });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center gap-3">
        <Settings className="w-5 h-5 text-gray-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your account preferences</p>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        {/* sidebar nav */}
        <Card className="h-fit w-48 rounded-2xl border border-gray-100 shadow-sm shrink-0 overflow-hidden">
          <CardContent className="p-2 space-y-0.5">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${section === s.id ? "bg-emerald-50 text-emerald-700" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* content */}
        <div className="flex-1 max-w-xl space-y-4">
          {section === "profile" && (
            <>
              <Card className="rounded-2xl border border-gray-100 shadow-sm">
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="text-base font-bold text-gray-800">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-4">
                  <div className="flex items-center gap-4 pb-2">
                    <Avatar className="w-16 h-16 rounded-2xl border-2 border-gray-100">
                      <AvatarFallback className="bg-linear-to-br from-emerald-400 to-teal-600 text-white text-lg font-bold rounded-2xl">RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">{form.name}</p>
                      <Badge variant="secondary" className="mt-1 bg-emerald-50 text-emerald-700 border-emerald-100 text-xs rounded-lg">Cardiologist</Badge>
                    </div>
                  </div>
                  <Separator />
                  {(["name","email","phone","hospital","specialty","language"] as (keyof typeof form)[]).map(field => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{field}</label>
                      <Input value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white text-sm" />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Button onClick={handleSave} className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                <Save className="w-4 h-4" />
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </>
          )}

          {section === "notifications" && (
            <Card className="rounded-2xl border border-gray-100 shadow-sm">
              <CardHeader className="pb-2 pt-5 px-5">
                <CardTitle className="text-base font-bold text-gray-800">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-0">
                {([
                  ["email", "Email Notifications", "Receive updates via email"],
                  ["sms",   "SMS Notifications",   "Get SMS for critical events"],
                  ["push",  "Push Notifications",  "Browser push alerts"],
                  ["appt",  "Appointment Reminders","Reminders before appointments"],
                  ["lab",   "Lab Results",          "Notify when results are ready"],
                  ["emerg", "Emergency Alerts",      "Always-on emergency alerts"],
                ] as [keyof typeof notifs, string, string][]).map(([key, title, desc]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{title}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifs(p => ({ ...p, [key]: !p[key] }))}
                      className={`w-10 h-5 rounded-full relative transition-colors ${notifs[key] ? "bg-emerald-500" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${notifs[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {section === "security" && (
            <Card className="rounded-2xl border border-gray-100 shadow-sm">
              <CardHeader className="pb-2 pt-5 px-5">
                <CardTitle className="text-base font-bold text-gray-800">Security</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Password</label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Password</label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white text-sm" />
                </div>
                <Button onClick={handleSave} className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                  <KeyRound className="w-4 h-4" />
                  {saved ? "Updated!" : "Update Password"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
