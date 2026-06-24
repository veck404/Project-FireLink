import { MapPin, RadioTower } from "lucide-react";
import { workflow } from "@/lib/source-data";
import { formatIncidentDate } from "@/lib/date-format";
import { severityStyles, statusLabels, statusStyles } from "@/lib/incident-display";
import type { Incident } from "@/lib/types";
import { nightResponseImage } from "@/lib/visual-assets";

export function DashboardSection({ incidents }: { incidents: Incident[] }) {
  return (
    <section id="dashboard" className="bg-[#f7efe3]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Operations</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Response dashboard</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            The workflow follows the report: incident occurs, citizen submits, data is validated,
            notifications are sent, firefighters respond, and administrators generate reports.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <IncidentQueue incidents={incidents} />
          <OperationsMap incidents={incidents} />
        </div>
      </div>
    </section>
  );
}

function IncidentQueue({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="overflow-hidden rounded border border-orange-100 bg-white shadow-[0_20px_60px_rgba(127,29,29,.12)]">
      <div className="border-b border-orange-100 bg-gradient-to-r from-slate-950 via-red-950 to-orange-800 px-5 py-4 text-white">
        <h3 className="inline-flex items-center gap-2 text-base font-semibold">
          <RadioTower className="size-5" aria-hidden="true" />
          Active incident queue
        </h3>
      </div>
      <div className="divide-y divide-slate-200">
        {incidents.map((incident) => (
          <article key={incident.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-slate-950">{incident.incident_type}</h4>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${statusStyles[incident.status]}`}>
                  {statusLabels[incident.status]}
                </span>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold capitalize ring-1 ${
                    severityStyles[incident.severity]
                  }`}
                >
                  {incident.severity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{incident.description}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="size-4 text-red-700" aria-hidden="true" />
                {incident.location}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-semibold text-slate-950">{incident.assigned_unit ?? "Dispatch pending"}</p>
              <p className="mt-1 text-xs text-slate-500">{formatIncidentDate(incident.created_at)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function OperationsMap({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="rounded border border-orange-100 bg-slate-950 p-5 text-white shadow-[0_20px_60px_rgba(127,29,29,.18)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="inline-flex items-center gap-2 text-base font-semibold">
            <MapPin className="size-5 text-amber-300" aria-hidden="true" />
            Siavonga response map
          </h3>
          <p className="mt-1 text-sm text-slate-300">Visual incident distribution for dispatch review</p>
        </div>
        <span className="rounded bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-100 ring-1 ring-red-300/20">
          Live view
        </span>
      </div>
      <div
        className="relative h-[340px] overflow-hidden rounded border border-white/10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,.78), rgba(15,23,42,.9)), url(${nightResponseImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-x-8 top-12 h-24 rounded-full border border-sky-300/30 bg-sky-400/10" />
        <div className="absolute bottom-10 left-8 right-8 h-20 -rotate-6 rounded-full border border-emerald-300/20 bg-emerald-300/10" />
        {incidents.slice(0, 5).map((incident, index) => (
          <div
            key={incident.id}
            className="absolute"
            style={{
              left: `${18 + index * 15}%`,
              top: `${28 + (index % 3) * 18}%`,
            }}
          >
            <span className="relative flex size-5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-300 opacity-60" />
              <span className="relative inline-flex size-5 rounded-full border-2 border-white bg-red-600 shadow-lg shadow-red-500/40" />
            </span>
            <span className="mt-2 block max-w-28 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-950 shadow">
              {incident.location.split(",")[0]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        {workflow.slice(0, 4).map((step, index) => (
          <div key={step} className="rounded bg-white/5 p-3">
            <span className="text-xs font-semibold text-red-300">Step {index + 1}</span>
            <p className="mt-1 text-slate-200">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
