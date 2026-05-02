import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { AdminShell } from "@/components/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { EditForm } from "./edit-form";

export const dynamic = "force-dynamic";

function formatDob(value: string): string {
  const [y, m, d] = value.split("-");
  return `${d}. ${m}. ${y}`;
}

function ageFromDob(value: string): number {
  const dob = new Date(value);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { id } = await params;

  const [submission] = await db
    .select()
    .from(schema.submissions)
    .where(eq(schema.submissions.id, id));

  if (!submission) notFound();

  const links = await db
    .select()
    .from(schema.submissionLinks)
    .where(eq(schema.submissionLinks.submissionId, id));

  const files = await db
    .select()
    .from(schema.submissionFiles)
    .where(eq(schema.submissionFiles.submissionId, id));

  return (
    <AdminShell>
      <div className="mb-6">
        <Link
          href="/admin"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          ← Nazaj
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {new Intl.DateTimeFormat("sl-SI", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(submission.createdAt)}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {submission.name}
              {submission.artistName && (
                <span className="ml-3 text-xl font-normal text-muted-foreground">
                  aka {submission.artistName}
                </span>
              )}
            </h1>
            <p className="text-muted-foreground">
              <a
                href={`mailto:${submission.email}`}
                className="hover:text-foreground"
              >
                {submission.email}
              </a>
              {submission.phone && (
                <>
                  <span className="mx-2">·</span>
                  <a
                    href={`tel:${submission.phone}`}
                    className="hover:text-foreground"
                  >
                    {submission.phone}
                  </a>
                </>
              )}
            </p>
            {submission.dateOfBirth && (
              <p className="mt-1 text-sm text-muted-foreground">
                Rojen/a: {formatDob(submission.dateOfBirth)} ·{" "}
                {ageFromDob(submission.dateOfBirth)} let
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Koncept
            </h2>
            <p className="whitespace-pre-wrap leading-relaxed">
              {submission.concept}
            </p>
          </div>

          {links.length > 0 && (
            <div>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Povezave
              </h2>
              <ul className="space-y-1">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {l.label || l.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Datoteke
            </h2>
            {files.length === 0 ? (
              <p className="text-muted-foreground">Ni datotek.</p>
            ) : (
              <ul className="space-y-2">
                {files.map((f) => (
                  <li key={f.id} className="flex items-center gap-3">
                    <a
                      href={`/api/files/${f.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Odpri {f.originalName}
                    </a>
                    <a
                      href={`/api/files/${f.id}?download=1`}
                      className="font-mono text-xs text-muted-foreground hover:text-foreground"
                      aria-label="Prenesi"
                    >
                      ↓ Prenesi
                    </a>
                    <span className="font-mono text-xs text-muted-foreground">
                      {(f.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside>
          <EditForm
            id={submission.id}
            status={submission.status}
            adminNotes={submission.adminNotes ?? ""}
          />
        </aside>
      </div>
    </AdminShell>
  );
}
