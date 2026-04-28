import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { AdminShell } from "@/components/admin-shell";
import { InlineStatusSelect } from "@/components/inline-status-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<schema.Submission["status"], string> = {
  pending: "Nova",
  reviewed: "Pregledana",
  shortlisted: "Izbrana",
  rejected: "Zavrnjena",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const params = await searchParams;
  const statusFilter = params.status as schema.Submission["status"] | undefined;
  const isValidStatus =
    statusFilter && statusFilter in STATUS_LABEL ? statusFilter : undefined;

  const rows = await db
    .select({
      id: schema.submissions.id,
      createdAt: schema.submissions.createdAt,
      name: schema.submissions.name,
      email: schema.submissions.email,
      status: schema.submissions.status,
      fileId: sql<string | null>`(
        SELECT id FROM ${schema.submissionFiles}
        WHERE submission_id = ${schema.submissions.id}
        ORDER BY created_at ASC
        LIMIT 1
      )`,
    })
    .from(schema.submissions)
    .where(
      isValidStatus ? eq(schema.submissions.status, isValidStatus) : undefined,
    )
    .orderBy(desc(schema.submissions.createdAt));

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">
          Prijave <span className="text-muted-foreground">({rows.length})</span>
        </h1>
        <nav className="flex flex-wrap gap-1 text-sm">
          <StatusLink current={isValidStatus} value={undefined} label="Vse" />
          {(Object.keys(STATUS_LABEL) as (keyof typeof STATUS_LABEL)[]).map(
            (s) => (
              <StatusLink
                key={s}
                current={isValidStatus}
                value={s}
                label={STATUS_LABEL[s]}
              />
            ),
          )}
        </nav>
      </div>

      <div className="overflow-hidden rounded-lg border border-border/40 bg-card/40 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Ime</TableHead>
              <TableHead>E-pošta</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  Ni prijav.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">
                    {new Intl.DateTimeFormat("sl-SI", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(r.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/${r.id}`}
                      className="font-medium hover:text-primary hover:underline"
                    >
                      {r.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.email}
                  </TableCell>
                  <TableCell>
                    {r.fileId ? (
                      <div className="flex items-center gap-1">
                        <a
                          href={`/api/files/${r.fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-border/60 px-2 py-1 text-xs font-medium hover:bg-muted/50"
                        >
                          Odpri
                        </a>
                        <a
                          href={`/api/files/${r.fileId}?download=1`}
                          className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          aria-label="Prenesi"
                        >
                          ↓
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <InlineStatusSelect id={r.id} status={r.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}

function StatusLink({
  current,
  value,
  label,
}: {
  current: schema.Submission["status"] | undefined;
  value: schema.Submission["status"] | undefined;
  label: string;
}) {
  const href = value ? `/admin?status=${value}` : "/admin";
  const active = current === value;
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded bg-primary/15 px-3 py-1 font-medium text-primary"
          : "rounded px-3 py-1 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      }
    >
      {label}
    </Link>
  );
}
