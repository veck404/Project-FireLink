"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createIncident } from "@/lib/supabase-rest";
import type { IncidentSeverity } from "@/lib/types";

const severities = new Set(["low", "medium", "high", "critical"]);

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
  redirect("/?reported=1#dashboard");
}
