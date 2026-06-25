import { respondToIncident } from "@/app/actions";
import { Activity, BarChart3, CheckCircle2, FlameKindling, RadioTower, ShieldAlert, Truck } from "lucide-react";
import { formatIncidentDate } from "@/lib/date-format";
import { severityStyles, statusLabels, statusStyles } from "@/lib/incident-display";
import type { Incident, IncidentStatus } from "@/lib/types";
import { nightResponseImage } from "@/lib/visual-assets";

export function AdminDashboard({ incidents }: { incidents: Incident[] }) {
  const activeIncidents = incidents.filter((incident) => incident.status !== "closed");
  const criticalIncidents = incidents.filter((incident) => incident.severity === "critical");
  const respondingIncidents = incidents.filter((incident) => incident.status === "responding");
  const containedIncidents = incidents.filter((incident) => incident.status === "contained");

  return (
    <>
      <section
        className="bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.96), rgba(71,16,8,.82)), url(${nightResponseImage})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
            <BarChart3 className="size-4" aria-hidden="true" />
            Admin dashboard
          </p>
          <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
                Analytics and instant response command
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-orange-50/80">
                Monitor active fire reports, review severity patterns, and update response status
                directly from the admin command queue.
              </p>
            </div>
            <div className="rounded border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-100/70">Command state</p>
              <p className="mt-1 text-2xl font-semibold">{activeIncidents.length} active</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AdminMetric icon={<Activity className="size-5" />} label="Active incidents" value={activeIncidents.length.toString()} />
            <AdminMetric icon={<ShieldAlert className="size-5" />} label="Critical alerts" value={criticalIncidents.length.toString()} />
            <AdminMetric icon={<Truck className="size-5" />} label="Responding" value={respondingIncidents.length.toString()} />
            <AdminMetric icon={<CheckCircle2 className="size-5" />} label="Contained" value={containedIncidents.length.toString()} />
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ef]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
          <div className="overflow-hidden rounded border border-orange-100 bg-white shadow-[0_20px_60px_rgba(127,29,29,.1)]">
            <div className="border-b border-orange-100 bg-gradient-to-r from-slate-950 via-red-950 to-orange-800 px-5 py-4 text-white">
              <h2 className="inline-flex items-center gap-2 text-base font-semibold">
                <RadioTower className="size-5" aria-hidden="true" />
                Incident response queue
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {activeIncidents.map((incident) => (
                <AdminIncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <AnalyticsPanel title="Severity mix" rows={getSeverityRows(incidents)} />
            <AnalyticsPanel title="Status mix" rows={getStatusRows(incidents)} />
          </div>
        </div>
      </section>
    </>
  );
}

function AdminIncidentCard({ incident }: { incident: Incident }) {
  return (
    <article className="px-5 py-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-950">{incident.incident_type}</h3>
            <span className={`rounded px-2 py-1 text-xs font-semibold ${statusStyles[incident.status]}`}>
              {statusLabels[incident.status]}
            </span>
            <span className={`rounded px-2 py-1 text-xs font-semibold capitalize ring-1 ${severityStyles[incident.severity]}`}>
              {incident.severity}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{incident.description}</p>
          <p className="mt-2 text-sm font-medium text-slate-700">{incident.location}</p>
          <p className="mt-1 text-xs text-slate-500">{formatIncidentDate(incident.created_at)}</p>
        </div>
        <div className="grid min-w-44 gap-2">
          <ResponseButton incidentId={incident.id} status="assigned" label="Dispatch unit" />
          <ResponseButton incidentId={incident.id} status="responding" label="Mark responding" />
          <ResponseButton incidentId={incident.id} status="contained" label="Mark contained" />
        </div>
      </div>
    </article>
  );
}

function ResponseButton({
  incidentId,
  status,
  label,
}: {
  incidentId: string;
  status: IncidentStatus;
  label: string;
}) {
  return (
    <form action={respondToIncident}>
      <input type="hidden" name="incident_id" value={incidentId} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="assigned_unit" value="Fire Brigade Dispatch" />
      <button
        type="submit"
        className="min-h-10 w-full rounded bg-slate-950 px-3 text-sm font-semibold text-white hover:bg-red-800"
      >
        {label}
      </button>
    </form>
  );
}

function AdminMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="mb-3 grid size-10 place-items-center rounded bg-gradient-to-br from-red-600 to-amber-400 text-white">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-100/70">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function AnalyticsPanel({ title, rows }: { title: string; rows: Array<{ label: string; count: number; percent: number }> }) {
  return (
    <div className="rounded border border-orange-100 bg-white p-5 shadow-[0_20px_60px_rgba(127,29,29,.08)]">
      <h2 className="inline-flex items-center gap-2 text-base font-semibold text-slate-950">
        <FlameKindling className="size-5 text-red-700" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium capitalize text-slate-700">{row.label}</span>
              <span className="font-semibold text-slate-950">{row.count}</span>
            </div>
            <div className="h-2 rounded bg-orange-100">
              <div
                className="h-2 rounded bg-gradient-to-r from-red-700 via-orange-500 to-amber-300"
                style={{ width: `${row.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getSeverityRows(incidents: Incident[]) {
  return getRows(incidents.map((incident) => incident.severity), ["critical", "high", "medium", "low"]);
}

function getStatusRows(incidents: Incident[]) {
  return getRows(incidents.map((incident) => incident.status), ["reported", "assigned", "responding", "contained", "closed"]);
}

function getRows(values: string[], order: string[]) {
  const total = values.length || 1;
  return order.map((label) => {
    const count = values.filter((value) => value === label).length;
    return {
      label,
      count,
      percent: Math.round((count / total) * 100),
    };
  });
}
