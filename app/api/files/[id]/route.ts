import { NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const isDownload =
    new URL(request.url).searchParams.get("download") === "1";
  const [file] = await db
    .select()
    .from(schema.submissionFiles)
    .where(eq(schema.submissionFiles.id, id))
    .limit(1);

  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await stat(file.storagePath);
  } catch {
    return NextResponse.json({ error: "File missing on disk" }, { status: 410 });
  }

  const nodeStream = createReadStream(file.storagePath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  const disposition = isDownload ? "attachment" : "inline";
  return new Response(webStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": file.size.toString(),
      "Content-Disposition": `${disposition}; filename="${encodeURIComponent(file.originalName)}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
