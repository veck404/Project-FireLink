import { DashboardGatewaySection } from "@/components/dashboard-gateway-section";
import { FindingsSection } from "@/components/findings-section";
import { HeroSection } from "@/components/hero-section";
import { ModulesSection } from "@/components/modules-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupabaseSection } from "@/components/supabase-section";
import { VisualStorySection } from "@/components/visual-story-section";
import { getIncidents } from "@/lib/supabase-rest";

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
  const averageResponse = getAverageResponseMinutes(incidents);

  return (
    <main className="min-h-screen bg-[#120907] text-slate-950">
      <SiteHeader />
      <HeroSection
        reported={Boolean(params?.reported)}
        activeIncidentCount={activeIncidents.length}
        criticalIncidentCount={criticalIncidents.length}
        averageResponseMinutes={averageResponse}
      />
      <DashboardGatewaySection
        activeIncidentCount={activeIncidents.length}
        criticalIncidentCount={criticalIncidents.length}
        averageResponseMinutes={averageResponse}
      />
      <VisualStorySection />
      <ModulesSection />
      <FindingsSection />
      <SupabaseSection />
      <SiteFooter />
    </main>
  );
}

function getAverageResponseMinutes(incidents: Awaited<ReturnType<typeof getIncidents>>) {
  const responseTimes = incidents
    .map((incident) => incident.response_minutes)
    .filter((value): value is number => typeof value === "number");

  if (!responseTimes.length) {
    return 0;
  }

  return Math.round(responseTimes.reduce((total, value) => total + value, 0) / responseTimes.length);
}
