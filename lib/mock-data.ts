// ─────────────────────────────────────────────────────────────────────────────
// /lib/mock-data.ts  — Central mock data store (no backend)
// ─────────────────────────────────────────────────────────────────────────────

// ── Patients ──────────────────────────────────────────────────────────────────
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female";
  condition: string;
  lastVisit: string;
  status: "Active" | "Inactive" | "Critical";
  initials: string;
  avatarColor: string;
  phone: string;
  email: string;
}

export const mockPatients: Patient[] = [
  { id: 1,  name: "Kalyani Rao",               age: 34, gender: "Female", condition: "Hypertension",     lastVisit: "Jun 24, 2022", status: "Active",   initials: "KR", avatarColor: "bg-orange-200", phone: "+91 98765 43210", email: "kalyani@example.com" },
  { id: 2,  name: "Radhika Iyer",              age: 28, gender: "Female", condition: "Diabetes Type 2",  lastVisit: "Jun 22, 2022", status: "Active",   initials: "RI", avatarColor: "bg-purple-200", phone: "+91 87654 32109", email: "radhika@example.com" },
  { id: 3,  name: "Radhika Iyer Radhakrishnan",age: 45, gender: "Female", condition: "Arthritis",        lastVisit: "Jun 20, 2022", status: "Inactive", initials: "RR", avatarColor: "bg-blue-200",   phone: "+91 76543 21098", email: "radhika.r@example.com" },
  { id: 4,  name: "Anjali Verma",              age: 52, gender: "Female", condition: "Asthma",           lastVisit: "Jun 18, 2022", status: "Active",   initials: "AV", avatarColor: "bg-pink-200",   phone: "+91 65432 10987", email: "anjali@example.com" },
  { id: 5,  name: "Nikhil Sharma",             age: 39, gender: "Male",   condition: "Back Pain",        lastVisit: "Jun 15, 2022", status: "Active",   initials: "NS", avatarColor: "bg-yellow-200", phone: "+91 54321 09876", email: "nikhil@example.com" },
  { id: 6,  name: "Suresh Menon",              age: 71, gender: "Male",   condition: "Fracture",         lastVisit: "Jun 14, 2022", status: "Critical", initials: "SM", avatarColor: "bg-red-200",    phone: "+91 43210 98765", email: "suresh@example.com" },
  { id: 7,  name: "Priya Nair",                age: 30, gender: "Female", condition: "Migraine",         lastVisit: "Jun 12, 2022", status: "Active",   initials: "PN", avatarColor: "bg-teal-200",   phone: "+91 32109 87654", email: "priya@example.com" },
  { id: 8,  name: "Ramya Reddy",               age: 54, gender: "Female", condition: "Chest Pain",       lastVisit: "Jun 24, 2022", status: "Critical", initials: "RD", avatarColor: "bg-rose-200",   phone: "+91 98765 43210", email: "ramya@example.com" },
];

// ── Appointments ──────────────────────────────────────────────────────────────
export type AppointmentStatus = "In-clinic" | "Online" | "Scheduled" | "Completed" | "Cancelled";

export interface Appointment {
  id: number;
  time: string;
  patient: string;
  reason: string;
  status: AppointmentStatus;
  initials: string;
  avatarColor: string;
  isActive?: boolean;
  date: string;
}

