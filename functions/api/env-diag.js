/**
 * GET /api/env-diag — enumerates ALL keys in env (names only, no values).
 * For debugging Cloudflare Pages env-injection issues. Never returns values.
 */
export function onRequestGet({ env }) {
  const allKeys = Object.keys(env).sort();
  const expected = ["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","RESEND_API_KEY","JOURNEY_FROM_EMAIL","JOURNEY_ADMIN_EMAIL"];
  const report = {
    all_env_keys: allKeys,
    expected_status: {}
  };
  for (const k of expected) {
    const v = env[k];
    report.expected_status[k] = {
      present: v !== undefined && v !== null && v !== "",
      typeof: typeof v,
      length: v ? String(v).length : 0
    };
  }
  // Also check for accidental near-miss names
  const nearMisses = allKeys.filter(k =>
    k.toLowerCase().includes("supabase") ||
    k.toLowerCase().includes("resend") ||
    k.toLowerCase().includes("service") ||
    k.toLowerCase().includes("api_key")
  );
  report.near_misses = nearMisses;
  return new Response(JSON.stringify(report, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
