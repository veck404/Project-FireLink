export type UserRole = "citizen" | "firefighter" | "administrator";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus = "reported" | "assigned" | "responding" | "contained" | "closed";

export type Incident = {
  id: string;
  reporter_name: string;
  reporter_contact: string;
  incident_type: string;
  location: string;
  severity: IncidentSeverity;
  description: string;
  status: IncidentStatus;
  assigned_unit?: string | null;
  response_minutes?: number | null;
  created_at: string;
  updated_at?: string | null;
};

export type IncidentInput = Pick<
  Incident,
  "reporter_name" | "reporter_contact" | "incident_type" | "location" | "severity" | "description"
>;
