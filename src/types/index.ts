// SafeUganda TypeScript Data Models

export type UserRole = 'child' | 'parent' | 'school' | 'admin';

export type IncidentCategory = 
  | 'Cyberbullying'
  | 'Harassment'
  | 'Threats'
  | 'Inappropriate Content'
  | 'Grooming Concerns'
  | 'Sextortion'
  | 'Fake Account'
  | 'Suspicious Message'
  | 'Malicious Links'
  | 'Other';

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type IncidentStatus = 'New' | 'Under Review' | 'Escalated' | 'Resolved';

export type PlatformType = 
  | 'WhatsApp'
  | 'Facebook'
  | 'Instagram'
  | 'TikTok'
  | 'YouTube'
  | 'Online Game'
  | 'SMS'
  | 'Website'
  | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  schoolName?: string;
  district?: string;
}

export interface TrustedAdult {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isVerified: boolean;
  notes?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  safetyScore: number;
  school: string;
  district: string;
  trustedAdults: TrustedAdult[];
  lastActive: string;
  safetyPoints: number;
  badges: string[];
  completedLessons: string[];
}

export interface ParentProfile {
  id: string;
  name: string;
  children: ChildProfile[];
  emergencyContact: string;
}

export interface School {
  id: string;
  name: string;
  district: string;
  studentCount: number;
  reportsThisMonth: number;
  resolvedCases: number;
  pendingCases: number;
  trainingCompletionRate: number;
  safeguardingOfficer: string;
  contactEmail: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  author: string;
}

export interface Incident {
  id: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  date: string;
  status: IncidentStatus;
  locationDistrict: string;
  reporterRole: UserRole;
  affectedPerson: 'Me' | 'A friend' | 'Another child' | 'Someone else';
  description: string;
  platform: PlatformType;
  assignedOfficer: string;
  evidenceItems: {
    id: string;
    title: string;
    type: 'screenshot' | 'chat_log' | 'link';
    maskedPreview: string;
    sha256: string;
  }[];
  safeguardingNotes: string[];
  timeline: TimelineEvent[];
  resolution?: string;
}

export interface SafetyAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  childName: string;
  type: 'bullying' | 'pattern' | 'content' | 'checkin';
  read: boolean;
  discussionPrompt: string;
}

export interface SafetyScore {
  overall: number; // 0 - 100
  label: string; // 'Good Safety'
  feedback: string;
  categories: {
    privacy: number;
    accountSecurity: number;
    cyberbullying: number;
    contentSafety: number;
    reporting: number;
  };
}

export interface LessonOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Lesson {
  id: string;
  category: 
    | 'Cyberbullying'
    | 'Privacy'
    | 'Password Safety'
    | 'Social Media Safety'
    | 'Grooming Awareness'
    | 'Harmful Content'
    | 'Sextortion Awareness'
    | 'Digital Footprint'
    | 'Safe Reporting';
  title: string;
  description: string;
  points: number;
  durationMinutes: number;
  scenario: string;
  question: string;
  options: LessonOption[];
  explanation: string;
  safetyTip: string;
  isCompleted?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userRole: string;
  officer: string;
  details: string;
  ipHash: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reminder' | 'lesson' | 'report' | 'alert' | 'announcement';
  unread: boolean;
  link?: string;
}
