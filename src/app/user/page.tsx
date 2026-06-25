import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UserDashboard } from "@/components/user-dashboard";
import { getIncidents } from "@/lib/supabase-rest";

type UserPageProps = {
  searchParams?: Promise<{
    reported?: string;
  }>;
};

export default async function UserPage({ searchParams }: UserPageProps) {
  const params = await searchParams;
  const incidents = await getIncidents();

  return (
    <main className="min-h-screen bg-[#fff8ef] text-slate-950">
      <SiteHeader />
      <UserDashboard reported={Boolean(params?.reported)} incidents={incidents} />
      <SiteFooter />
    </main>
  );
}
