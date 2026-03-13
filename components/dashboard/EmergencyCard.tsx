"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Phone,
  PlusCircle,
  Heart,
  Activity,
  FileText,
  ChevronRight,
  X,
} from "lucide-react";
import { mockEmergencyAlerts, type EmergencyAlert, simulateAsync } from "@/data/mockData";

const severityStyles: Record<EmergencyAlert["severity"], string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

function AlertRow({
  alert,
  onSelect,
}: {
  alert: EmergencyAlert;
  onSelect: (a: EmergencyAlert) => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(alert)}
      className="w-full flex items-start gap-3 p-3 rounded-xl border border-red-50 bg-red-50/40
                 hover:bg-red-50 hover:border-red-100 transition-colors text-left group cursor-pointer"
    >
      <div className="mt-0.5 shrink-0">
        <AlertTriangle className="w-5 h-5 text-red-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-600 leading-snug">{alert.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          Patient: {alert.patient} | Age: {alert.age}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
          <Phone className="w-4 h-4 text-teal-500" />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
    </Button>
  );
}

function AlertDetailDialog({
  alert,
  open,
  onClose,
}: {
  alert: EmergencyAlert | null;
  open: boolean;
  onClose: () => void;
}) {
  const [calling, setCalling] = useState(false);
  const [called, setCalled] = useState(false);

  async function handleCall() {
    if (!alert || calling || called) return;
    setCalling(true);
    await simulateAsync(null, 1500);
    setCalling(false);
    setCalled(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setCalling(false);
      setCalled(false);
    }, 300);
  }

  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <DialogTitle className="text-base font-bold text-gray-800">
              Emergency Alert Details
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            Recorded {alert.time} · Severity:
            <Badge
              variant="outline"
              className={`ml-1 text-xs rounded-full ${severityStyles[alert.severity]}`}
            >
              {alert.severity.toUpperCase()}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Patient</p>
              <p className="font-semibold text-gray-800">{alert.patient}</p>
              <p className="text-xs text-gray-500">Age: {alert.age}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Contact</p>
              <p className="font-semibold text-gray-800 text-xs">{alert.contactNumber}</p>
            </div>
          </div>

          {(alert.bloodPressure || alert.heartRate) && (
            <div className="grid grid-cols-2 gap-3">
              {alert.bloodPressure && (
                <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Blood Pressure</p>
                    <p className="text-sm font-bold text-red-600">{alert.bloodPressure}</p>
                  </div>
                </div>
              )}
              {alert.heartRate && (
                <div className="bg-pink-50 rounded-xl p-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">Heart Rate</p>
                    <p className="text-sm font-bold text-pink-600">{alert.heartRate}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-red-50 rounded-xl p-3 flex gap-2">
            <FileText className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400 font-semibold mb-1">Alert Message</p>
              <p className="text-sm text-red-700 font-medium">{alert.message}</p>
            </div>
          </div>

          {alert.notes && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Clinical Notes</p>
              <p className="text-sm text-gray-600">{alert.notes}</p>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-2 pt-1">
          <Button
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
            onClick={handleCall}
            disabled={calling || called}
          >
            <Phone className="w-4 h-4" />
            {called ? "Called ✓" : calling ? "Connecting…" : "Call Patient"}
          </Button>
          <Button variant="outline" className="rounded-xl gap-1" onClick={handleClose}>
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EmergencyCard() {
  const [alerts] = useState<EmergencyAlert[]>(mockEmergencyAlerts);
  const [selected, setSelected] = useState<EmergencyAlert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? alerts : alerts.slice(0, 2);

  function handleSelect(alert: EmergencyAlert) {
    setSelected(alert);
    setDialogOpen(true);
  }

  return (
    <>
      <Card className="rounded-2xl shadow-sm border border-gray-100">
        <CardHeader className="pb-2 pt-5 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-red-500" />
              </div>
              <CardTitle className="text-base font-bold text-red-500">
                Emergency Messages
              </CardTitle>
              <Badge className="bg-red-500 text-white text-xs rounded-full h-5 px-1.5 ml-1">
                {alerts.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              className="text-xs text-emerald-600 font-medium h-7 px-2 hover:text-emerald-700"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show Less" : "View All"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 space-y-3">
          {displayed.map((alert) => (
            <AlertRow key={alert.id} alert={alert} onSelect={handleSelect} />
          ))}
        </CardContent>
      </Card>

      <AlertDetailDialog
        alert={selected}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
