# **App Name**: CareVision

## Core Features:

- Role-Based Authentication: Firebase Authentication with custom claims for admin, doctor, and management roles.
- Patient Management: Add, view, and manage patient records.
- Session Management: Create and manage patient sessions with report uploads and doctor notes.
- AI-Powered Clinical Report Generation: Run AI analysis on patient reports and notes to generate summaries, findings, diagnoses, and recommended tests. Uses an AI tool to help with this.
- PDF Report Generation: Generate PDF reports containing patient data, session details, AI analysis, and doctor notes.
- Report Upload and Storage: Securely upload and store patient reports, ensuring access control based on user roles.
- Management Reporting: Management role has the ability to view reports for all patients and filter them by date.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey trust and professionalism, suitable for the medical context.
- Background color: Light gray (#F5F5F5), nearly desaturated, providing a clean and modern backdrop.
- Accent color: Soft purple (#9575CD), analogous to the primary blue, to add visual interest to key UI elements like buttons and active states.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text, because the text is primarily short.
- Use a set of consistent and professional icons to represent different data points. The icons will be related to medicine and patient care.
- Clean, modern layout with clear separation of sections to allow doctors and management to quickly find the content that they need. A tile design with good use of whitespace will be preferred for the dashboard view.
- Subtle animations will be used to acknowledge user actions (e.g. successfully saved data). These should be short and non-intrusive.