export const mockAppointments: Appointment[] = [
  { id: 1, time: "09:00 AM", patient: "Kalyani Rao",                reason: "Report Discussion",   status: "In-clinic", initials: "KR", avatarColor: "bg-orange-200", isActive: true,  date: "Jun 24, 2022" },
  { id: 2, time: "10:00 AM", patient: "Radhika Iyer",               reason: "Lab Test Discussion", status: "Online",    initials: "RI", avatarColor: "bg-purple-200",               date: "Jun 24, 2022" },
  { id: 3, time: "10:45 AM", patient: "Radhika Iyer Radhakrishnan", reason: "Lab Test Discussion", status: "Online",    initials: "RR", avatarColor: "bg-blue-200",                 date: "Jun 24, 2022" },
  { id: 4, time: "11:30 AM", patient: "Radhika Iyer",               reason: "Follow-up Checkup",   status: "Online",    initials: "RI", avatarColor: "bg-green-200",                date: "Jun 24, 2022" },
  { id: 5, time: "12:00 PM", patient: "Anjali Verma",               reason: "Prescription Renewal",status: "Scheduled", initials: "AV", avatarColor: "bg-pink-200",                 date: "Jun 24, 2022" },
  { id: 6, time: "01:30 PM", patient: "Nikhil Sharma",              reason: "Blood Test Review",   status: "Scheduled", initials: "NS", avatarColor: "bg-yellow-200",               date: "Jun 24, 2022" },
  { id: 7, time: "02:30 PM", patient: "Priya Nair",                 reason: "Migraine Follow-up",  status: "Scheduled", initials: "PN", avatarColor: "bg-teal-200",                 date: "Jun 25, 2022" },
  { id: 8, time: "04:00 PM", patient: "Suresh Menon",               reason: "Post-surgery Check",  status: "Scheduled", initials: "SM", avatarColor: "bg-red-200",                  date: "Jun 25, 2022" },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export type NotificationCategory = "subscribed" | "regular";

export interface Notification {
  id: number;
  title: string;
  uploader: string;
  time: string;
  category: NotificationCategory;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  { id: 1, title: "You have a new medical report.",        uploader: "Uploaded by patient: Anika Shekhawat", time: "1 hr ago",   category: "subscribed", read: false },
  { id: 2, title: "Lab results are ready for review.",     uploader: "Uploaded by patient: Anika Shekhawat", time: "2 hr ago",   category: "subscribed", read: false },
  { id: 3, title: "Prescription request submitted.",       uploader: "Submitted by patient: Rahul Das",      time: "3 hr ago",   category: "subscribed", read: true  },
  { id: 4, title: "New X-ray images uploaded.",            uploader: "Uploaded by patient: Meena Iyer",      time: "5 hr ago",   category: "subscribed", read: true  },
  { id: 5, title: "Blood pressure chart updated.",         uploader: "Uploaded by patient: Suresh Pillai",   time: "Yesterday",  category: "subscribed", read: true  },
  { id: 6, title: "General health tips newsletter.",       uploader: "Posted by: Aushodam Team",             time: "1 hr ago",   category: "regular",    read: false },
  { id: 7, title: "System maintenance scheduled.",         uploader: "Posted by: Aushodam Team",             time: "3 hr ago",   category: "regular",    read: false },
  { id: 8, title: "New protocol for teleconsultation.",   uploader: "Posted by: Admin",                     time: "Yesterday",  category: "regular",    read: true  },
  { id: 9, title: "CPD webinar invite: April 2026.",       uploader: "Posted by: Medical Association",       time: "2 days ago", category: "regular",    read: true  },
];

// ── Emergency Alerts ──────────────────────────────────────────────────────────
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
  { id: 1, type: "chest pain",       message: "Experiencing severe chest pain and shortness of breath. Blood pressure is high.",    patient: "Ramya Reddy", age: 54, time: "30 min ago", severity: "critical", contactNumber: "+91 98765 43210", bloodPressure: "180/110 mmHg", heartRate: "112 bpm", notes: "Patient reported pain radiating to left arm. ECG requested. Family notified." },
  { id: 2, type: "allergic reaction",message: "Severe allergic reaction, swelling in throat, trouble breathing.",                   patient: "Pramod Iyer", age: 65, time: "1 hr ago",   severity: "critical", contactNumber: "+91 87654 32109", heartRate: "98 bpm",           notes: "Administered epinephrine 0.3mg. Patient stabilised. Under observation." },
  { id: 3, type: "fall injury",      message: "Patient fell in corridor. Possible fracture in left wrist.",                        patient: "Suresh Menon",age: 71, time: "2 hr ago",   severity: "high",     contactNumber: "+91 76543 21098", bloodPressure: "135/85 mmHg",  heartRate: "78 bpm", notes: "X-ray ordered. Pain management administered." },
];

// ── Metrics ───────────────────────────────────────────────────────────────────
export interface MetricPeriod {
  label: string;
  inProcess: number;
  completed: number;
  cancelled: number;
  trend: "up" | "down" | "flat";
  trendValue: string;
}

export const mockMetrics: Record<string, MetricPeriod> = {
  Daily:   { label: "Daily",   inProcess: 8,    completed: 14,  cancelled: 1,   trend: "flat", trendValue: "0%"   },
  Weekly:  { label: "Weekly",  inProcess: 40,   completed: 68,  cancelled: 5,   trend: "up",   trendValue: "+12%" },
  Monthly: { label: "Monthly", inProcess: 160,  completed: 275, cancelled: 20,  trend: "down", trendValue: "-4%"  },
  Yearly:  { label: "Yearly",  inProcess: 1920, completed: 3300,cancelled: 240, trend: "up",   trendValue: "+22%" },
};

// ── Date Navigation ───────────────────────────────────────────────────────────
export const mockDates = [
  "Jun 20, 2022", "Jun 21, 2022", "Jun 22, 2022", "Jun 23, 2022",
  "Jun 24, 2022", "Jun 25, 2022", "Jun 26, 2022",
];

// ── Async simulator ───────────────────────────────────────────────────────────
export function simulateAsync<T>(value: T, delayMs = 1200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delayMs));
}
