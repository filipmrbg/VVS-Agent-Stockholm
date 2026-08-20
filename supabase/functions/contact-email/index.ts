import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_TO = "info@vvsagent.se";

function normalizeFrom(raw: string | undefined): string {
  const fallback = "Kontaktformulär <info@contact.bgbygger.se>";
  const value = (raw ?? "").trim();
  if (!value) return fallback;
  const match = value.match(/^\s*<([^>]+)>\s*$/);
  if (match) return `Kontaktformulär <${match[1]}>`;
  return value;
}
const RESEND_FROM = normalizeFrom(Deno.env.get("RESEND_FROM"));

const SERVICE_LABELS: Record<string, string> = {
  varmepumpar: "Värmepumpar & Värmesystem",
  "badrum-kok": "Badrum & Kök",
  "reparation-underhall": "Reparation & Underhåll",
  "radgivning-fastighetsservice": "Rådgivning & Fastighetsservice",
  annat: "Annat VVS-ärende",
};

const SWEDISH_MONTHS = [
  "januari", "februari", "mars", "april", "maj", " juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

function formatSwedishDateTime(date: Date): string {
  const day = date.getDate();
  const month = SWEDISH_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} kl. ${hours}:${minutes}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(
  name: string,
  email: string,
  phone: string,
  service: string,
  message: string,
  dateTime: string,
  submissionId: string,
): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message);
  const safeDateTime = escapeHtml(dateTime);
  const safeId = escapeHtml(submissionId);

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny kontaktförfrågan</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); overflow: hidden;">
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #000000;">Ny kontaktförfrågan</h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #6b7280;">${safeDateTime}</p>

              <table role="presentation" style="width: 100%; background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 24px;">

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 4px;">Namn:</span>
                    <span style="color: #1f2937;">${safeName}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 4px;">E-post:</span>
                    <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 4px;">Telefon:</span>
                    <a href="tel:${safePhone}" style="color: #2563eb; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 4px;">Tjänst:</span>
                    <span style="color: #1f2937;">${safeService}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0;">
                    <span style="font-weight: 600; color: #374151; display: block; margin-bottom: 4px;">Meddelande:</span>
                    <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.5;">${safeMessage}</p>
                  </td>
                </tr>

              </table>

              <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Submission ID:</strong> ${safeId}
                </p>
              </div>

              <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
                Detta meddelande skickades automatiskt från kontaktformuläret på din webbplats.
                Svara direkt på detta e-postmeddelande för att kontakta kunden.
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  company?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Input bounds ─────────────────────────────────────────────────
   Nothing from the browser is trusted for size or for content, so
   the body is capped and every field is clamped and stripped of
   control characters before it reaches the subject line or body. */
const MAX_BODY_BYTES = 20_000;
const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  service: 80,
  message: 5000,
} as const;

/** Trim, drop control characters (incl. CR/LF) and clamp to `max`. */
function clean(value: unknown, max: number, keepNewlines = false): string {
  if (typeof value !== "string") return "";
  const stripped = keepNewlines
    ? value.replace(/\r\n?/g, "\n").replace(/[^\P{C}\n]/gu, "")
    : value.replace(/\p{C}/gu, " ").replace(/\s{2,}/g, " ");
  return stripped.trim().slice(0, max);
}

/* ── Abuse protection ─────────────────────────────────────────────
   The endpoint is intentionally public (visitors are not signed in),
   so volume is bounded per client IP and a hidden honeypot field
   catches naive bots.

   The per-IP window lives in the database (see the
   `claim_contact_send` migration) so that it survives isolate
   recycling and is shared across concurrently running instances. The
   in-memory counters below are only a fallback for when that call
   cannot be made, and the global ceiling is a catastrophe backstop
   set far above plausible legitimate volume so that it cannot be
   filled by an attacker to lock real customers out. */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_IP_PER_WINDOW = 5;
const MAX_GLOBAL_PER_WINDOW = 500;
const MAX_TRACKED_IPS = 5000;

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const ipHits = new Map<string, number[]>();
let globalHits: number[] = [];

function withinWindow(times: number[], now: number): number[] {
  return times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const first = forwarded.split(",")[0]?.trim();
  return first || req.headers.get("cf-connecting-ip") || "unknown";
}

