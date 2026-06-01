// Build trigger: env vars set 2026-06-01
/**
 * POST /api/journey-submit
 * Cloudflare Pages Function — receives Journey-OS payloads from the prototype,
 * writes to Supabase journey_submissions, and emails the user (+ admin BCC)
 * a confirmation via Resend.
 *
 * Env vars required (set in Cloudflare Pages → Variables):
 *   SUPABASE_URL                   plaintext
 *   SUPABASE_SERVICE_ROLE_KEY      secret
 *   RESEND_API_KEY                 secret
 *   JOURNEY_FROM_EMAIL             plaintext  e.g. "Journey-OS <noreply@melioristgroup.com>"
 *   JOURNEY_ADMIN_EMAIL            plaintext  BCC for every submission
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function esc(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function onRequestPost({ request, env }) {
  // Defensive: required env
  const need = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY",
                "JOURNEY_FROM_EMAIL", "JOURNEY_ADMIN_EMAIL"];
  const missing = need.filter((k) => !env[k]);
  if (missing.length) {
    return json({ error: "Server not configured", missing }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const email = (payload.email || payload.deliveryEmail || "").trim();
  const businessName = (payload.business_name || payload.businessName || "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "Valid email required" }, 400);
  }
  if (!businessName) {
    return json({ error: "Business name required" }, 400);
  }

  // Light spam triage: hashed IP + UA, no PII stored raw
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ua = request.headers.get("User-Agent") || "";
  const ipHash = ip ? await sha256Hex(ip + "::journey-os") : null;

  // Normalize column shape — accept both prototype (snake_case top-level) and
  // raw intake (camelCase nested) without losing the original.
  const intake = payload.intake || payload;
  const row = {
    email,
    business_name: businessName,
    website: payload.website ?? intake.website ?? null,
    linkedin: payload.linkedin ?? intake.linkedin ?? null,
    offer: payload.offer ?? intake.offer ?? null,
    ideal_client: payload.ideal_client ?? intake.idealClient ?? null,
    client_persona: payload.client_persona ?? intake.clientPersona ?? null,
    client_outcome: payload.client_outcome ?? intake.clientOutcome ?? null,
    output_language: payload.output_language ?? intake.outputLanguage ?? null,
    page_style: payload.page_style ?? intake.pageStyle ?? null,
    graphic_vibe: payload.graphic_vibe ?? intake.graphicVibe ?? null,
    primary_color: payload.primary_color ?? intake.primaryColor ?? null,
    accent_color: payload.accent_color ?? intake.accentColor ?? null,
    intake: intake,
    generated_stages: payload.generated_stages ?? payload.generatedStages ?? null,
    generated_assets: payload.generated_assets ?? payload.generatedAssets ?? null,
    status: "submitted",
    source: payload.source || "prototype-web",
    client_ip_hash: ipHash,
    user_agent: ua.slice(0, 500)
  };

  // Insert into Supabase
  const sbRes = await fetch(`${env.SUPABASE_URL}/rest/v1/journey_submissions`, {
    method: "POST",
    headers: {
      "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify(row)
  });

  if (!sbRes.ok) {
    const errText = await sbRes.text().catch(() => "");
    console.error("Supabase insert failed:", sbRes.status, errText);
    return json({ error: "Could not save submission" }, 500);
  }
  const saved = await sbRes.json();
  const savedId = Array.isArray(saved) && saved.length ? saved[0].id : null;

  // Send confirmation email (non-blocking failure — submission already persisted)
  let emailStatus = "skipped";
  try {
    const html = `
      <h1 style="font-family:Inter,sans-serif;color:#123d35">Your Journey-OS journey is saved</h1>
      <p style="font-family:Inter,sans-serif;color:#17211e;font-size:15px;line-height:1.6">
        Hi — we captured your Journey-OS submission for <strong>${esc(businessName)}</strong>.
      </p>
      <p style="font-family:Inter,sans-serif;color:#17211e;font-size:15px;line-height:1.6">
        Your generated assets — infographic, client journey page, LinkedIn posts, article,
        delivery email, and AI remix prompt — are ready in the prototype. You can revisit
        them anytime from your saved JSON file (attached) by reopening the prototype.
      </p>
      <p style="font-family:Inter,sans-serif;color:#5e6964;font-size:13px;line-height:1.5">
        Submission ID: <code>${esc(savedId || "—")}</code><br>
        Style: ${esc(row.page_style || "—")} · Language: ${esc(row.output_language || "—")} · Vibe: ${esc(row.graphic_vibe || "—")}
      </p>
      <hr style="border:0;border-top:1px solid #dce4dc;margin:20px 0">
      <p style="font-family:Inter,sans-serif;color:#5e6964;font-size:12px">
        Copyright 2026 · Cracking the Code to Success and Profits ·
        <a href="https://crackingthecodetosuccessprofits.com" style="color:#123d35">ctcsp.com</a>
      </p>
    `;

    const attachmentB64 = btoa(unescape(encodeURIComponent(
      JSON.stringify({ id: savedId, ...row }, null, 2)
    )));

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.JOURNEY_FROM_EMAIL,
        to: [email],
        bcc: [env.JOURNEY_ADMIN_EMAIL],
        subject: `Your Journey-OS assets for ${businessName}`,
        html,
        attachments: [{
          filename: `journey-os-${(businessName || "submission").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`,
          content: attachmentB64
        }]
      })
    });
    emailStatus = resendRes.ok ? "sent" : `failed:${resendRes.status}`;
    if (!resendRes.ok) {
      console.error("Resend failed:", resendRes.status, await resendRes.text().catch(() => ""));
    }
  } catch (e) {
    console.error("Resend exception:", e);
    emailStatus = "error";
  }

  return json({ ok: true, id: savedId, email: emailStatus });
}

// Friendly 405 on GET so direct browser hits aren't silent
export function onRequestGet() {
  return json({ error: "Method not allowed. POST a journey payload to this endpoint." }, 405);
}
