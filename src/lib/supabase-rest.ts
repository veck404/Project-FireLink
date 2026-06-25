import { seedIncidents } from "@/lib/source-data";
import type { Incident, IncidentInput, IncidentSeverity, IncidentStatus } from "@/lib/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export async function getIncidents(): Promise<Incident[]> {
  if (!isSupabaseConfigured()) {
    return seedIncidents;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/incidents?select=*&order=created_at.desc`,
      {
        headers: supabaseHeaders(),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.warn("Supabase incident fetch failed", await response.text());
      return seedIncidents;
    }

    const data = (await response.json()) as Partial<Incident>[];
    return data.map(normalizeIncident);
  } catch (error) {
    console.warn("Supabase incident fetch failed", error);
    return seedIncidents;
  }
}

export async function createIncident(input: IncidentInput): Promise<Incident> {
  const now = new Date().toISOString();
  const fallback: Incident = {
    id: `local-${Date.now()}`,
    ...input,
    status: "reported",
    assigned_unit: null,
    response_minutes: null,
    created_at: now,
    updated_at: now,
  };

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/incidents`, {
      method: "POST",
      headers: supabaseHeaders("return=representation"),
      body: JSON.stringify({
        ...input,
        status: "reported",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("Supabase incident insert failed", await response.text());
      return fallback;
    }

    const data = (await response.json()) as Partial<Incident>[];
    return normalizeIncident(data[0] ?? fallback);
  } catch (error) {
    console.warn("Supabase incident insert failed", error);
    return fallback;
  }
}

export async function updateIncidentStatus({
  incidentId,
  status,
  assignedUnit,
}: {
  incidentId: string;
  status: IncidentStatus;
  assignedUnit?: string;
}) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/incidents?id=eq.${encodeURIComponent(incidentId)}`, {
      method: "PATCH",
      headers: supabaseHeaders(),
      body: JSON.stringify({
        status,
        assigned_unit: assignedUnit || null,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("Supabase incident update failed", await response.text());
    }
  } catch (error) {
    console.warn("Supabase incident update failed", error);
  }
}

function supabaseHeaders(prefer?: string) {
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  if (prefer) {
    headers.Prefer = prefer;
  }

  return headers;
}

function normalizeIncident(value: Partial<Incident>): Incident {
  const now = new Date().toISOString();

  return {
    id: String(value.id ?? `incident-${Date.now()}`),
    reporter_name: String(value.reporter_name ?? "Unknown reporter"),
    reporter_contact: String(value.reporter_contact ?? "Not provided"),
    incident_type: String(value.incident_type ?? "Fire incident"),
    location: String(value.location ?? "Location pending"),
    severity: normalizeSeverity(value.severity),
    description: String(value.description ?? "No description provided."),
    status: normalizeStatus(value.status),
    assigned_unit: value.assigned_unit ?? null,
    response_minutes:
      typeof value.response_minutes === "number" ? value.response_minutes : null,
    created_at: String(value.created_at ?? now),
    updated_at: value.updated_at ? String(value.updated_at) : null,
  };
}

function normalizeSeverity(value: unknown): IncidentSeverity {
  if (value === "low" || value === "medium" || value === "high" || value === "critical") {
    return value;
  }

  return "high";
}

function normalizeStatus(value: unknown): IncidentStatus {
  if (
    value === "reported" ||
    value === "assigned" ||
    value === "responding" ||
    value === "contained" ||
    value === "closed"
  ) {
    return value;
  }

  return "reported";
}
