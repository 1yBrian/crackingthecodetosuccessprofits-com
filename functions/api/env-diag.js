/**
 * GET /api/env-diag — enumerates env, includes trailing-colon fallback check.
 */
export function onRequestGet({ env }) {
  const allKeys = Object.keys(env).sort();
  const expected = ["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","RESEND_API_KEY","JOURNEY_FROM_EMAIL","JOURNEY_ADMIN_EMAIL"];
  const report = { all_env_keys: allKeys, expected_status: {} };
  for (const k of expected) {
    const direct = env[k];
    const colonVariant = env[k + ":"];
    const v = direct !== undefined ? direct : colonVariant;
    report.expected_status[k] = {
      present: v !== undefined && v !== null && v !== "",
      typeof: typeof v,
      length: v ? String(v).length : 0,
      source: direct !== undefined ? "exact" : (colonVariant !== undefined ? "trailing-colon" : "missing")
    };
  }
  return new Response(JSON.stringify(report, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
