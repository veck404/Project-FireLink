import { ChartNoAxesColumnIncreasing, CircleGauge } from "lucide-react";
import { challenges, evaluationResults, reportingMethods } from "@/lib/source-data";

export function FindingsSection() {
  return (
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
