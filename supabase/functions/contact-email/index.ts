import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "Kontaktformulär <info@contact.bgbygger.se>";
const CONTACT_TO = "f.bjorgaas@gmail.com";

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
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #000000;">Ny offertförfrågan</h1>
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
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    let body: ContactPayload;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Ogiltig förfrågan." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const service = (body.service ?? "").trim();
    const message = (body.message ?? "").trim();

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
    const dateTime = formatSwedishDateTime(new Date());
    const html = buildEmailHtml(name, email, phone, service, message, dateTime, submissionId);
    const subject = `"Ny offertförfrågan" från ${name}`;

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
