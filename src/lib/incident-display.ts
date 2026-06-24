import type { IncidentSeverity, IncidentStatus } from "@/lib/types";

export const statusLabels: Record<IncidentStatus, string> = {
  reported: "Reported",
  assigned: "Assigned",
  responding: "Responding",
  contained: "Contained",
  closed: "Closed",
};

export const severityStyles: Record<IncidentSeverity, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-orange-50 text-orange-700 ring-orange-200",
  critical: "bg-red-50 text-red-700 ring-red-200",
};

export const statusStyles: Record<IncidentStatus, string> = {
  reported: "bg-slate-100 text-slate-700",
  assigned: "bg-sky-100 text-sky-700",
  responding: "bg-orange-100 text-orange-800",
  contained: "bg-emerald-100 text-emerald-700",
  closed: "bg-zinc-100 text-zinc-600",
};
