import Link from "next/link";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { AdminShell } from "@/components/admin-shell";
import { CardGrid } from "@/components/card-grid";
import { ShinyEntries } from "@/components/shiny-entries";
import {
  EditEditionDialog,
  NewEditionDialog,
} from "@/components/edition-dialogs";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ edicija?: string }>;
}) {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const params = await searchParams;
  const editions = await db
    .select()
    .from(schema.cardEditions)
    .orderBy(asc(schema.cardEditions.createdAt));

  const selected =
    editions.find((e) => e.id === params.edicija) ?? editions[0];

  const [marks, shiny] = selected
    ? await Promise.all([
        db
          .select()
          .from(schema.cardMarks)
          .where(eq(schema.cardMarks.editionId, selected.id)),
        db
          .select()
          .from(schema.shinyEntries)
          .where(eq(schema.shinyEntries.editionId, selected.id)),
      ])
    : [[], []];

  const markByNumber = Object.fromEntries(
    marks.map((m) => [m.cardNumber, m.mark]),
  );

  return (
    <AdminShell active="kartice">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-2xl font-semibold">Karte</h1>
          {editions.length > 1 && (
            <nav className="flex flex-wrap gap-1 text-sm">
              {editions.map((e) => (
                <Link
                  key={e.id}
                  href={`/admin/cards?edicija=${e.id}`}
                  className={
                    selected?.id === e.id
                      ? "rounded bg-primary/15 px-3 py-1 font-medium text-primary"
                      : "rounded px-3 py-1 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }
                >
                  {e.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <EditEditionDialog key={`edit-${selected.id}`} edition={selected} />
          )}
          <NewEditionDialog />
        </div>
      </div>

      {selected ? (
        <div className="space-y-6">
          <h2 className="text-lg font-medium">
            {selected.name}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              {selected.cardCount} kart
            </span>
          </h2>
          <CardGrid
            key={selected.id}
            editionId={selected.id}
            cardCount={selected.cardCount}
            marks={markByNumber}
          />
          <ShinyEntries
            key={`shiny-${selected.id}`}
            editionId={selected.id}
            entries={shiny.map((s) => s.cardNumber)}
          />
        </div>
      ) : (
        <p className="text-muted-foreground">
          Ni še nobene edicije — ustvari prvo z gumbom »Nova edicija« zgoraj.
        </p>
      )}
    </AdminShell>
  );
}
