import { submitIncident } from "@/app/actions";
import {
  actors,
  challenges,
  evaluationResults,
  reportingMethods,
  requirements,
  systemModules,
  workflow,
} from "@/lib/source-data";
import { getIncidents, isSupabaseConfigured } from "@/lib/supabase-rest";
import type { Incident, IncidentSeverity, IncidentStatus } from "@/lib/types";

const statusLabels: Record<IncidentStatus, string> = {
  reported: "Reported",
  assigned: "Assigned",
  responding: "Responding",
  contained: "Contained",
  closed: "Closed",
};

const severityStyles: Record<IncidentSeverity, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-orange-50 text-orange-700 ring-orange-200",
  critical: "bg-red-50 text-red-700 ring-red-200",
};

const statusStyles: Record<IncidentStatus, string> = {
  reported: "bg-slate-100 text-slate-700",
  assigned: "bg-sky-100 text-sky-700",
  responding: "bg-orange-100 text-orange-700",
  contained: "bg-emerald-100 text-emerald-700",
  closed: "bg-zinc-100 text-zinc-600",
};

type HomeProps = {
  searchParams?: Promise<{
    reported?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const incidents = await getIncidents();
  const activeIncidents = incidents.filter((incident) => incident.status !== "closed");
  const criticalIncidents = incidents.filter((incident) => incident.severity === "critical");
  const averageResponse = Math.round(
    incidents.reduce((total, incident) => total + (incident.response_minutes ?? 0), 0) /
      incidents.filter((incident) => typeof incident.response_minutes === "number").length,
  );
  const supabaseReady = isSupabaseConfigured();

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded bg-red-700 text-sm font-black text-white">
              FS
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-wide text-red-700">
                FireLink Zambia
              </span>
              <span className="block text-xs text-slate-500">Emergency reporting command</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a className="hover:text-red-700" href="#dashboard">
              Dashboard
            </a>
            <a className="hover:text-red-700" href="#incidents">
              Incidents
            </a>
            <a className="hover:text-red-700" href="#findings">
              Findings
            </a>
            <a className="hover:text-red-700" href="#schema">
              Supabase
            </a>
          </nav>
          <a
            href="#report"
            className="inline-flex min-h-10 items-center justify-center rounded bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-red-800"
          >
            Report fire
          </a>
        </div>
      </header>

      <section id="top" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <StatusBadge active={supabaseReady} />
                {params?.reported ? (
                  <span className="rounded bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                    Incident captured
                  </span>
                ) : null}
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                Real-time fire disaster reporting and response coordination
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                Built from Nalukui Mwitumwa&apos;s research project, this system replaces delayed
                phone-based reporting with a centralized platform for citizens, firefighters, and
                administrators.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Active incidents" value={activeIncidents.length.toString()} detail="Live queue" />
              <Metric label="Critical alerts" value={criticalIncidents.length.toString()} detail="Highest severity" />
              <Metric label="Avg. response" value={`${averageResponse}m`} detail="Seeded evaluation" />
            </div>
          </div>

          <IncidentForm />
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
          <IncidentQueue incidents={activeIncidents} />
          <OperationsMap incidents={activeIncidents} />
        </div>
      </section>

      <section id="incidents" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Actors</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Role-based system modules</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The core product mirrors the system actors in the report: citizen reporting,
              firefighter response management, and administrator oversight.
            </p>
            <div className="mt-6 grid gap-3">
              {actors.map((actor) => (
                <div key={actor.role} className="rounded border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-950">{actor.role}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{actor.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {systemModules.map((module) => (
              <div key={module.name} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-1.5 w-12 rounded bg-red-700" />
                <h3 className="text-base font-semibold text-slate-950">{module.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="findings" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <EvidencePanel
            title="Existing reporting methods"
            caption="Telephone calls dominate the current process, which explains the need for mobile and web reporting."
            data={reportingMethods}
          />
          <EvidencePanel
            title="Major challenges"
            caption="Delayed reporting and poor communication are the strongest blockers in the research findings."
            data={challenges}
          />
          <EvaluationPanel />
        </div>
      </section>

      <section id="schema" className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">Supabase ready</p>
            <h2 className="mt-1 text-2xl font-semibold">Database-backed when credentials are added</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The app reads from and writes to Supabase through the server-side REST adapter when
              environment variables are present. Without credentials, it uses source-derived seed
              incidents so the interface remains usable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.map((item) => (
              <div key={item.title} className="rounded border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function IncidentForm() {
  return (
    <form
      id="report"
      action={submitIncident}
      className="rounded border border-slate-200 bg-[#fbfaf7] p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Citizen report</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-950">Submit a fire incident</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Reporter name
          <input
            name="reporter_name"
            required
            className="mt-2 min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            placeholder="Full name"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Phone or email
          <input
            name="reporter_contact"
            required
            className="mt-2 min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            placeholder="+260..."
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Incident type
          <select
            name="incident_type"
            className="mt-2 min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            defaultValue="Structure fire"
          >
            <option>Structure fire</option>
            <option>Electrical fire</option>
            <option>Vehicle fire</option>
            <option>Bush fire</option>
            <option>Industrial fire</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Severity
          <select
            name="severity"
            className="mt-2 min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            defaultValue="high"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Location
          <input
            name="location"
            required
            className="mt-2 min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            placeholder="Compound, landmark, road, or coordinates"
          />
        </label>
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Description
          <textarea
            name="description"
            required
            rows={4}
            className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-3 text-slate-950 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            placeholder="What is burning? Are people trapped? Any hazardous materials?"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded bg-red-700 px-4 text-sm font-semibold text-white hover:bg-red-800"
      >
        Send emergency report
      </button>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Reports are routed to the centralized incident queue and notification table.
      </p>
    </form>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded px-3 py-1 text-xs font-semibold ring-1 ${
        active
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-amber-50 text-amber-800 ring-amber-200"
      }`}
    >
      <span className={`size-2 rounded-full ${active ? "bg-emerald-600" : "bg-amber-500"}`} />
      {active ? "Supabase connected" : "Using seeded source data"}
    </span>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-slate-200 bg-[#fbfaf7] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

function IncidentQueue({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="rounded border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-base font-semibold text-slate-950">Active incident queue</h3>
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
              <p className="mt-2 text-sm font-medium text-slate-700">{incident.location}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-semibold text-slate-950">{incident.assigned_unit ?? "Dispatch pending"}</p>
              <p className="mt-1 text-xs text-slate-500">{formatDate(incident.created_at)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function OperationsMap({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="rounded border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Siavonga response map</h3>
          <p className="mt-1 text-sm text-slate-300">Visual incident distribution for dispatch review</p>
        </div>
        <span className="rounded bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
          Live view
        </span>
      </div>
      <div className="relative h-[340px] overflow-hidden rounded border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]">
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
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex size-5 rounded-full border-2 border-white bg-red-600" />
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

function EvidencePanel({
  title,
  caption,
  data,
}: {
  title: string;
  caption: string;
  data: { label: string; value: number }[];
}) {
  return (
    <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{caption}</p>
      <div className="mt-5 space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-950">{item.value}%</span>
            </div>
            <div className="h-2 rounded bg-slate-100">
              <div className="h-2 rounded bg-red-700" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvaluationPanel() {
  return (
    <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-950">System evaluation</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Respondents rated the prototype strongly across usability, response time, accuracy, and reliability.
      </p>
      <div className="mt-5 space-y-3">
        {evaluationResults.map((item) => (
          <div key={item.indicator} className="rounded border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-800">{item.indicator}</span>
              <span className="text-sm font-semibold text-red-700">{item.veryGoodPercent}% very good</span>
            </div>
            <div className="mt-3 h-2 rounded bg-white">
              <div className="h-2 rounded bg-red-700" style={{ width: `${item.veryGoodPercent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
