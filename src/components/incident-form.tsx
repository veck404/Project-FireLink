import type { ReactNode } from "react";
import {
  BellRing,
  FileText,
  Flame,
  FlameKindling,
  LocateFixed,
  Phone,
  Siren,
  UserRound,
} from "lucide-react";
import { submitIncident } from "@/app/actions";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded border border-orange-100 bg-white px-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100";

export function IncidentForm() {
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
            <input name="reporter_name" required className={fieldClassName} placeholder="Full name" />
          </FormField>
          <FormField icon={<Phone className="size-4" />} label="Phone or email">
            <input name="reporter_contact" required className={fieldClassName} placeholder="+260..." />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField icon={<Flame className="size-4" />} label="Incident type">
            <select name="incident_type" className={fieldClassName} defaultValue="Structure fire">
              <option>Structure fire</option>
              <option>Electrical fire</option>
              <option>Vehicle fire</option>
              <option>Bush fire</option>
              <option>Industrial fire</option>
            </select>
          </FormField>
          <FormField icon={<FlameKindling className="size-4" />} label="Severity">
            <select name="severity" className={fieldClassName} defaultValue="high">
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

function FormField({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
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
