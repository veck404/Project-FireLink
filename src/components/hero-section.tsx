import type { ReactNode } from "react";
import { Activity, Clock3, FlameKindling, MapPin, RadioTower, ShieldCheck } from "lucide-react";
import { IncidentForm } from "@/components/incident-form";
import { heroImage } from "@/lib/visual-assets";

type HeroSectionProps = {
  reported: boolean;
  activeIncidentCount: number;
  criticalIncidentCount: number;
  averageResponseMinutes: number;
};

export function HeroSection({
  reported,
  activeIncidentCount,
  criticalIncidentCount,
  averageResponseMinutes,
}: HeroSectionProps) {
  return (
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
              {reported ? (
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
              value={activeIncidentCount.toString()}
              detail="Live queue"
            />
            <Metric
              icon={<FlameKindling className="size-5" />}
              label="Critical alerts"
              value={criticalIncidentCount.toString()}
              detail="Highest severity"
            />
            <Metric
              icon={<Clock3 className="size-5" />}
              label="Avg. response"
              value={`${averageResponseMinutes}m`}
              detail="Seeded evaluation"
            />
          </div>
        </div>

        <IncidentForm />
      </div>
    </section>
  );
}

function HeroPill({ icon, text }: { icon: ReactNode; text: string }) {
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
  icon: ReactNode;
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
