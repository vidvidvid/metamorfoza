import Link from "next/link";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";
import { AdminShell } from "@/components/admin-shell";
import { CardGrid } from "@/components/card-grid";
import { ShinyEntries } from "@/components/shiny-entries";
import { DeleteEditionButton } from "@/components/delete-edition-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEditionAction, updateEditionAction } from "./actions";

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
        <h1 className="text-2xl font-semibold">Kartice</h1>
        {editions.length > 0 && (
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

      {selected ? (
        <div className="space-y-6">
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

          <details className="rounded-lg border border-border/40 bg-card/40 p-4 backdrop-blur-sm">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground select-none">
              Uredi edicijo »{selected.name}«
            </summary>
            <form
              action={updateEditionAction}
              className="mt-4 flex flex-wrap items-end gap-3"
            >
              <input type="hidden" name="id" value={selected.id} />
              <div className="grid gap-1.5">
                <Label htmlFor="edit-name">Ime</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={selected.name}
                  required
                  maxLength={200}
                  className="w-48"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="edit-count">Št. kartic</Label>
                <Input
                  id="edit-count"
                  name="cardCount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={2000}
                  defaultValue={selected.cardCount}
                  required
                  className="w-28"
                />
              </div>
              <Button type="submit" variant="outline">
                Shrani
              </Button>
            </form>
            <div className="mt-4 border-t border-border/40 pt-4">
              <DeleteEditionButton
                editionId={selected.id}
                name={selected.name}
              />
            </div>
          </details>
        </div>
      ) : (
        <p className="mb-6 text-muted-foreground">
          Ni še nobene edicije — ustvari prvo spodaj.
        </p>
      )}

      <details
        className="mt-6 rounded-lg border border-border/40 bg-card/40 p-4 backdrop-blur-sm"
        open={editions.length === 0}
      >
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground select-none">
          ＋ Nova edicija
        </summary>
        <form
          action={createEditionAction}
          className="mt-4 flex flex-wrap items-end gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="new-name">Ime</Label>
            <Input
              id="new-name"
              name="name"
              placeholder="npr. Metamorfoza 2026"
              required
              maxLength={200}
              className="w-48"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="new-count">Št. kartic</Label>
            <Input
              id="new-count"
              name="cardCount"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              defaultValue={220}
              required
              className="w-28"
            />
          </div>
          <Button type="submit">Ustvari</Button>
        </form>
      </details>
    </AdminShell>
  );
}
