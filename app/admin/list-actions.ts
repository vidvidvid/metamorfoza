"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const updateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "reviewed", "shortlisted", "rejected"]),
});

export async function updateStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = updateStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await db
    .update(schema.submissions)
    .set({ status: parsed.data.status })
    .where(eq(schema.submissions.id, parsed.data.id));
  revalidatePath("/admin");
  revalidatePath(`/admin/${parsed.data.id}`);
}
