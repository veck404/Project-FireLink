/* eslint-disable @next/next/no-img-element */
import { submitIncident } from "@/app/actions";
import {
  Activity,
  BellRing,
  ChartNoAxesColumnIncreasing,
  CircleGauge,
  Clock3,
  Database,
  FileText,
  Flame,
  FlameKindling,
  LocateFixed,
  MapPin,
  Phone,
  RadioTower,
  ShieldCheck,
  Siren,
  Truck,
  UserRound,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import {
  actors,
  challenges,
  evaluationResults,
  reportingMethods,
  requirements,
  systemModules,
  workflow,
} from "@/lib/source-data";
import { getIncidents } from "@/lib/supabase-rest";
import type { Incident, IncidentSeverity, IncidentStatus } from "@/lib/types";

const heroImage = "https://unsplash.com/photos/6wP4T8QLUGc/download?force=true&w=1800";
const responderImage = "https://unsplash.com/photos/GOConXkcDkU/download?force=true&w=1100";
const nightResponseImage = "https://unsplash.com/photos/Td8IkRj0LA4/download?force=true&w=1300";

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
  responding: "bg-orange-100 text-orange-800",
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
  return (
    <main className="min-h-screen bg-[#120907] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#120907]/90 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded bg-gradient-to-br from-red-600 via-orange-500 to-amber-300 text-white shadow-lg shadow-red-950/40">
              <Flame className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-wide text-amber-200">
                FireLink Zambia
              </span>
              <span className="block text-xs text-orange-100/70">Emergency reporting command</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-orange-50/75 md:flex">
            <a className="hover:text-amber-200" href="#dashboard">
              Dashboard
            </a>
            <a className="hover:text-amber-200" href="#incidents">
              Incidents
            </a>
            <a className="hover:text-amber-200" href="#findings">
              Findings
            </a>
            <a className="hover:text-amber-200" href="#schema">
              Supabase
            </a>
          </nav>
          <a
            href="#report"
            className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-gradient-to-r from-red-600 to-orange-500 px-3 text-sm font-semibold text-white shadow-lg shadow-red-950/35 hover:from-red-500 hover:to-amber-500 sm:px-4"
          >
            <Siren className="size-4" aria-hidden="true" />
            <span className="sm:hidden">Report</span>
            <span className="hidden sm:inline">Report fire</span>
          </a>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden border-b border-white/10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(18,9,7,.96) 0%, rgba(43,15,8,.86) 48%, rgba(94,21,12,.54) 100%), url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,186,73,.25),transparent_26%),radial-gradient(circle_at_80%_30%,rgba(220,38,38,.22),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {params?.reported ? (
                  <span className="rounded bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/30">
                    Incident captured
                  </span>
                ) : null}
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Real-time fire disaster reporting and response coordination
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-orange-50/82">
                Built from Nalukui Mwitumwa&apos;s research project, this system replaces delayed
                phone-based reporting with a centralized platform for citizens, firefighters, and
                administrators.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <HeroPill icon={<RadioTower className="size-4" />} text="Responder alerts" />
                <HeroPill icon={<MapPin className="size-4" />} text="Location-first reports" />
                <HeroPill icon={<ShieldCheck className="size-4" />} text="Admin oversight" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric
                icon={<Activity className="size-5" />}
                label="Active incidents"
                value={activeIncidents.length.toString()}
                detail="Live queue"
              />
              <Metric
                icon={<FlameKindling className="size-5" />}
                label="Critical alerts"
                value={criticalIncidents.length.toString()}
                detail="Highest severity"
              />
              <Metric
                icon={<Clock3 className="size-5" />}
                label="Avg. response"
                value={`${averageResponse}m`}
                detail="Seeded evaluation"
              />
            </div>
          </div>

          <IncidentForm />
        </div>
      </section>

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
          <IncidentQueue incidents={activeIncidents} />
          <OperationsMap incidents={activeIncidents} />
        </div>
        </div>
      </section>

      <section className="bg-[#1b0d0a] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.35fr]">
          <PhotoCard
            image={responderImage}
            eyebrow="Field response"
            title="Dispatch teams get incident context before arrival"
            text="Visual priority, status, and location details reduce the fragmented communication highlighted in the source report."
          />
          <IllustrationPanel />
        </div>
      </section>

      <section id="incidents" className="border-y border-orange-900/20 bg-[#fff8ef]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Actors</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Role-based system modules</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The core product mirrors the system actors in the report: citizen reporting,
              firefighter response management, and administrator oversight.
            </p>
            <div className="mt-6 grid gap-3">
              {actors.map((actor) => (
                <div key={actor.role} className="rounded border border-orange-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 grid size-10 place-items-center rounded bg-red-50 text-red-700">
                    {actor.role === "Citizen" ? (
                      <UsersRound className="size-5" aria-hidden="true" />
                    ) : actor.role === "Firefighter" ? (
                      <Truck className="size-5" aria-hidden="true" />
                    ) : (
                      <UserRoundCheck className="size-5" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-950">{actor.role}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{actor.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {systemModules.map((module, index) => (
              <div
                key={module.name}
                className="rounded border border-orange-100 bg-white p-5 shadow-[0_18px_45px_rgba(127,29,29,.08)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded bg-gradient-to-br from-red-600 to-orange-400 text-white shadow-md shadow-orange-900/20">
                    <ModuleIcon index={index} />
                  </div>
                  <div className="h-1.5 w-12 rounded bg-gradient-to-r from-red-700 via-orange-500 to-amber-300" />
                </div>
                <h3 className="text-base font-semibold text-slate-950">{module.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="findings" className="bg-[#f7efe3]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section
        id="schema"
        className="border-t border-white/10 bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.96), rgba(71,16,8,.86)), url(${nightResponseImage})`,
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
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
              <div key={item.title} className="rounded border border-white/10 bg-white/10 p-4 shadow-xl shadow-black/10 backdrop-blur">
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
      className="overflow-hidden rounded border border-white/20 bg-white shadow-2xl shadow-black/30"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-orange-700 px-5 py-5 text-white">
        <div className="absolute right-[-44px] top-[-52px] size-36 rounded-full bg-amber-300/20 blur-2xl" />
        <div className="absolute bottom-[-72px] left-[-42px] size-40 rounded-full bg-red-500/24 blur-2xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              <Siren className="size-4" aria-hidden="true" />
              Citizen report
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Submit a fire incident</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-orange-50/78">
              Capture the essentials responders need first: contact, severity, location, and what is
              happening on scene.
            </p>
          </div>
          <div className="hidden rounded border border-white/15 bg-white/10 px-3 py-2 text-right backdrop-blur sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-orange-100/70">Priority</p>
            <p className="mt-1 text-sm font-semibold text-white">Immediate dispatch</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 bg-[#fffaf3] p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField icon={<UserRound className="size-4" />} label="Reporter name">
            <input
              name="reporter_name"
              required
              className={fieldClassName}
              placeholder="Full name"
            />
          </FormField>
          <FormField icon={<Phone className="size-4" />} label="Phone or email">
            <input
              name="reporter_contact"
              required
              className={fieldClassName}
              placeholder="+260..."
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField icon={<Flame className="size-4" />} label="Incident type">
          <select
            name="incident_type"
            className={fieldClassName}
            defaultValue="Structure fire"
          >
            <option>Structure fire</option>
            <option>Electrical fire</option>
            <option>Vehicle fire</option>
            <option>Bush fire</option>
            <option>Industrial fire</option>
          </select>
          </FormField>
          <FormField icon={<FlameKindling className="size-4" />} label="Severity">
          <select
            name="severity"
            className={fieldClassName}
            defaultValue="high"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          </FormField>
        </div>

        <FormField icon={<LocateFixed className="size-4" />} label="Location">
          <input
            name="location"
            required
            className={fieldClassName}
            placeholder="Compound, landmark, road, or coordinates"
          />
        </FormField>

        <FormField icon={<FileText className="size-4" />} label="Description">
          <textarea
            name="description"
            required
            rows={4}
            className={`${fieldClassName} min-h-28 py-3`}
            placeholder="What is burning? Are people trapped? Any hazardous materials?"
          />
        </FormField>

        <div className="rounded border border-orange-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded bg-red-50 text-red-700">
                <BellRing className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">Central dispatch routing</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Reports enter the incident queue and notification table for responder review.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded bg-gradient-to-r from-red-700 via-orange-600 to-amber-500 px-5 text-sm font-semibold text-white shadow-lg shadow-red-900/25 hover:from-red-600 hover:to-amber-400"
            >
              <BellRing className="size-4" aria-hidden="true" />
              Send report
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

const fieldClassName =
  "mt-2 min-h-12 w-full rounded border border-orange-100 bg-white px-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100";

function FormField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      <span className="inline-flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded bg-red-50 text-red-700">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function HeroPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded border border-white/15 bg-white/10 px-3 text-sm font-semibold text-orange-50 backdrop-blur">
      {icon}
      {text}
    </span>
  );
}

function Metric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded border border-white/12 bg-white/10 p-4 text-white shadow-xl shadow-black/15 backdrop-blur">
      <div className="mb-3 grid size-9 place-items-center rounded bg-gradient-to-br from-red-600 to-amber-400 text-white">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-100/70">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-orange-50/70">{detail}</p>
    </div>
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
    <div className="rounded border border-orange-100 bg-white p-5 shadow-[0_20px_60px_rgba(127,29,29,.1)]">
      <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-950">
        <ChartNoAxesColumnIncreasing className="size-5 text-red-700" aria-hidden="true" />
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{caption}</p>
      <div className="mt-5 space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-950">{item.value}%</span>
            </div>
            <div className="h-2 rounded bg-orange-100">
              <div
                className="h-2 rounded bg-gradient-to-r from-red-700 via-orange-500 to-amber-300"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvaluationPanel() {
  return (
    <div className="rounded border border-orange-100 bg-gradient-to-br from-slate-950 via-red-950 to-orange-900 p-5 text-white shadow-[0_20px_60px_rgba(127,29,29,.16)]">
      <h3 className="inline-flex items-center gap-2 text-base font-semibold">
        <CircleGauge className="size-5 text-amber-300" aria-hidden="true" />
        System evaluation
      </h3>
      <p className="mt-2 text-sm leading-6 text-orange-50/78">
        Respondents rated the prototype strongly across usability, response time, accuracy, and reliability.
      </p>
      <div className="mt-5 space-y-3">
        {evaluationResults.map((item) => (
          <div key={item.indicator} className="rounded border border-white/10 bg-white/10 p-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{item.indicator}</span>
              <span className="text-sm font-semibold text-amber-200">{item.veryGoodPercent}% very good</span>
            </div>
            <div className="mt-3 h-2 rounded bg-white/15">
              <div
                className="h-2 rounded bg-gradient-to-r from-red-500 to-amber-300"
                style={{ width: `${item.veryGoodPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleIcon({ index }: { index: number }) {
  const icons = [
    <ShieldCheck key="auth" className="size-5" aria-hidden="true" />,
    <Siren key="incident" className="size-5" aria-hidden="true" />,
    <BellRing key="notification" className="size-5" aria-hidden="true" />,
    <Activity key="monitoring" className="size-5" aria-hidden="true" />,
    <ChartNoAxesColumnIncreasing key="reports" className="size-5" aria-hidden="true" />,
    <Database key="database" className="size-5" aria-hidden="true" />,
  ];

  return icons[index] ?? <Flame className="size-5" aria-hidden="true" />;
}

function PhotoCard({
  image,
  eyebrow,
  title,
  text,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <figure className="relative min-h-[320px] overflow-hidden rounded border border-white/10 bg-slate-950 shadow-2xl shadow-black/25">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-200">{eyebrow}</p>
        <h2 className="mt-2 max-w-xl text-2xl font-semibold leading-tight">{title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-orange-50/78">{text}</p>
      </figcaption>
    </figure>
  );
}

function IllustrationPanel() {
  return (
    <div className="overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(251,191,36,.2),transparent_24%),linear-gradient(135deg,#27100b,#7f1d1d_52%,#f97316)] p-5 text-white shadow-2xl shadow-black/25">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-100">Command workflow</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">From community alert to coordinated response</h2>
          <p className="mt-3 text-sm leading-6 text-orange-50/78">
            A cleaner visual path for the SDLC workflow in the report: capture, validate, notify,
            respond, update, and report.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: <UsersRound className="size-6" />, label: "Citizen", text: "Reports incident" },
            { icon: <RadioTower className="size-6" />, label: "System", text: "Alerts teams" },
            { icon: <Truck className="size-6" />, label: "Firefighter", text: "Responds fast" },
          ].map((item) => (
            <div key={item.label} className="rounded border border-white/15 bg-white/12 p-4 backdrop-blur">
              <div className="mb-4 grid size-11 place-items-center rounded bg-white text-red-700">{item.icon}</div>
              <h3 className="text-sm font-semibold">{item.label}</h3>
              <p className="mt-1 text-sm text-orange-50/75">{item.text}</p>
            </div>
          ))}
        </div>
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
