"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const editionFieldsSchema = z.object({
  name: z.string().trim().min(1).max(200),
  cardCount: z.coerce.number().int().min(1).max(2000),
});

export async function createEditionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = editionFieldsSchema.safeParse({
    name: formData.get("name"),
    cardCount: formData.get("cardCount"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await db.insert(schema.cardEditions).values(parsed.data);
  revalidatePath("/admin/cards");
}

const updateEditionSchema = editionFieldsSchema.extend({
  id: z.string().uuid(),
});

export async function updateEditionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = updateEditionSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    cardCount: formData.get("cardCount"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const { id, ...fields } = parsed.data;
  await db
    .update(schema.cardEditions)
    .set(fields)
    .where(eq(schema.cardEditions.id, id));
  revalidatePath("/admin/cards");
}

export async function deleteEditionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = z.string().uuid().safeParse(formData.get("id"));
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await db
    .delete(schema.cardEditions)
    .where(eq(schema.cardEditions.id, parsed.data));
  revalidatePath("/admin/cards");
}

const shinyEntrySchema = z.object({
  editionId: z.string().uuid(),
  cardNumber: z.coerce.number().int().min(1).max(9999),
});

export async function addShinyEntryAction(
  formData: FormData,
): Promise<{ duplicate: boolean }> {
  await requireAdmin();
  const parsed = shinyEntrySchema.safeParse({
    editionId: formData.get("editionId"),
    cardNumber: formData.get("cardNumber"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const inserted = await db
    .insert(schema.shinyEntries)
    .values(parsed.data)
    .onConflictDoNothing()
    .returning({ id: schema.shinyEntries.id });
  revalidatePath("/admin/cards");
  return { duplicate: inserted.length === 0 };
}

export async function removeShinyEntryAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = shinyEntrySchema.safeParse({
    editionId: formData.get("editionId"),
    cardNumber: formData.get("cardNumber"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await db
    .delete(schema.shinyEntries)
    .where(
      and(
        eq(schema.shinyEntries.editionId, parsed.data.editionId),
        eq(schema.shinyEntries.cardNumber, parsed.data.cardNumber),
      ),
    );
  revalidatePath("/admin/cards");
}

const setCardMarkSchema = z.object({
  editionId: z.string().uuid(),
  cardNumber: z.coerce.number().int().min(1),
  mark: z.enum(["entry", "shiny", "none"]),
});

export async function setCardMarkAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = setCardMarkSchema.safeParse({
    editionId: formData.get("editionId"),
    cardNumber: formData.get("cardNumber"),
    mark: formData.get("mark"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  const { editionId, cardNumber, mark } = parsed.data;

  const edition = await db.query.cardEditions.findFirst({
    where: eq(schema.cardEditions.id, editionId),
  });
  if (!edition || cardNumber > edition.cardCount) {
    throw new Error("Invalid card");
  }

  if (mark === "none") {
    await db
      .delete(schema.cardMarks)
      .where(
        and(
          eq(schema.cardMarks.editionId, editionId),
          eq(schema.cardMarks.cardNumber, cardNumber),
        ),
      );
  } else {
    await db
      .insert(schema.cardMarks)
      .values({ editionId, cardNumber, mark })
      .onConflictDoUpdate({
        target: [schema.cardMarks.editionId, schema.cardMarks.cardNumber],
        set: { mark, markedAt: sql`now()` },
      });
  }
  revalidatePath("/admin/cards");
}