/** SHA-256 of the caller IP, so no raw visitor address is stored. */
async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`contact-form:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Atomically records this send against the caller's durable window.
 * Returns true when the caller may send, false when the hourly
 * allowance is spent, and null when the check could not be performed.
 */
async function claimDurableSend(ip: string): Promise<boolean | null> {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return null;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/claim_contact_send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "apikey": SERVICE_ROLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_ip_hash: await hashIp(ip),
        p_max_per_window: MAX_PER_IP_PER_WINDOW,
      }),
    });

    if (!response.ok) {
      console.error("rate limit rpc failed:", response.status);
      return null;
    }

    const allowed = await response.json();
    return typeof allowed === "boolean" ? allowed : null;
  } catch (err) {
    console.error("rate limit rpc error:", err);
    return null;
  }
}

/** Global backstop plus the in-memory per-IP fallback. */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  globalHits = withinWindow(globalHits, now);
  if (globalHits.length >= MAX_GLOBAL_PER_WINDOW) return true;
  return withinWindow(ipHits.get(ip) ?? [], now).length >= MAX_PER_IP_PER_WINDOW;
}

/** Records one actually-sent email against the IP and global windows. */
function recordSend(ip: string): void {
  const now = Date.now();

  if (ipHits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of ipHits) {
      if (withinWindow(times, now).length === 0) ipHits.delete(key);
    }
    if (ipHits.size > MAX_TRACKED_IPS) ipHits.clear();
  }

  const hits = withinWindow(ipHits.get(ip) ?? [], now);
  hits.push(now);
  ipHits.set(ip, hits);
  globalHits.push(now);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "E-posttjänsten är inte konfigurerad." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const ip = clientIp(req);
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "För många förfrågningar. Försök igen senare eller ring oss direkt." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "3600" },
        },
      );
    }

    let raw: string;
    try {
      raw = await req.text();
    } catch {
      return new Response(
        JSON.stringify({ error: "Ogiltig förfrågan." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return new Response(
        JSON.stringify({ error: "Meddelandet är för långt." }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let body: ContactPayload;
    try {
      body = JSON.parse(raw);
      if (typeof body !== "object" || body === null || Array.isArray(body)) {
        throw new Error("not an object");
      }
    } catch {
      return new Response(
        JSON.stringify({ error: "Ogiltig förfrågan." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Honeypot: the real forms keep this hidden field empty. Accept and drop.
    if (clean(body.company, 200)) {
      return new Response(
        JSON.stringify({ success: true, submissionId: crypto.randomUUID() }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const name = clean(body.name, FIELD_LIMITS.name);
    const email = clean(body.email, FIELD_LIMITS.email);
    const phone = clean(body.phone, FIELD_LIMITS.phone);
    const serviceKey = clean(body.service, FIELD_LIMITS.service);
    const service = SERVICE_LABELS[serviceKey] ?? SERVICE_LABELS.annat;
    const message = clean(body.message, FIELD_LIMITS.message, true);

    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "Alla fält är obligatoriska." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: "Ogiltig e-postadress." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const submissionId = crypto.randomUUID();

    // Durable per-sender claim, recorded only for submissions that pass
    // validation so a visitor correcting a typo is never penalised.
    const durableAllowed = await claimDurableSend(ip);
    if (durableAllowed === false) {
      return new Response(
        JSON.stringify({ error: "För många förfrågningar. Försök igen senare eller ring oss direkt." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "3600" },
        },
      );
    }

    recordSend(ip);
    const dateTime = formatSwedishDateTime(new Date());
    const html = buildEmailHtml(name, email, phone, service, message, dateTime, submissionId);
    const subject = `Ny kontaktförfrågan från ${name}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      let detail = "";
      try {
        const errBody = await resendResponse.json();
        detail = errBody?.message ?? JSON.stringify(errBody);
      } catch {
        detail = await resendResponse.text().catch(() => "");
      }
      console.error("Resend API error:", resendResponse.status, detail);
      return new Response(
        JSON.stringify({ error: "Kunde inte skicka e-post just nu. Försök igen senare." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, submissionId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("contact-email error:", err);
    return new Response(
      JSON.stringify({ error: "Ett oväntat fel uppstod. Försök igen senare." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
