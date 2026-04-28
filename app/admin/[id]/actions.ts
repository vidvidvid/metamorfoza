"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "reviewed", "shortlisted", "rejected"]),
  adminNotes: z.string().max(5000),
});

export async function updateSubmissionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const parsed = updateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    adminNotes: String(formData.get("adminNotes") ?? ""),
  });
  if (!parsed.success) {
    throw new Error("Invalid input");
  }
  await db
    .update(schema.submissions)
    .set({
      status: parsed.data.status,
      adminNotes: parsed.data.adminNotes || null,
    })
    .where(eq(schema.submissions.id, parsed.data.id));
  revalidatePath(`/admin/${parsed.data.id}`);
  revalidatePath("/admin");
}
