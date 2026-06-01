/**
 * GET /api/env-diag — diagnostic ONLY. Returns presence + length of env vars.
 * Never returns actual values. Will be removed after Phase 2 verification.
 */
export function onRequestGet({ env }) {
  const keys = ["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","RESEND_API_KEY","JOURNEY_FROM_EMAIL","JOURNEY_ADMIN_EMAIL"];
  const report = {};
  for (const k of keys) {
    const v = env[k];
    report[k] = {
      present: v !== undefined && v !== null && v !== "",
      typeof: typeof v,
      length: v ? String(v).length : 0,
      // Show first and last 2 chars only — proves the right thing was pasted
      head: v ? String(v).slice(0, 2) : null,
      tail: v ? String(v).slice(-2) : null
    };
  }
  return new Response(JSON.stringify(report, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
