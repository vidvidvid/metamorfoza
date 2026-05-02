import "server-only";
import { Resend } from "resend";

let cached: Resend | null = null;

function client(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendSubmissionConfirmation(args: {
  to: string;
  name: string;
}): Promise<void> {
  const c = client();
  if (!c) {
    console.warn("[email] RESEND_API_KEY not set, skipping confirmation");
    return;
  }
  const from =
    process.env.EMAIL_FROM ?? "Metamorfoza <hello@metamorfoza.art>";

  const safeName = escapeHtml(args.name);
  const subject = "hvala za prijavo!";

  const html = `<!doctype html>
<html lang="sl">
<body style="margin:0;padding:0;background:#0c0d18;color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0c0d18;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:40px 32px;color:#1a1a1a;font-size:17px;line-height:1.6;">
              <p style="margin:0 0 12px 0;">hejj, ${safeName} 👋</p>
              <p style="margin:0 0 12px 0;">hvala za prijavo!</p>
              <p style="margin:0 0 32px 0;">če boš izbran/a, te obvestimo v začetku junija 🌊</p>
              <p style="margin:0;color:#5c5c5c;font-size:14px;">metamorfoza</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `hejj, ${args.name} 👋

hvala za prijavo!

če boš izbran/a, te obvestimo v začetku junija 🌊

metamorfoza`;

  const { error } = await c.emails.send({
    from,
    to: args.to,
    subject,
    html,
    text,
  });
  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
