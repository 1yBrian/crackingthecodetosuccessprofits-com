/* ============================================================
   Value Stack Builder — Phase 1 logic (vanilla JS, no deps)
   Flow: website URL -> auto-fill (baked CTCSP example) ->
         verify & tune -> render visual value stack.
   Live "fetch any URL" generation is the next funded phase;
   this prototype is wired to one REAL example.
   ============================================================ */

/* ---- The baked auto-fill result: REAL crackingthecodetosuccessprofits.com data ----
   src: 'scraped' = lifted directly from the site
        'inferred' = drawn from the site's own copy
        'verify'  = not on the site; practitioner must supply              */
const CTCSP_PROFILE = {
  domain: "crackingthecodetosuccessprofits.com",
  industry: "Business coaching / advisory training",
  brand: { ink: "#1A1814", gold: "#C4922A", cream: "#F5F0E8" },
  logo: "./assets/ctcsp-logo-web.png",
  fields: [
    { key: "businessName", label: "Business name", src: "scraped",
      value: "Cracking the Code to Success & Profits (CTCSP)" },
    { key: "offer", label: "Primary offer", src: "scraped", type: "area",
      value: "Weekly live implementation training — Jay Abraham's frameworks applied to your actual business, every Monday." },
    { key: "idealClient", label: "Ideal client", src: "scraped", type: "area",
      value: "Business owners 2+ years in, already generating revenue, whose profit isn't matching their effort — ready to implement, not be inspired." },
    { key: "clientOutcome", label: "The outcome they want", src: "scraped", type: "area",
      value: "A business worth owning and worth selling — profit that matches the effort, leverage used deliberately." },
    { key: "clientFear", label: "Their fear before buying", src: "inferred",
      value: "I've done courses before and Monday swallowed the plan — will this actually compound?" },
    { key: "price", label: "Price", src: "scraped",
      value: "$279 / month" },
    { key: "priceFrame", label: "How the price is framed", src: "scraped", type: "area",
      value: "\"$279 a month. That's the floor. The ceiling is whether you use it.\"" },
    { key: "deliveryEmail", label: "Contact email", src: "scraped",
      value: "explore@brianoney.com" },
    { key: "onboardingPath", label: "How they actually buy", src: "scraped", type: "area",
      value: "ctcsp.com → Mighty Networks plan checkout → private community access (the-abraham-group.mn.co)." },
    { key: "linkedin", label: "LinkedIn", src: "verify",
      value: "" },
    { key: "logoUrl", label: "Logo", src: "scraped",
      value: "ctcsp-updated-logo.png (brand crest)" }
  ],
  // Value-stack components — each pulled from the real site.
  // 'worth' values are illustrative defaults the practitioner tunes.
  layers: [
    { ttl: "Weekly live implementation sessions",
      desc: "Mondays, 60–90 min — real problems, real frameworks, applied live", worth: 800 },
    { ttl: "Two practitioners in every room",
      desc: "Brian's Meliorist advisory lens + Scott's Exit Ratio 360™", worth: 600 },
    { ttl: "The six Jay Abraham frameworks",
      desc: "Applied to your business — not taught from a slide", worth: 500 },
    { ttl: "Minimum Viable Momentum accountability",
      desc: "One finished move per week, named out loud — doubles follow-through", worth: 300 },
    { ttl: "Private Mighty Networks community",
      desc: "Between-Mondays momentum from a room that knows your business", worth: 250 },
    { ttl: "The four-month compounding arc",
      desc: "Month one is useful. Four months is a different business.", worth: 400 }
  ],
  whyYes: [
    "<strong>You already know more than you're currently using.</strong> This isn't more strategy. It's a room that helps you deploy the logic already working in your business.",
    "<strong>The risk sits with us, not you.</strong> Every Monday you leave with one implementable move — or the session didn't do its job. Value shows up the same week, not in month six.",
    "<strong>Exit-ready is growth-ready.</strong> Scott's lens means every decision you make also raises what your business is worth — whether you ever sell or not."
  ],
  founder: {
    initials: "BO",
    quote: "I have intrinsic worth. You have intrinsic worth. The work is revealing it — not manufacturing it from scratch.",
    who: "Brian Oney, MPA · Co-host, CTCSP"
  }
};

/* What the scanner "finds" — drawn from the profile, for the reveal animation */
const SCAN_HITS = [
  { what: "Business identity", val: "CTCSP" },
  { what: "Primary offer", val: "Weekly implementation training" },
  { what: "Ideal client", val: "Owners 2+ yrs, revenue, want mechanics" },
  { what: "Brand colors (from stylesheet)", val: "ink · gold · cream" },
  { what: "Price + price frame", val: "$279/mo — \"that's the floor\"" },
  { what: "Proof / member wins", val: "Nick · Andrea · Nader" },
  { what: "Onboarding path", val: "→ Mighty Networks" },
  { what: "Founder message + portrait", val: "Brian Oney" },
  { what: "Industry (from email domain)", val: "Coaching / advisory" }
];

/* ---------------- helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const money = n => "$" + n.toLocaleString("en-US");

function showPanel(name) {
  $$(".panel").forEach(p => p.classList.toggle("active", p.id === name));
  $$("#stepRail .step-pill").forEach(pill => {
    const order = ["frontdoor", "verify", "stack"];
    const cur = order.indexOf(name);
    const mine = order.indexOf(pill.dataset.step);
    pill.classList.toggle("active", pill.dataset.step === name);
    pill.classList.toggle("done", mine > -1 && mine < cur);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- scan animation ---------------- */
