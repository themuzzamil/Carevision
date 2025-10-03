export type UserRole = 'admin' | 'doctor' | 'management';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  avatarUrl: string;
  createdBy: string; // userId
  createdAt: string;
}

export interface Session {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  notes: string;
  aiReportId?: string;
  pdfUrl?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  sessionId: string;
  filePath: string;
  fileName: string;
  uploadedBy: string; // userId
  uploadedAt: string;
  type: 'pdf' | 'image' | 'text';
  description: string;
}

export interface AiAnalysis {
  id: string;
  sessionId: string;
  summary: string;
  key_findings: string[];
  likely_diagnoses: { diagnosis: string; reason: string }[];
  recommended_tests: string[];
  next_steps: string[];
  red_flags: string[];
  createdAt: string;
}
