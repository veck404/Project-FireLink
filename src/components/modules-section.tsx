import {
  Activity,
  BellRing,
  ChartNoAxesColumnIncreasing,
  Database,
  Flame,
  ShieldCheck,
  Siren,
  Truck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { actors, systemModules } from "@/lib/source-data";

export function ModulesSection() {
  return (
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