function runScan(onDone) {
  const box = $("#scanner");
  box.style.display = "block";
  box.innerHTML = SCAN_HITS.map(h =>
    `<div class="scan-line"><span class="dot"></span><span class="what">${h.what}</span><span class="val">${h.val}</span></div>`
  ).join("");
  const lines = $$(".scan-line", box);
  let i = 0;
  const tick = () => {
    if (i < lines.length) {
      lines[i].classList.add("hit");
      i++;
      setTimeout(tick, 230);
    } else {
      setTimeout(onDone, 450);
    }
  };
  setTimeout(tick, 250);
}

/* ---------------- verify form ---------------- */
function srcBadge(src) {
  const map = { scraped: ["src-scraped", "scraped"], inferred: ["src-inferred", "inferred"], verify: ["src-verify", "needs you"] };
  const [cls, txt] = map[src] || map.verify;
  return `<span class="src ${cls}">${txt}</span>`;
}

function renderVerify() {
  const form = $("#verifyForm");
  form.innerHTML = CTCSP_PROFILE.fields.map(f => {
    const span = (f.type === "area") ? " span-2" : "";
    const input = (f.type === "area")
      ? `<textarea data-key="${f.key}">${f.value}</textarea>`
      : `<input type="text" data-key="${f.key}" value="${f.value.replace(/"/g, "&quot;")}" />`;
    return `<div class="field${span}">
      <label>${f.label} ${srcBadge(f.src)}</label>
      ${input}
    </div>`;
  }).join("");
  const needs = CTCSP_PROFILE.fields.filter(f => f.src === "verify").length;
  const scraped = CTCSP_PROFILE.fields.filter(f => f.src === "scraped").length;
  $("#verifyNote").textContent =
    `${scraped} fields filled from your site · only ${needs} need you. That's the point.`;
}

/* read current form values back into the profile before building */
function syncFromForm() {
  $$("#verifyForm [data-key]").forEach(el => {
    const f = CTCSP_PROFILE.fields.find(x => x.key === el.dataset.key);
    if (f) f.value = el.value;
  });
}

/* ---------------- value stack visual ---------------- */
function renderStack() {
  const v = $("#stackVisual");
  const total = CTCSP_PROFILE.layers.reduce((s, l) => s + l.worth, 0);
  const priceField = CTCSP_PROFILE.fields.find(f => f.key === "price");
  const frameField = CTCSP_PROFILE.fields.find(f => f.key === "priceFrame");

  v.innerHTML =
    `<div class="vh">What they're actually getting</div>` +
    CTCSP_PROFILE.layers.map((l, idx) =>
      `<div class="stack-layer" style="animation-delay:${idx * 90}ms">
        <div><div class="ttl">${l.ttl}</div><div class="desc">${l.desc}</div></div>
        <div class="worth">${money(l.worth)}<span style="font-size:.7rem;color:var(--rule)">/mo</span></div>
      </div>`
    ).join("") +
    `<div class="stack-total"><span class="lbl">Total value, illustrated (you tune these)</span><span class="num">${money(total)}<span style="font-size:1rem;color:var(--rule)">/mo</span></span></div>` +
    `<div class="stack-price">
       <div class="you-pay">You invest</div>
       <div class="amt">${priceField ? priceField.value.replace("$", "<sup>$</sup>").replace(" / month", "") : "$279"}<span style="font-size:1rem;color:var(--rule)">/mo</span></div>
       <div class="frame">${frameField ? frameField.value : ""}</div>
     </div>`;

  // why-yes
  $("#whyYesModel").innerHTML = CTCSP_PROFILE.whyYes.map(p => `<p>${p}</p>`).join("");

  // founder
  const f = CTCSP_PROFILE.founder;
  $("#founderBlock").innerHTML =
    `<div class="avatar">${f.initials}</div>
     <div><div class="q">"${f.quote}"</div><div class="who">${f.who}</div></div>`;

  const bn = CTCSP_PROFILE.fields.find(x => x.key === "businessName");
  $("#stackHeadline").textContent =
    `${bn ? bn.value.split("(")[0].trim() : "Your"} — a value stack built to make yes easy.`;
}

/* ---------------- apply brand theme from analyzed site ---------------- */
function applyBrand() {
  const b = CTCSP_PROFILE.brand;
  document.documentElement.style.setProperty("--ink", b.ink);
  document.documentElement.style.setProperty("--gold-light", b.gold);
  document.documentElement.style.setProperty("--cream", b.cream);
  $("#brandStatus").textContent = `Analyzed: ${CTCSP_PROFILE.domain}`;
  if (CTCSP_PROFILE.logo) {
    const lv = $("#brandLogoVerify"); if (lv) lv.src = CTCSP_PROFILE.logo;
    const ls = $("#brandLogoStack"); if (ls) ls.src = CTCSP_PROFILE.logo;
  }
}

/* ---------------- wire up ---------------- */
function init() {
  $("#analyzeBtn").addEventListener("click", () => {
    const url = $("#urlInput").value.trim();
    if (!url) { $("#urlInput").focus(); $("#urlInput").placeholder = "Enter your website to begin…"; return; }
    $("#analyzeBtn").disabled = true;
    $("#analyzeBtn").textContent = "Reading your site…";
    runScan(() => {
      applyBrand();
      renderVerify();
      showPanel("verify");
      $("#analyzeBtn").disabled = false;
      $("#analyzeBtn").textContent = "Analyze my site →";
    });
  });

  $("#urlInput").addEventListener("keydown", e => { if (e.key === "Enter") $("#analyzeBtn").click(); });

  $("#buildStackBtn").addEventListener("click", () => {
    syncFromForm();
    renderStack();
    showPanel("stack");
  });

  $("#restartBtn").addEventListener("click", () => {
    $("#scanner").style.display = "none";
    showPanel("frontdoor");
  });
}

document.addEventListener("DOMContentLoaded", init);
