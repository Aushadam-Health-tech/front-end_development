// ─────────────────────────────────────────────
// MOCK DATA — no backend, no API, all in-memory
// ─────────────────────────────────────────────

// ── Emergency Alerts ─────────────────────────
export interface EmergencyAlert {
  id: number;
  type: string;
  message: string;
  patient: string;
  age: number;
  time: string;
  severity: "critical" | "high" | "medium";
  contactNumber: string;
  bloodPressure?: string;
  heartRate?: string;
  notes?: string;
}

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: 1,
    type: "chest pain",
    message:
      "Experiencing severe chest pain and shortness of breath. Blood pressure is high.",
    patient: "Ramya Reddy",
    age: 54,
    time: "30 min ago",
    severity: "critical",
    contactNumber: "+91 98765 43210",
    bloodPressure: "180/110 mmHg",
    heartRate: "112 bpm",
    notes:
      "Patient reported pain radiating to left arm. ECG requested. Family notified.",
  },
  {
    id: 2,
    type: "allergic reaction",
    message: "Severe allergic reaction, swelling in throat, trouble breathing.",
    patient: "Pramod Iyer",
    age: 65,
    time: "1 hr ago",
    severity: "critical",
    contactNumber: "+91 87654 32109",
    heartRate: "98 bpm",
    notes:
      "Administered epinephrine 0.3mg. Patient stabilised. Under observation.",
  },
  {
    id: 3,
    type: "fall injury",
    message: "Patient fell in corridor. Possible fracture in left wrist.",
    patient: "Suresh Menon",
    age: 71,
    time: "2 hr ago",
    severity: "high",
    contactNumber: "+91 76543 21098",
    bloodPressure: "135/85 mmHg",
    heartRate: "78 bpm",
    notes: "X-ray ordered. Pain management administered.",
  },
];

// ── Appointments ──────────────────────────────
export type AppointmentStatus = "In-clinic" | "Online" | "Scheduled";

export interface Appointment {
  id: number;
  time: string;
  patientName: string;
  reason: string;
  status: AppointmentStatus;
  avatarColor: string;
  initials: string;
  isActive?: boolean;
}

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    time: "09:00 AM",
    patientName: "Kalyani Rao",
    reason: "Report Discussion",
    status: "In-clinic",
    avatarColor: "bg-orange-200",
    initials: "KR",
    isActive: true,
  },
  {
    id: 2,
    time: "10:00 AM",
    patientName: "Radhika Iyer",
    reason: "Lab Test Discussion",
    status: "Online",
    avatarColor: "bg-purple-200",
    initials: "RI",
  },
  {
    id: 3,
    time: "10:45 AM",
    patientName: "Radhika Iyer Radhakrishnan",
    reason: "Lab Test Discussion",
    status: "Online",
    avatarColor: "bg-blue-200",
    initials: "RR",
  },
  {
    id: 4,
    time: "11:30 AM",
    patientName: "Radhika Iyer",
    reason: "Follow-up Checkup",
    status: "Online",
    avatarColor: "bg-green-200",
    initials: "RI",
  },
  {
    id: 5,
    time: "12:00 PM",
    patientName: "Anjali Verma",
    reason: "Prescription Renewal",
    status: "Scheduled",
    avatarColor: "bg-pink-200",
    initials: "AV",
  },
  {
    id: 6,
    time: "01:30 PM",
    patientName: "Nikhil Sharma",
    reason: "Blood Test Review",
    status: "Scheduled",
    avatarColor: "bg-yellow-200",
    initials: "NS",
  },
];

// ── Updates / Notifications ───────────────────
export type UpdateCategory = "subscribed" | "regular";

export interface UpdateItem {
  id: number;
  title: string;
  uploader: string;
  time: string;
  category: UpdateCategory;
  read: boolean;
}

export const mockUpdates: UpdateItem[] = [
  {
    id: 1,
    title: "You have a new medical report.",
    uploader: "Uploaded by patient: Anika Shekhawat",
    time: "1 hr ago",
    category: "subscribed",
    read: false,
  },
  {
    id: 2,
    title: "Lab results are ready for review.",
    uploader: "Uploaded by patient: Anika Shekhawat",
    time: "2 hr ago",
    category: "subscribed",
    read: false,
  },
  {
    id: 3,
    title: "Prescription request submitted.",
    uploader: "Submitted by patient: Rahul Das",
    time: "3 hr ago",
    category: "subscribed",
    read: true,
  },
  {
    id: 4,
    title: "New X-ray images uploaded.",
    uploader: "Uploaded by patient: Meena Iyer",
    time: "5 hr ago",
    category: "subscribed",
    read: true,
  },
  {
    id: 5,
    title: "Blood pressure chart updated.",
    uploader: "Uploaded by patient: Suresh Pillai",
    time: "Yesterday",
    category: "subscribed",
    read: true,
  },
  {
    id: 6,
    title: "General health tips newsletter.",
    uploader: "Posted by: Aushodam Team",
    time: "1 hr ago",
    category: "regular",
    read: false,
  },
  {
    id: 7,
    title: "System maintenance scheduled.",
    uploader: "Posted by: Aushodam Team",
    time: "3 hr ago",
    category: "regular",
    read: false,
  },
  {
    id: 8,
    title: "New protocol for teleconsultation.",
    uploader: "Posted by: Admin",
    time: "Yesterday",
    category: "regular",
    read: true,
  },
  {
    id: 9,
    title: "CPD webinar invite: April 2026.",
    uploader: "Posted by: Medical Association",
    time: "2 days ago",
    category: "regular",
    read: true,
  },
];

// ── Metrics ───────────────────────────────────
export interface MetricPeriod {
  label: string;
  inProcess: number;
  completed: number;
  cancelled: number;
  trend: "up" | "down" | "flat";
  trendValue: string;
}

export const mockMetrics: Record<string, MetricPeriod> = {
  Weekly: {
    label: "Weekly",
    inProcess: 40,
    completed: 68,
    cancelled: 5,
    trend: "up",
    trendValue: "+12%",
  },
  Monthly: {
    label: "Monthly",
    inProcess: 160,
    completed: 275,
    cancelled: 20,
    trend: "down",
    trendValue: "-4%",
  },
  Daily: {
    label: "Daily",
    inProcess: 8,
    completed: 14,
    cancelled: 1,
    trend: "flat",
    trendValue: "0%",
  },
  Yearly: {
    label: "Yearly",
    inProcess: 1920,
    completed: 3300,
    cancelled: 240,
    trend: "up",
    trendValue: "+22%",
  },
};

// ── Date Navigation ───────────────────────────
export const mockDates = [
  "Jun 20, 2022",
  "Jun 21, 2022",
  "Jun 22, 2022",
  "Jun 23, 2022",
  "Jun 24, 2022",
  "Jun 25, 2022",
  "Jun 26, 2022",
];

// ── Simulated async helper ────────────────────
export function simulateAsync<T>(value: T, delayMs = 1200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delayMs));
}
