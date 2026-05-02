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
  const subject = "Prejeli smo tvojo prijavo · Metamorfoza";

  const html = `<!doctype html>
<html lang="sl">
<body style="margin:0;padding:0;background:#0c0d18;color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0c0d18;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:40px 32px 8px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#5c5c5c;">metamorfoza</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 32px 32px;color:#1a1a1a;font-size:16px;line-height:1.6;">
              <p>Pozdravljen/a ${safeName},</p>
              <p>Prejeli smo tvojo prijavo za odprti razpis <strong>Globočine morja</strong>.</p>
              <p>Rok prijav je <strong>31. 5. 2026</strong>. Po koncu se ti oglasimo na ta naslov z naslednjimi koraki.</p>
              <p>Hvala, da soustvarjaš ljubljansko podzemlje 🌊</p>
              <p style="margin-top:32px;color:#5c5c5c;font-size:14px;">— metamorfoza · Ljubljana</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Pozdravljen/a ${args.name},

Prejeli smo tvojo prijavo za odprti razpis Globočine morja.

Rok prijav je 31. 5. 2026. Po koncu se ti oglasimo na ta naslov z naslednjimi koraki.

Hvala, da soustvarjaš ljubljansko podzemlje.

— metamorfoza · Ljubljana`;

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
