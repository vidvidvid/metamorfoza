import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { submissionSchema } from "@/lib/validation";
import { FileTooLargeError, MAX_PDF_BYTES, writePdf } from "@/lib/storage";
import { sendSubmissionConfirmation } from "@/lib/email";
import {
  APPLICATIONS_CLOSED,
  APPLICATIONS_CLOSED_MESSAGE,
} from "@/lib/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (APPLICATIONS_CLOSED) {
    return NextResponse.json(
      { error: APPLICATIONS_CLOSED_MESSAGE },
      { status: 403 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Neveljavna oblika podatkov" },
      { status: 400 },
    );
  }

  const rawLinks = formData.getAll("links").map((v) => {
    try {
      return JSON.parse(String(v));
    } catch {
      return null;
    }
  });

  const parsed = submissionSchema.safeParse({
    name: formData.get("name"),
    artistName: formData.get("artistName") ?? "",
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    dateOfBirth: formData.get("dateOfBirth"),
    concept: formData.get("concept"),
    links: rawLinks.filter(Boolean),
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Neveljavni podatki",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const file = formData.get("pdf");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Datoteka PDF je obvezna" },
      { status: 400 },
    );
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Datoteka mora biti PDF" },
      { status: 400 },
    );
  }
  if (file.size > MAX_PDF_BYTES) {
    return NextResponse.json(
      { error: "Datoteka presega 100 MB" },
      { status: 413 },
    );
  }

  let written: Awaited<ReturnType<typeof writePdf>>;
  try {
    written = await writePdf(file.stream(), { maxBytes: MAX_PDF_BYTES });
  } catch (err) {
    if (err instanceof FileTooLargeError) {
      return NextResponse.json(
        { error: "Datoteka presega 100 MB" },
        { status: 413 },
      );
    }
    console.error("PDF write failed", err);
    return NextResponse.json(
      { error: "Napaka pri shranjevanju datoteke" },
      { status: 500 },
    );
  }

  try {
    const [submission] = await db
      .insert(schema.submissions)
      .values({
        name: parsed.data.name,
        artistName: parsed.data.artistName || null,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        dateOfBirth: parsed.data.dateOfBirth,
        concept: parsed.data.concept,
      })
      .returning({ id: schema.submissions.id });

    if (parsed.data.links.length > 0) {
      await db.insert(schema.submissionLinks).values(
        parsed.data.links.map((l) => ({
          submissionId: submission.id,
          url: l.url,
          label: l.label ? l.label : null,
        })),
      );
    }

    await db.insert(schema.submissionFiles).values({
      submissionId: submission.id,
      originalName: file.name.slice(0, 500),
      size: written.size,
      storagePath: written.storagePath,
    });

    try {
      await sendSubmissionConfirmation({
        to: parsed.data.email,
        name: parsed.data.artistName || parsed.data.name,
      });
    } catch (emailErr) {
      console.error("[submit] confirmation email failed", emailErr);
    }

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error("DB insert failed", err);
    return NextResponse.json(
      { error: "Napaka pri shranjevanju v bazo" },
      { status: 500 },
    );
  }
}
