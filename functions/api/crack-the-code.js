// Cloudflare Pages Function: POST /api/crack-the-code
//
// Cold-prospect front door for the CTCSP "Crack the Code to Success & Profits"
// diagnostic (Cook / Abraham register). The questions and the growth-lever scoring
// run CLIENT-SIDE in /crack-the-code.html (deterministic, no LLM -> no paid-AI gate,
// instant result). This endpoint does the ONE thing that needs the server: it
// captures the entrant into the existing Prospect pipeline so the "after the yes"
// engagement can begin — a Prospect row in cem_contacts plus an additive signal.
//
// Mirrors prospect-start.js exactly for the contact shape (relationship_type
// "Prospect", server-side service-role key, additive engagement event), so these land in
// the SAME pipeline the owner cockpit already watches — no new surface to learn.
//
// HONESTY: every string we store is run through the shared integrity gate. The
// diagnostic surfaces where growth is being left on the table; it NEVER promises a
// number or a guaranteed result. Their answers are REAL; the lever read is MODELED.
//   Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { integrityGate, integrityReason } from "../../src/lib/integrity.js";
import { postEvent } from "./_events.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const clean = (v, max = 400) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SLUG_RE = /[^a-z0-9-]/g;

// Which CTCSP diagnostics this one endpoint serves. The scoring/questions live in
// each public page; this endpoint just captures the result into the Prospect
// pipeline, so adding a new diagnostic is a label here + a new page.
const ASSESSMENTS = {
  "crack-the-code": "Crack the Code to Success & Profits",
  "understand-your-prospects": "Crack the Code to Understanding Your Prospects",
  "power-skills": "Crack the Code on Your Power Skills"
};

// Coerce the client-computed profile into a safe, bounded shape. Score KEYS are
// diagnostic-specific (growth levers, power skills, …), so we accept whatever
// keys arrive rather than a fixed list. We trust it only for storage (it drives
// no privileged action); the integrity gate still screens any text it carries.
function safeProfile(p) {
  if (!p || typeof p !== "object") return null;
  const scores = {};
  const src = p.scores && typeof p.scores === "object" ? p.scores : {};
  let n = 0;
  for (const [k, v] of Object.entries(src)) {
    if (n++ >= 12) break;
    const key = clean(k, 40);
    if (!key) continue;
    const num = Number(v);
    scores[key] = Number.isFinite(num) ? Math.max(0, Math.min(100, Math.round(num))) : null;
  }
  return {
    archetype: clean(p.archetype, 120),
    topLever: clean(p.topLever, 60),
    gapLever: clean(p.gapLever, 60),
    oneMove: clean(p.oneMove, 600),
    scores
  };
}

function safeAnswers(a) {
  if (!a || typeof a !== "object") return {};
  const out = {};
  let n = 0;
  for (const [k, v] of Object.entries(a)) {
    if (n++ >= 30) break;
    const key = clean(k, 40);
    if (!key) continue;
    out[key] = Array.isArray(v) ? v.map((x) => clean(String(x), 300)).slice(0, 20) : clean(String(v ?? ""), 1200);
  }
  return out;
}

