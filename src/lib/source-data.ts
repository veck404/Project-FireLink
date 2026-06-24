import type { Incident } from "@/lib/types";

export const reportingMethods = [
  { label: "Telephone calls", value: 45 },
  { label: "Physical reporting", value: 25 },
  { label: "Social media", value: 17.5 },
  { label: "Email reporting", value: 12.5 },
];

export const challenges = [
  { label: "Delayed reporting", value: 37.5 },
  { label: "Poor communication", value: 25 },
  { label: "Lack of centralized information", value: 20 },
  { label: "Inaccurate reports", value: 10 },
  { label: "Poor coordination", value: 7.5 },
];

export const evaluationResults = [
  { indicator: "Ease of use", veryGood: 22, total: 40, veryGoodPercent: 55 },
  { indicator: "Response time", veryGood: 24, total: 40, veryGoodPercent: 60 },
  { indicator: "Accuracy", veryGood: 20, total: 40, veryGoodPercent: 50 },
  { indicator: "Reliability", veryGood: 18, total: 40, veryGoodPercent: 45 },
  { indicator: "User satisfaction", veryGood: 23, total: 40, veryGoodPercent: 57.5 },
];

export const actors = [
  {
    role: "Citizen",
    summary: "Registers, reports fire incidents, views status updates, and receives notifications.",
  },
  {
    role: "Firefighter",
    summary: "Views reported incidents, responds to emergencies, updates status, and monitors active events.",
  },
  {
    role: "Administrator",
    summary: "Manages users, monitors system activity, generates reports, and maintains operational security.",
  },
];

export const systemModules = [
  {
    name: "User authentication",
    description: "Supabase Auth-ready role access for citizens, firefighters, and administrators.",
  },
  {
    name: "Incident reporting",
    description: "A mobile-accessible report form captures location, severity, description, and reporter contact.",
  },
  {
    name: "Emergency notification",
    description: "Each submitted incident can create notification rows for responder and admin queues.",
  },
  {
    name: "Monitoring dashboard",
    description: "Real-time incident status, severity, assigned units, and operational response metrics.",
  },
  {
    name: "Report generation",
    description: "Management reports summarize methods, challenges, response trends, and user evaluation results.",
  },
  {
    name: "Database management",
    description: "Centralized incident, notification, user profile, and generated report records in Supabase.",
  },
];

export const workflow = [
  "Incident occurs",
  "Citizen submits report",
  "System validates data",
  "Record enters database",
  "Responders receive alert",
  "Firefighters update status",
  "Admin generates reports",
];

export const requirements = [
  {
    title: "Functional scope",
    description: "Registration, login, fire reporting, notifications, tracking, status updates, and reports.",
  },
  {
    title: "Quality attributes",
    description: "Security, reliability, scalability, availability, maintainability, and mobile compatibility.",
  },
  {
    title: "System architecture",
    description: "Presentation, application, and database layers modeled from the report architecture.",
  },
  {
    title: "Security posture",
    description: "Authentication, access control, session management, encrypted passwords, and secure transport.",
  },
];

export const seedIncidents: Incident[] = [
  {
    id: "seed-001",
    reporter_name: "Community member",
    reporter_contact: "+260 977 000 001",
    incident_type: "Structure fire",
    location: "Siavonga market, central block",
    severity: "critical",
    description: "Smoke visible from a row of market stalls with people evacuating nearby shops.",
    status: "responding",
    assigned_unit: "Fire Brigade Unit 1",
    response_minutes: 8,
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
  },
  {
    id: "seed-002",
    reporter_name: "ZESCO operator",
    reporter_contact: "operations@example.com",
    incident_type: "Electrical fire",
    location: "ZESCO power generation substation",
    severity: "high",
    description: "Electrical panel fire reported near maintenance bay. Power team has isolated the area.",
    status: "assigned",
    assigned_unit: "Fire Brigade Unit 2",
    response_minutes: 12,
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "seed-003",
    reporter_name: "Town council officer",
    reporter_contact: "council@example.com",
    incident_type: "Bush fire",
    location: "Kanyelele road reserve",
    severity: "medium",
    description: "Grass fire spreading toward roadside property after afternoon winds increased.",
    status: "contained",
    assigned_unit: "Rapid Response Team",
    response_minutes: 15,
    created_at: new Date(Date.now() - 1000 * 60 * 76).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
  },
  {
    id: "seed-004",
    reporter_name: "Resident",
    reporter_contact: "+260 966 000 004",
    incident_type: "Vehicle fire",
    location: "Harbour access road",
    severity: "high",
    description: "A minibus engine compartment is burning near parked vehicles.",
    status: "reported",
    assigned_unit: null,
    response_minutes: 10,
    created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
];
