import { BarChart3, Clock3, FlameKindling, Siren, UserRound, UsersRound } from "lucide-react";

type DashboardGatewaySectionProps = {
  activeIncidentCount: number;
  criticalIncidentCount: number;
  averageResponseMinutes: number;
};

export function DashboardGatewaySection({
  activeIncidentCount,
  criticalIncidentCount,
  averageResponseMinutes,
}: DashboardGatewaySectionProps) {
  return (
    <section id="dashboard" className="bg-[#f7efe3]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">Dashboards</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Separate views for citizens and response teams</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Citizens get a focused reporting dashboard. Administrators get analytics, incident triage,
            and instant response actions.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <DashboardCard
            href="/user"
            icon={<UserRound className="size-6" />}
            eyebrow="User dashboard"
            title="Report a fire incident"
            text="A focused client-facing workflow for submitting reports, checking reporting guidance, and seeing active response status."
            cta="Open user dashboard"
          />
          <DashboardCard
            href="/admin"
            icon={<BarChart3 className="size-6" />}
            eyebrow="Admin dashboard"
            title="Analyze and respond instantly"
            text="A command view for monitoring reports, reviewing response metrics, and updating incident status for response teams."
            cta="Open admin dashboard"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <MiniMetric icon={<UsersRound className="size-5" />} label="Active incidents" value={activeIncidentCount.toString()} />
          <MiniMetric icon={<FlameKindling className="size-5" />} label="Critical alerts" value={criticalIncidentCount.toString()} />
          <MiniMetric icon={<Clock3 className="size-5" />} label="Avg. response" value={`${averageResponseMinutes}m`} />
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
  href,
  icon,
  eyebrow,
  title,
  text,
  cta,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="group rounded border border-orange-100 bg-white p-5 shadow-[0_20px_60px_rgba(127,29,29,.1)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(127,29,29,.18)]"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="grid size-12 place-items-center rounded bg-gradient-to-br from-red-700 via-orange-600 to-amber-400 text-white shadow-lg shadow-red-900/20">
          {icon}
        </span>
        <span className="inline-flex items-center gap-2 rounded bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
          <Siren className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
      <span className="mt-5 inline-flex min-h-10 items-center rounded bg-slate-950 px-4 text-sm font-semibold text-white group-hover:bg-red-800">
        {cta}
      </span>
    </a>
  );
}

function MiniMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-3 grid size-10 place-items-center rounded bg-red-50 text-red-700">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
