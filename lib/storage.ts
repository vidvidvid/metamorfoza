import "server-only";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

function uploadDir(): string {
  return process.env.UPLOAD_DIR ?? "./data/uploads";
}

export async function ensureUploadDir(): Promise<string> {
  const dir = path.resolve(/*turbopackIgnore: true*/ uploadDir());
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export function storagePathFor(id: string): string {
  return path.resolve(/*turbopackIgnore: true*/ uploadDir(), `${id}.pdf`);
}

export async function writePdf(
  stream: ReadableStream<Uint8Array>,
  opts: { maxBytes: number },
): Promise<{ id: string; storagePath: string; size: number }> {
  const id = randomUUID();
  const dir = await ensureUploadDir();
  const storagePath = path.join(dir, `${id}.pdf`);

  const reader = stream.getReader();
  const handle = await fs.open(storagePath, "w");
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > opts.maxBytes) {
        throw new FileTooLargeError(opts.maxBytes);
      }
      await handle.write(value);
    }
  } catch (err) {
    await handle.close().catch(() => {});
    await fs.unlink(storagePath).catch(() => {});
    throw err;
  }
  await handle.close();
  return { id, storagePath, size };
}

export class FileTooLargeError extends Error {
  constructor(public readonly maxBytes: number) {
    super(`File exceeds max size of ${maxBytes} bytes`);
    this.name = "FileTooLargeError";
  }
}

export const MAX_PDF_BYTES = 100 * 1024 * 1024;
