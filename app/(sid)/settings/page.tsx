"use client";

import { useState } from "react";
import {
  User, CreditCard, Package, Bell, Shield, ChevronRight,
  Camera, Mail, Phone, MapPin, Save, Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sections = [
  { id: "account",      label: "Edit Account",       icon: User      },
  { id: "billing",      label: "Billing",             icon: CreditCard },
  { id: "subscription", label: "Subscription Plans",  icon: Package   },
  { id: "notifications",label: "Notifications",       icon: Bell      },
  { id: "security",     label: "Security",            icon: Shield    },
];

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "/ month",
    current: false,
    features: ["Up to 50 patients", "Basic reports", "Email support", "1 doctor account"],
    color: "border-gray-200",
    badge: "",
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/ month",
    current: true,
    features: ["Up to 500 patients", "Advanced analytics", "Priority support", "5 doctor accounts", "Lab integration"],
    color: "border-teal-500",
    badge: "Current Plan",
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    period: "/ month",
    current: false,
    features: ["Unlimited patients", "Custom reports", "Dedicated support", "Unlimited accounts", "API access", "White-labelling"],
    color: "border-purple-400",
    badge: "Best Value",
  },
];

export default function SettingsPage() {
  const [active, setActive] = useState("account");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Dr. Ritika Sahu",
    email: "ritika.sahu@aushadham.in",
    phone: "+91 98201 12345",
    clinic: "AUSHADHAM Clinic",
    location: "Mumbai, Maharashtra",
    specialization: "General Physician",
  });

  const [notifSettings, setNotifSettings] = useState({
    appointments: true,
    labReports: true,
    messages: false,
    systemUpdates: true,
    billing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
      <header className="px-6 py-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account, billing and preferences</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar nav */}
        <div className="w-56 bg-white border-r border-gray-100 py-4 shrink-0">
          {sections.map((s) => (
            <Button
              type="button"
              variant="ghost"
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "w-full h-auto justify-start items-center gap-3 px-4 py-3 rounded-none text-sm font-medium transition-colors text-left",
                active === s.id
                  ? "bg-teal-50 text-teal-700 border-r-2 border-teal-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              )}
            >
              <s.icon className={cn("w-4 h-4", active === s.id ? "text-teal-600" : "text-gray-400")} />
              {s.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── ACCOUNT ── */}
          {active === "account" && (
            <div className="max-w-2xl space-y-5">
              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-5">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-amber-400 text-white text-xl font-bold">RS</AvatarFallback>
                      </Avatar>
                      <Button type="button" size="icon" className="absolute bottom-0 right-0 w-6 h-6 bg-teal-600 rounded-full shadow hover:bg-teal-700">
                        <Camera className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{form.name}</p>
                      <p className="text-xs text-gray-400">{form.specialization}</p>
                      <Badge className="mt-1 bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0">Admin</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Full Name",       key: "name",           icon: User    },
                      { label: "Specialization",  key: "specialization", icon: User    },
                      { label: "Email Address",   key: "email",          icon: Mail    },
                      { label: "Phone Number",    key: "phone",          icon: Phone   },
                      { label: "Clinic Name",     key: "clinic",         icon: User    },
                      { label: "Location",        key: "location",       icon: MapPin  },
                    ].map(({ label, key, icon: Icon }) => (
                      <div key={key}>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <Input
                            value={form[key as keyof typeof form]}
                            onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className="pl-9 rounded-xl border-gray-200 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-5">
                    <Button
                      onClick={handleSave}
                      className={cn(
                        "gap-2 rounded-xl transition-all",
                        saved ? "bg-green-600 hover:bg-green-600" : "bg-teal-600 hover:bg-teal-700"
                      )}
                    >
                      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved ? "Saved!" : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── BILLING ── */}
          {active === "billing" && (
            <div className="max-w-2xl space-y-4">
              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-4">Payment Method</h2>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
                      <p className="text-xs text-gray-400">Expires 08 / 2027</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-[10px]">Active</Badge>
                  </div>
                  <Button variant="outline" className="mt-3 rounded-xl border-gray-200 text-sm text-gray-600 gap-2">
                    <CreditCard className="w-4 h-4" /> Update Card
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-4">Billing History</h2>
                  <div className="space-y-3">
                    {[
                      { date: "Feb 1, 2026", amount: "₹1,499", plan: "Pro Plan", status: "Paid" },
                      { date: "Jan 1, 2026", amount: "₹1,499", plan: "Pro Plan", status: "Paid" },
                      { date: "Dec 1, 2025", amount: "₹1,499", plan: "Pro Plan", status: "Paid" },
                    ].map((b, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{b.plan}</p>
                          <p className="text-xs text-gray-400">{b.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-700">{b.amount}</span>
                          <Badge className="bg-green-100 text-green-700 text-[10px]">{b.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── SUBSCRIPTION ── */}
          {active === "subscription" && (
            <div className="max-w-3xl">
              <p className="text-sm text-gray-500 mb-5">Choose a plan that fits your clinic&apos;s needs.</p>
              <div className="grid grid-cols-3 gap-4">
                {plans.map((p) => (
                  <Card
                    key={p.name}
                    className={cn("rounded-2xl shadow-sm border-2 relative transition-shadow hover:shadow-md", p.color)}
                  >
                    {p.badge && (
                      <div className={cn(
                        "absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full",
                        p.current ? "bg-teal-600 text-white" : "bg-purple-500 text-white"
                      )}>
                        {p.badge}
                      </div>
                    )}
                    <CardContent className="p-5">
                      <h3 className="font-bold text-gray-800 text-lg">{p.name}</h3>
                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-2xl font-bold text-gray-900">{p.price}</span>
                        <span className="text-xs text-gray-400">{p.period}</span>
                      </div>
                      <Separator className="mb-3" />
                      <ul className="space-y-2 mb-5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={cn(
                          "w-full rounded-xl text-sm",
                          p.current
                            ? "bg-teal-600 hover:bg-teal-700 text-white"
                            : "variant-outline border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                        )}
                        disabled={p.current}
                      >
                        {p.current ? "Current Plan" : "Upgrade"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {active === "notifications" && (
            <div className="max-w-xl">
              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    {(Object.entries(notifSettings) as [keyof typeof notifSettings, boolean][]).map(([key, val]) => {
                      const labels: Record<string, string> = {
                        appointments: "Appointment reminders",
                        labReports: "Lab report uploads",
                        messages: "New patient messages",
                        systemUpdates: "System updates",
                        billing: "Billing & payment alerts",
                      };
                      return (
                        <div key={key} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                          <p className="text-sm text-gray-700">{labels[key]}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setNotifSettings(s => ({ ...s, [key]: !val }))}
                            aria-pressed={val}
                            className={cn(
                              "w-10 h-5 rounded-full relative transition-colors",
                              val ? "bg-teal-600" : "bg-gray-200"
                            )}
                          >
                            <span className={cn(
                              "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all",
                              val ? "left-5.5 translate-x-0.5" : "left-0.5"
                            )} />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Button onClick={handleSave} className={cn("mt-5 gap-2 rounded-xl", saved ? "bg-green-600 hover:bg-green-600" : "bg-teal-600 hover:bg-teal-700")}>
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "Saved!" : "Save Preferences"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* ── SECURITY ── */}
          {active === "security" && (
            <div className="max-w-xl space-y-4">
              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>
                  <div className="space-y-3">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">{label}</label>
                        <Input type="password" placeholder="••••••••" className="rounded-xl border-gray-200" />
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleSave} className={cn("mt-5 gap-2 rounded-xl", saved ? "bg-green-600 hover:bg-green-600" : "bg-teal-600 hover:bg-teal-700")}>
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "Updated!" : "Update Password"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-800 mb-1">Two-Factor Authentication</h2>
                  <p className="text-xs text-gray-400 mb-4">Add an extra layer of security to your account.</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Authenticator App</p>
                      <p className="text-xs text-gray-400">Not enabled</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg border-gray-200 text-xs gap-1.5">
                      Enable <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
