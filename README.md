# FireLink Zambia

FireLink Zambia is a Next.js, TypeScript, Tailwind, and Supabase-ready fire disaster reporting system. It is built from the provided report and presentation on ICT-enabled fire disaster reporting and management.

## Core Scope

- Citizen incident reporting form
- Firefighter incident queue and status visibility
- Administrator monitoring dashboard and report-generation foundation
- Source-derived analytics for reporting methods, challenges, and evaluation results
- Supabase schema for profiles, incidents, notifications, and generated reports
- Seeded fallback data when Supabase credentials are not configured

## Source Material Applied

The implementation follows these requirements from the report and deck:

- Functional requirements: registration, authentication, incident reporting, real-time notifications, tracking, status updates, reports, user management, and database management.
- Non-functional requirements: security, reliability, scalability, user friendliness, accessibility, fast response time, and data integrity.
- System actors: citizen, firefighter, and administrator.
- Architecture: presentation layer, application layer, and database layer.
- Findings: existing reporting methods, major challenges, and prototype evaluation results.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL printed by Next.js.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The app uses the server-only service role key for server-side incident reads and inserts. Without these values, the interface uses seeded data derived from the research project so the app remains usable for review.
