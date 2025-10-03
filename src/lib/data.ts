import type { User, Patient, Session, AiAnalysis } from './types';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@carevision.com', role: 'doctor', avatarUrl: 'https://picsum.photos/seed/101/40/40', createdAt: '2023-10-01T10:00:00Z' },
  { id: 'user-2', name: 'John Smith', email: 'john.smith@carevision.com', role: 'management', avatarUrl: 'https://picsum.photos/seed/102/40/40', createdAt: '2023-10-01T10:05:00Z' },
  { id: 'user-3', name: 'Jane Doe', email: 'jane.doe@carevision.com', role: 'admin', avatarUrl: 'https://picsum.photos/seed/103/40/40', createdAt: '2023-10-01T10:10:00Z' },
];

export const mockPatients: Patient[] = [
  { id: 'patient-1', name: 'Liam Gallagher', age: 45, gender: 'Male', contact: 'liam.g@email.com', avatarUrl: 'https://picsum.photos/seed/201/40/40', createdBy: 'user-1', createdAt: '2023-10-15T09:30:00Z' },
  { id: 'patient-2', name: 'Olivia Wilde', age: 38, gender: 'Female', contact: 'olivia.w@email.com', avatarUrl: 'https://picsum.photos/seed/202/40/40', createdBy: 'user-1', createdAt: '2023-10-16T11:00:00Z' },
  { id: 'patient-3', name: 'Noah Chen', age: 29, gender: 'Male', contact: 'noah.c@email.com', avatarUrl: 'https://picsum.photos/seed/203/40/40', createdBy: 'user-1', createdAt: '2023-10-17T14:15:00Z' },
  { id: 'patient-4', name: 'Ava Rodriguez', age: 52, gender: 'Female', contact: 'ava.r@email.com', avatarUrl: 'https://picsum.photos/seed/204/40/40', createdBy: 'user-1', createdAt: '2023-10-18T16:45:00Z' },
  { id: 'patient-5', name: 'Ethan Wright', age: 61, gender: 'Male', contact: 'ethan.w@email.com', avatarUrl: 'https://picsum.photos/seed/205/40/40', createdBy: 'user-1', createdAt: '2023-10-19T08:00:00Z' },
];

export const mockSessions: Session[] = [
    { id: 'session-1-1', patientId: 'patient-1', doctorId: 'user-1', date: '2023-11-01T10:00:00Z', notes: 'Patient reports persistent headaches. Initial review of blood work completed.', createdAt: '2023-11-01T10:30:00Z', aiReportId: 'ai-1' },
    { id: 'session-1-2', patientId: 'patient-1', doctorId: 'user-1', date: '2024-02-15T10:00:00Z', notes: 'Follow-up on headaches. MRI results reviewed. No major issues found.', createdAt: '2024-02-15T10:30:00Z' },
    { id: 'session-2-1', patientId: 'patient-2', doctorId: 'user-1', date: '2023-11-05T11:00:00Z', notes: 'Annual check-up. All vitals are stable.', createdAt: '2023-11-05T11:30:00Z' },
    { id: 'session-3-1', patientId: 'patient-3', doctorId: 'user-1', date: '2023-11-10T14:15:00Z', notes: 'Initial consultation for sports-related knee injury.', createdAt: '2023-11-10T14:45:00Z' },
    { id: 'session-4-1', patientId: 'patient-4', doctorId: 'user-1', date: '2023-11-12T16:45:00Z', notes: 'Discussion of cholesterol management plan.', createdAt: '2023-11-12T17:15:00Z' },
];

export const mockAiAnalyses: AiAnalysis[] = [
    {
        id: 'ai-1',
        sessionId: 'session-1-1',
        summary: 'The patient, a 45-year-old male, presents with persistent headaches. Blood work is mostly normal, with slightly elevated cholesterol levels. No immediate signs of neurological distress.',
        key_findings: [
            'Persistent headaches for 3 weeks',
            'Blood pressure: 130/85 mmHg',
            'Total Cholesterol: 210 mg/dL',
            'No reported vision changes',
            'Family history of hypertension',
        ],
        likely_diagnoses: [
            { diagnosis: 'Tension Headache', reason: 'Based on the persistent nature and lack of other neurological symptoms.' },
            { diagnosis: 'Hypertension-related Headache', reason: 'Slightly elevated blood pressure could be a contributing factor.' },
            { diagnosis: 'Migraine without Aura', reason: 'Possible, but less likely without other typical migraine symptoms.' },
        ],
        recommended_tests: [
            'Neurological examination',
            'MRI of the brain to rule out structural issues',
            '24-hour blood pressure monitoring',
        ],
        next_steps: [
            'Schedule a follow-up for neurological exam',
            'Advise patient to keep a headache diary',
        ],
        red_flags: [
            'None immediately apparent, but new onset persistent headaches at this age warrant careful investigation.',
        ],
        createdAt: '2023-11-01T10:35:00Z'
    }
]
