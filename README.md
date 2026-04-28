# metamorfoza

Open-call submission site for the Metamorfoza collective.
Fashion competition: *Globočine morja* — submissions close 2026-05-31.

## Stack

- Next.js 16 (App Router, Turbopack)
- PostgreSQL via Drizzle ORM
- shadcn/ui + Tailwind 4
- Iron-session cookies for admin auth
- Railway Volume for PDF storage

## Routes

- `/` — public open-call landing + submission form
- `/submit/success` — thank-you page
- `/admin/login` — shared-password login
- `/admin` — submissions list (filter by status)
- `/admin/[id]` — submission detail (download PDF, set status + notes)

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `SESSION_SECRET` | 32+ char secret for signing admin cookies. Generate: `openssl rand -hex 32` |
| `ADMIN_PASSWORD` | Shared password for `/admin/login` |
| `UPLOAD_DIR` | Where PDFs are written. Local: `./data/uploads`. Railway: `/data/uploads` (on the mounted volume) |

## Local development

```bash
# 1. install
npm install

# 2. configure
cp .env.example .env.local
# edit .env.local — point DATABASE_URL at a local Postgres

# 3. run migrations
npm run db:migrate

# 4. start dev server
npm run dev
```

### Drizzle scripts

- `npm run db:generate` — generate SQL from schema changes
- `npm run db:migrate` — apply pending migrations
- `npm run db:push` — (dev only) push schema directly without migration files
- `npm run db:studio` — open Drizzle Studio

## Deploy to Railway

### 1. Create the services

In a new Railway project:

1. **Add PostgreSQL** (New → Database → Postgres). Note the `DATABASE_URL`.
2. **Add this app** (New → GitHub Repo → select the metamorfoza repo).
3. **Attach a Volume** to the app service:
   - Name: `uploads`
   - Mount path: `/data/uploads`
   - Size: start small (e.g. 10 GB) — easy to grow later.

### 2. Set env vars on the app service

| Key | Value |
|---|---|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (reference variable) |
| `SESSION_SECRET` | output of `openssl rand -hex 32` |
| `ADMIN_PASSWORD` | any strong password |
| `UPLOAD_DIR` | `/data/uploads` |
| `NODE_ENV` | `production` |

### 3. Deploy

Railway reads `railway.json` and will:
- Build with `npm run build`
- Start with `npm run start:prod` (which runs `drizzle-kit migrate` then `next start`)

Migrations run on every boot. They're idempotent and transactional, so existing data is safe.

### 4. Domain

In the app service → Networking → Generate Domain (or connect a custom one later).

## Data model

Three tables, cascading on delete:

- `submissions` — name, email, phone, concept, status, admin_notes
- `submission_links` — many-to-one with submissions (portfolio URLs)
- `submission_files` — many-to-one (expects 1 PDF per submission, but schema allows more)

Files are streamed to `${UPLOAD_DIR}/{uuid}.pdf`. Metadata rows point to that path.
PDF download is gated behind the admin cookie (`/api/files/[id]` streams from disk).

## TODO (not yet built)

- Resend email confirmation to applicant on submit
- Per-admin auth (currently one shared password)
- Metamorfoza metallic wordmark asset (currently CSS-gradient text)
- Figma poster assets from dj final form

## Credits

Metamorfoza collective · Ljubljana
