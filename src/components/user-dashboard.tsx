import { CheckCircle2, Clock3, Flame, MapPin, ShieldCheck, Siren } from "lucide-react";
import { IncidentForm } from "@/components/incident-form";
import { formatIncidentDate } from "@/lib/date-format";
import { severityStyles, statusLabels, statusStyles } from "@/lib/incident-display";
import type { Incident } from "@/lib/types";
import { heroImage } from "@/lib/visual-assets";

export function UserDashboard({ reported, incidents }: { reported: boolean; incidents: Incident[] }) {
  const visibleIncidents = incidents.slice(0, 4);

  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(18,9,7,.96), rgba(71,16,8,.76)), url(${heroImage})`,
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
              <Siren className="size-4" aria-hidden="true" />
              User dashboard
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Report fire incidents quickly and clearly
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-orange-50/80">
              This dashboard is for citizens, clients, and community members who need a simple way
              to submit fire reports and understand what information responders need.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <UserGuidance icon={<MapPin className="size-5" />} title="Location" text="Use landmarks or coordinates." />
              <UserGuidance icon={<Flame className="size-5" />} title="Severity" text="Mark urgent hazards clearly." />
              <UserGuidance icon={<ShieldCheck className="size-5" />} title="Safety" text="Move away before reporting." />
            </div>
          </div>
          <IncidentForm />
        </div>
      </section>

      <section id="report-status" className="bg-[#fff8ef]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div className="rounded border border-orange-100 bg-white p-5 shadow-[0_20px_60px_rgba(127,29,29,.08)]">
            <div className="grid size-12 place-items-center rounded bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-6" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              {reported ? "Report received" : "What happens after reporting"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Reports enter the central incident queue, are reviewed by responders, and move through
              assignment, response, containment, and closure.
            </p>
            <div className="mt-5 space-y-3">
              {["Submitted", "Validated", "Assigned", "Responded"].map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded bg-red-50 text-xs font-semibold text-red-700">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded border border-orange-100 bg-white shadow-[0_20px_60px_rgba(127,29,29,.08)]">
            <div className="border-b border-orange-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-950">Recent report activity</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {visibleIncidents.map((incident) => (
                <article key={incident.id} className="px-5 py-4">
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
                  <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Clock3 className="size-4 text-red-700" aria-hidden="true" />
                    {formatIncidentDate(incident.created_at)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function UserGuidance({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="mb-3 grid size-10 place-items-center rounded bg-white text-red-700">{icon}</div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-orange-50/70">{text}</p>
    </div>
  );
}
