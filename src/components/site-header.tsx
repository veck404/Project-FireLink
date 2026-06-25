import Link from "next/link";
import { Flame, Siren } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#120907]/90 text-white shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#top" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded bg-gradient-to-br from-red-600 via-orange-500 to-amber-300 text-white shadow-lg shadow-red-950/40">
            <Flame className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-wide text-amber-200">
              FireLink Zambia
            </span>
            <span className="block text-xs text-orange-100/70">Emergency reporting command</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-orange-50/75 md:flex">
          <Link className="hover:text-amber-200" href="/user">
            User Dashboard
          </Link>
          <Link className="hover:text-amber-200" href="/admin">
            Admin Dashboard
          </Link>
          <Link className="hover:text-amber-200" href="/#findings">
            Findings
          </Link>
          <Link className="hover:text-amber-200" href="/#schema">
            Supabase
          </Link>
        </nav>
        <Link
          href="/user#report"
          className="inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-gradient-to-r from-red-600 to-orange-500 px-3 text-sm font-semibold text-white shadow-lg shadow-red-950/35 hover:from-red-500 hover:to-amber-500 sm:px-4"
        >
          <Siren className="size-4" aria-hidden="true" />
          <span className="sm:hidden">Report</span>
          <span className="hidden sm:inline">Report fire</span>
        </Link>
      </div>
    </header>
  );
}
