import { requirements } from "@/lib/source-data";
import { nightResponseImage } from "@/lib/visual-assets";

export function SupabaseSection() {
  return (
    <section
      id="schema"
      className="border-t border-white/10 bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.96), rgba(71,16,8,.86)), url(${nightResponseImage})`,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-red-300">Supabase ready</p>
          <h2 className="mt-1 text-2xl font-semibold">Database-backed when credentials are added</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The app reads from and writes to Supabase through the server-side REST adapter when
            environment variables are present. Without credentials, it uses source-derived seed
            incidents so the interface remains usable.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {requirements.map((item) => (
            <div
              key={item.title}
              className="rounded border border-white/10 bg-white/10 p-4 shadow-xl shadow-black/10 backdrop-blur"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
