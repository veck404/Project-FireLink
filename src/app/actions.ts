"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createIncident, updateIncidentStatus } from "@/lib/supabase-rest";
import type { IncidentSeverity, IncidentStatus } from "@/lib/types";

const severities = new Set(["low", "medium", "high", "critical"]);
const statuses = new Set(["reported", "assigned", "responding", "contained", "closed"]);

export async function submitIncident(formData: FormData) {
  const severity = String(formData.get("severity") ?? "high");

  await createIncident({
    reporter_name: String(formData.get("reporter_name") ?? "").trim(),
    reporter_contact: String(formData.get("reporter_contact") ?? "").trim(),
    incident_type: String(formData.get("incident_type") ?? "Structure fire").trim(),
    location: String(formData.get("location") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    severity: severities.has(severity) ? (severity as IncidentSeverity) : "high",
  });

  revalidatePath("/");
  revalidatePath("/user");
  revalidatePath("/admin");
  redirect("/user?reported=1#report-status");
}

export async function respondToIncident(formData: FormData) {
  const incidentId = String(formData.get("incident_id") ?? "");
  const status = String(formData.get("status") ?? "assigned");
  const assignedUnit = String(formData.get("assigned_unit") ?? "Fire Brigade Dispatch").trim();

  if (!incidentId || !statuses.has(status)) {
    return;
  }

  await updateIncidentStatus({
    incidentId,
    status: status as IncidentStatus,
    assignedUnit,
  });

  revalidatePath("/admin");
  revalidatePath("/user");
  revalidatePath("/");
}
