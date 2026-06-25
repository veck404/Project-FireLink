import { AdminDashboard } from "@/components/admin-dashboard";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getIncidents } from "@/lib/supabase-rest";

export default async function AdminPage() {
  const incidents = await getIncidents();

  return (
    <main className="min-h-screen bg-[#fff8ef] text-slate-950">
      <SiteHeader />
      <AdminDashboard incidents={incidents} />
      <SiteFooter />
    </main>
  );
}
