/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { RadioTower, Truck, UsersRound } from "lucide-react";
import { responderImage } from "@/lib/visual-assets";

export function VisualStorySection() {
  return (
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
  );
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
  const steps: Array<{ icon: ReactNode; label: string; text: string }> = [
    { icon: <UsersRound className="size-6" />, label: "Citizen", text: "Reports incident" },
    { icon: <RadioTower className="size-6" />, label: "System", text: "Alerts teams" },
    { icon: <Truck className="size-6" />, label: "Firefighter", text: "Responds fast" },
  ];

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
          {steps.map((item) => (
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
