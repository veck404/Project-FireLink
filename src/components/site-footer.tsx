import Link from "next/link";
import { Flame, Mail, MapPin, Phone, RadioTower, ShieldCheck } from "lucide-react";

const footerLinks = [
  { label: "User Dashboard", href: "/user" },
  { label: "Admin Dashboard", href: "/admin" },
  { label: "Findings", href: "/#findings" },
  { label: "Supabase", href: "/#schema" },
];

const supportLinks = [
  "Incident reporting",
  "Responder alerts",
  "Status tracking",
  "Operational reports",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-orange-950/20 bg-[#120907] text-orange-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/#top" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded bg-gradient-to-br from-red-600 via-orange-500 to-amber-300 text-white shadow-lg shadow-red-950/40">
                <Flame className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wide text-amber-200">
                  FireLink Zambia
                </span>
                <span className="block text-xs text-orange-100/65">Emergency reporting command</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-orange-50/70">
              A centralized digital platform for faster fire incident reporting, responder
              coordination, and management visibility.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <FooterBadge icon={<RadioTower className="size-4" />} text="Real-time alerts" />
              <FooterBadge icon={<ShieldCheck className="size-4" />} text="Secure workflows" />
            </div>
          </div>

          <FooterColumn title="Navigate">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-orange-50/70 hover:text-amber-200">
                {link.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Platform">
            {supportLinks.map((item) => (
              <span key={item} className="text-sm text-orange-50/70">
                {item}
              </span>
            ))}
          </FooterColumn>

          <FooterColumn title="Operations">
            <FooterContact icon={<MapPin className="size-4" />} text="Lusaka and Siavonga, Zambia" />
            <FooterContact icon={<Phone className="size-4" />} text="Emergency response desk" />
            <FooterContact icon={<Mail className="size-4" />} text="firelink@response.local" />
          </FooterColumn>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-orange-50/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FireLink Zambia. All rights reserved.</p>
          <p>Built for ICT-enabled fire disaster reporting and management.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-200">{title}</h2>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded border border-white/10 bg-white/5 px-3 text-xs font-semibold text-orange-50/80">
      {icon}
      {text}
    </span>
  );
}

function FooterContact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-orange-50/70">
      <span className="text-amber-300">{icon}</span>
      {text}
    </span>
  );
}