export async function onRequestPost({ request, env }) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return json({ error: "Server not configured" }, 500);

  let p;
  try { p = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  const firstName = clean(p.firstName || p.name, 120);
  const email = clean(p.email, 220);
  const businessType = clean(p.businessType, 200);
  const why = clean(p.why, 1500);
  const path = clean(p.path, 12).toLowerCase() === "maybe" ? "maybe" : "yes";
  const assessment = (clean(p.assessment, 60).toLowerCase().replace(SLUG_RE, "")) || "crack-the-code";
  const assessLabel = ASSESSMENTS[assessment] || "Crack the Code";
  const profile = safeProfile(p.profile);
  const answers = safeAnswers(p.answers);

  // The capture write needs an email to be useful as a contact. The free insight is
  // shown client-side regardless; a "maybe" who declines to leave an email simply
  // isn't written as a contact (graceful no — see After-the-Yes).
  if (!email || !EMAIL_RE.test(email)) return json({ error: "A valid email is required to send the breakdown." }, 400);

  // HONESTY gate over everything we would store. Their verbatim words + our modeled
  // read must never carry an over-promise. 422 with a human reason if it trips.
  const scanText = [firstName, businessType, why, profile?.archetype, profile?.oneMove,
    ...Object.values(answers).flatMap((v) => (Array.isArray(v) ? v : [v]))].filter(Boolean);
  const verdict = integrityGate(scanText);
  if (!verdict.ok) return json({ error: "over-promise", reason: integrityReason(verdict), detail: verdict.label }, 422);

  const id = "prospect-" + crypto.randomUUID();
  const leadLabel = profile?.gapLever ? `biggest opening: ${profile.gapLever}` : "read pending";
  const row = {
    id,
    is_demo: false,
    email,
    contact_methods: [{ type: "email", value: email, label: "primary", is_primary: true }],
    name: firstName || "Diagnostic entrant",
    role: "Owner / founder",
    company: businessType || "Business (from diagnostic)",
    relationship_type: "Prospect",
    engagement_status: path === "maybe" ? "Warming" : "New",
    last_touch: `Completed the “${assessLabel}” diagnostic`,
    next_action: "Send the personalized breakdown; open the conversation on their biggest opening",
    primary_value: "Growth left on the table",
    written_why: why || `Wants to crack the code${businessType ? ` for their ${businessType}` : ""}.`,
    risk_level: "Low",
    referral_potential: "Unknown",
    renewal_status: "Early",
    five_w: {},
    notes: [
      `Source: CTCSP — ${assessLabel} (cold-prospect diagnostic)`,
      profile?.archetype ? `Profile: ${profile.archetype}` : "Profile: not computed",
      `Modeled read — ${leadLabel}`,
      profile?.topLever ? `Current strength (real, from answers): ${profile.topLever}` : null,
      profile?.oneMove ? `Suggested one move (modeled): ${profile.oneMove}` : null,
      profile?.scores ? `Scores (0–100): ${Object.entries(profile.scores).map(([k, v]) => `${k} ${v ?? "—"}`).join(" · ")}` : null,
      businessType ? `Business type: ${businessType}` : null,
      `Path: ${path === "maybe" ? "MAYBE (warm nurture)" : "YES (wants the breakdown)"}`,
      `Captured at: ${new Date().toISOString()}`
    ].filter(Boolean),
    push_summaries: [
      `New ${assessLabel} prospect${firstName ? ` (${firstName})` : ""} — ${profile?.gapLever ? `opening: ${profile.gapLever}` : "read pending"}. Send the breakdown and open the conversation.`
    ]
  };

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/cem_contacts`, {
    method: "POST",
    headers: sbHeaders(env, { Prefer: "return=representation" }),
    body: JSON.stringify(row)
  });
  if (!res.ok) {
    const detail = await res.text();
    console.log("crack-the-code capture failed:", res.status, detail.slice(0, 300));
    return json({ error: "Could not save" }, 502);
  }

  // Additive signal — the completed read, for the owner cockpit. Best-effort.
  await postSignal(env, {
    id: "signal-" + crypto.randomUUID(),
    contact_id: id,
    signal_type: `assessment.${assessment}.completed`,
    source: "ctcsp_diagnostic",
    summary: `${firstName || "A prospect"} completed “${assessLabel}”${profile?.archetype ? ` — ${profile.archetype}` : ""}.`,
    payload: { assessment, path, profile, answers }
  });

  return json({ ok: true, id, path, assessment }, 201);
}

function sbHeaders(env, extra = {}) {
  return { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json", ...extra };
}

// Engagement feed write → canonical cem_engagement_events (see _events.js).
async function postSignal(env, row) {
  await postEvent(env, row);
}
