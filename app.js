/* ============================================================================
   Project Lighthouse — Room 5 (GPA / PMO) dashboard
   All figures below mirror the capstone document
   "Project Lighthouse — 10 PMO Deliverables (Refined)". Edit the DATA block
   only; every chart and table is rendered from it.
   ========================================================================== */

const DATA = {
  pointInTime: "Month 6 of 18",
  health: "AMBER",

  kpis: [
    { label: "Year‑1 net hard P&L savings (P50)", value: "$17.5M", delta: "Band $14.0M – $22.0M · co‑signed by Finance, Product, Ops", icon: "savings", color: "#1E2761" },
    { label: "Year‑2+ steady‑state run‑rate", value: "$32.5M / yr", delta: "Support cost $180.0M → $147.5M ($12.29 / ticket)", icon: "trending_up", color: "#2D3A8C" },
    { label: "18‑month program budget (P50)", value: "$40.0M", delta: "$11.5M spent (M1–M6) · $28.5M remaining · CPI 0.97", icon: "account_balance_wallet", color: "#B26A00" },
    { label: "Blended Y1 co‑pilot adoption", value: "12% → 24%", delta: "35% Y1 exit · 40% steady state (sensitivity range 18%–32%)", icon: "rocket_launch", color: "#1E8E3E" },
  ],

  runRate: { labels: ["Pre‑program", "Year 1 (P50)", "Year 2+ steady state"], values: [180.0, 162.5, 147.5], perTicket: ["$15.00", "$13.54", "$12.29"] },
  adoption: { labels: ["Wave 1 today (M6)", "NOW exit (M7)", "NEXT exit (M12)", "LATER / steady state (M18)"], values: [12, 25, 28, 40] },

  waves: [
    { name: "Wave 1", regions: "3 pilot regions", share: 31, status: "Live", color: "#1E8E3E", note: "Pilot adoption 12% · dual‑running Day 48" },
    { name: "Wave 2", regions: "5 core regions", share: 58, status: "Gate in 3 weeks", color: "#F29900", note: "58% of ticket volume · 21‑day PII & vendor gate" },
    { name: "Wave 3", regions: "4 Tier‑3 regions", share: 11, status: "Months 13–18", color: "#2D3A8C", note: "11% of volume · primary deferral lever ($3.4M)" },
  ],

  dashboard: [
    { kpi: "1. Net hard P&L savings run‑rate (SAP + PMO ledger)", base: "$0.0M", cur: "$9.0M / yr (W1 pilot)", target: "$17.5M Y1 ($14M–$22M)", rag: "AMBER", trend: "up", trigger: "Below $14.0M run‑rate by M9 → freeze Wave 3 spend and enforce BPO seat clawback (Tiya / Urvi)" },
    { kpi: "2. Weekly active co‑pilot usage (CRM telemetry)", base: "0%", cur: "12.0% (W1)", target: "25% W2 gate / 40% exit", rag: "RED", trend: "flat", trigger: "Pause Wave 2 cutover in any site until W1 holds ≥ 22% for 2 weeks after single‑pane release (Zaiyan / R3)" },
    { kpi: "3. Unmasked PII in training / logs (Room 1 scanner)", base: "Unscanned", cur: "3 regions flagged (65% scanned)", target: "0.00% (100% scanned)", rag: "RED", trend: "up", trigger: "HARD STOP: no production cutover on tainted weights; route to rules‑engine fallback (Vinayak / R1)" },
    { kpi: "4. Vendor SLA compliance — Apex (Room 2 monitor)", base: "99.0%", cur: "94.2% (2‑week breach)", target: "≥ 98.5% (14‑day cure)", rag: "RED", trend: "up", trigger: "Below 98.5% on Day 14 → withhold $14M renewal; shift 25% of W2 volume to Backup BPO B (Yagnesh / R2)" },
    { kpi: "5. 7‑day un‑reopened backlog & cost per ticket", base: "$15.00 / ticket", cur: "+35% volume · $15.40 / ticket (dual‑run)", target: "≤ $13.54 / ticket Y1", rag: "AMBER", trend: "up", trigger: "Reopen rate above 12% → tighten bot confidence threshold; deploy deflection v2 on top‑5 intents (Varun / R4)" },
    { kpi: "6. Legacy CRM dual‑running window (IT licence log)", base: "Parallel", cur: "Day 48 in W1", target: "≤ 60 days per wave", rag: "GREEN", trend: "up", trigger: "Auto‑switch legacy CRM to read‑only at Day 60; waiver requests escalate to VP Chair (Urvi / R4)" },
    { kpi: "7. Program burn & CPI ($40.0M P50 baseline)", base: "$40.0M plan", cur: "$11.5M spent · CPI 0.97", target: "CPI ≥ 0.95", rag: "GREEN", trend: "flat", trigger: "CPI below 0.94 or 20% cut ordered → execute Scenario C ($32.0M) cut memo within 5 days (Urvi)" },
  ],

  vanity: [
    ["\"94% of agents completed the AI training video\"", "Agents watched the video and reverted to legacy CRM under queue stress (actual usage 12%)", "Weekly active co‑pilot resolution rate (≥ 24% Y1 target)"],
    ["\"$45.0M gross annualised benefit potential\"", "Counts unproven soft revenue; ignores −$3.5M dual‑running overtime", "Audited net hard P&L run‑rate (SAP‑verified, net of dual‑run drag)"],
    ["\"38% bot deflection rate (raw chat closes)\"", "Hid customers reopening tickets within 48 hours, inflating the volume spike", "7‑day un‑reopened deflection rate"],
    ["\"96.4% offline LLM benchmark accuracy\"", "Missed unmasked customer PII in three regional training corpora", "Production & training PII leakage rate (hard gate = 0.00%)"],
  ],

  agreements: [
    "<b>Friday 12:00 UTC \"One Number\" freeze.</b> No benefit, adoption or SLA figure reaches executives outside the reconciled SSOT ledger.",
    "<b>24‑hour red‑flag rule.</b> Any dependency slip over 48 hours or privacy anomaly is escalated to the RAID Lead within 24 hours.",
    "<b>Bilateral marketplace contracts.</b> Every cross‑room ask has a named owner, a binary definition of done and a fallback trigger.",
    "<b>Disagree with data, commit on the log.</b> Once the VP / SteerCo Chair signs the Decision Log, all five rooms execute as one.",
    "<b>Zero vanity reporting.</b> If a metric cannot trigger a resource, scope or launch decision it stays out of the pack.",
  ],

  waterfall: [
    { label: "Product headline", axis: "Product headline", delta: 45.0, total: 45.0, kind: "start" },
    { label: "1. Unproven retention uplift", axis: "1. Retention uplift", delta: -12.0, total: 33.0 },
    { label: "2. Double‑counted deflection & locked H1 licences", axis: "2. Deflection & H1 licences", delta: -4.5, total: 28.5 },
    { label: "3. Phase adoption curve (40% → 24%)", axis: "3. Adoption curve 40% → 24%", delta: -8.0, total: 20.5 },
    { label: "4. Capped dual‑running & surge drag", axis: "4. Dual‑running drag", delta: -2.0, total: 18.5 },
    { label: "5. 21‑day privacy & vendor gate reserve", axis: "5. Gate reserve", delta: -1.0, total: 17.5 },
    { label: "Reconciled Y1 commitment (P50)", axis: "Reconciled Y1 (P50)", delta: 17.5, total: 17.5, kind: "end" },
  ],

  claims: { labels: ["Product", "Finance", "Regional Ops", "Room 5 SSOT"], values: [45.0, 18.0, 9.0, 17.5] },
  taxonomy: [
    { tier: "Tier 1 — Net hard P&L (booked)", value: 17.5, color: "#1E2761" },
    { tier: "Tier 2 — Capacity avoidance (tracked, not booked)", value: 4.2, color: "#7986CB" },
    { tier: "Tier 3 — Retention hypothesis (holdout test)", value: 12.0, color: "#C5CAE9" },
  ],

  bands: [
    { band: "P90 floor", y1: 14.0, y2: 26.0, note: "Adoption plateaus at 18%; dual‑run −$2.5M; W2 slips 4 weeks. Still +$5.0M above Ops status quo." },
    { band: "P50 committed", y1: 17.5, y2: 32.5, note: "24% blended adoption (35% exit); 60‑day sunset holds; gates clear in 21 days." },
    { band: "P10 ceiling", y1: 22.0, y2: 36.0, note: "32% blended adoption (42% exit); $0.5M Apex SLA credits realised early." },
  ],
  curve: { labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"], realised: [1.2, 2.3, 5.8, 8.2, 7.8, 8.5], cumulative: [1.2, 3.5, 9.3, 17.5, null, null] },

  diagnosis: [
    ["Question answered", "Total theoretical gross value at 40% scale plus retention?", "Hard cost‑out under a 25% top‑down model?", "Net run‑rate seen today in the Wave 1 pilot?", "Audited net hard P&L savings realised in Year 1?"],
    ["Adoption assumption", "40% instant Day‑1, all 12 regions", "25% blended Y1 ramp, static baseline", "12% static pilot adoption for 12 months", "24% wave‑phased Y1 blended (12% W1 → 35% exit)"],
    ["Soft retention uplift", "+$12.0M churn avoidance (unproven; also claimed by Marketing)", "Excluded (GAAP)", "Excluded (invisible at contact‑centre P&L)", "Discarded from Tier‑1; tracked as Tier‑3 holdout KPI"],
    ["Deflection & licence overlap", "Double‑counts (+$2.5M); full $6M licence exit in Y1", "$1.5M pro‑rated H2 licence exit; clean single‑counting", "$0 licence exit (IT owns contracts)", "Discard $2.5M overlap + $2.0M locked H1; book $1.5M H2 exit"],
    ["Dual‑running & surge", "Ignored ($0 friction)", "Omitted (missed floor overtime)", "Deducts full −$3.5M / yr", "Deduct −$2.0M Y1 (capped via 60‑day sunset + UI embed)"],
    ["Gate & schedule risk", "Zero slip assumed", "Zero slip assumed", "Assumes Waves 2/3 never improve", "Deduct −$1.0M for 21‑day PII & vendor gate"],
  ],

  budget: {
    categories: ["Core AI platform, LLM & PII scrubbing", "Single‑pane CRM integration & migration", "Vendor — Apex / backup BPO", "Regional rollout, localisation & enablement", "Transition dual‑running & surge buffer", "PMO telemetry & risk reserve"],
    spent: [4.8, 2.2, 2.4, 1.1, 0.6, 0.4],
    remaining: [8.7, 4.3, 5.6, 4.4, 2.4, 3.1],
    p10: [12.5, 5.8, 7.0, 4.5, 2.2, 4.5],
    p50: [13.5, 6.5, 8.0, 5.5, 3.0, 3.5],
    p90: [15.0, 7.2, 9.2, 6.4, 4.5, 2.5],
    totals: { spent: 11.5, remaining: 28.5, p10: 36.5, p50: 40.0, p90: 44.8 },
    burn: { m1_6: "~$1.9M / mo", m7_18: "$2.38M / mo", cpi: "0.97" },
  },
  scenarios: [
    { name: "A — Stage‑gated recovery (recommended, P50)", cost: 40.0, y1: 17.5, y2: 32.5, y1band: "$14M–$22M", note: "12 regions in 3 waves; 60‑day dual‑run cap; PII & Apex cured within 21 days. Best 3‑yr NPV ($31.4M).", rec: true },
    { name: "B — Unmitigated friction (P90 stress)", cost: 44.8, y1: 14.0, y2: 26.0, y1band: "floor", note: "Dual‑running past 90 days; Apex replaced mid‑Wave 2 (+$1.2M); adoption stalls at 18%. Prevented by PMO gates." },
    { name: "C — 20% austerity mandate (pre‑built)", cost: 32.0, y1: 15.7, y2: 28.0, y1band: "$12.5M–$19.5M", note: "Defers 4 Tier‑3 Wave 3 regions (−$3.4M), drops Could‑Haves (−$2.2M), vendor clawback (−$1.4M), 45‑day sunset (−$1.0M). 90% of Y1 savings for 80% of capital." },
  ],
  cuts: [
    { lever: "Cut 1 · Defer Wave 3 (4 Tier‑3 regions) to FY+1", budget: 3.4, benefit: 1.8 },
    { lever: "Cut 2 · Cancel Could‑Have voice avatar & 14‑dialect translation", budget: 2.2, benefit: 0 },
    { lever: "Cut 3 · Apex SLA penalty credits; T&M QA → fixed milestone", budget: 1.4, benefit: 0 },
    { lever: "Cut 4 · Compress dual‑running 60 → 45 days; trim buffer", budget: 1.0, benefit: 0 },
  ],

  scope: [
    { tier: "Must", item: "Automated PII scrubbing, weight purge & audit gate (Room 1)", cost: 1.8, cod: 650 },
    { tier: "Must", item: "Core AI triage, intent classification & routing engine", cost: 7.2, cod: 240 },
    { tier: "Must", item: "Single‑pane CRM co‑pilot UI embed", cost: 6.5, cod: 210 },
    { tier: "Must", item: "Wave 1 (3 pilot) + Wave 2 (5 core regions = 89% of volume)", cost: 11.8, cod: 190 },
    { tier: "Must", item: "Automated SSOT benefits, SLA & adoption telemetry pipeline", cost: 1.5, cod: 120 },
    { tier: "Should", item: "In‑workflow micro‑coaching prompts & unified regional comms", cost: 2.4, cod: 85 },
    { tier: "Should", item: "Self‑service help‑centre deflection bot v2", cost: 3.2, cod: 60 },
    { tier: "Should", item: "Wave 3 — 4 low‑volume, high‑localisation Tier‑3 regions", cost: 3.4, cod: 35 },
    { tier: "Could", item: "Real‑time neural voice translation (14 dialects)", cost: 1.3, cod: 8 },
    { tier: "Could", item: "Generative voice sentiment coaching avatar", cost: 0.9, cod: 4 },
  ],
  wontHave: "Outbound AI sales bot · regional on‑prem LLM forks · migration of tickets older than 3 years",
  scopeKV: [
    ["Product scope", "AI‑assisted customer support platform — PII‑certified intent triage and an agent co‑pilot embedded in a single CRM workspace — across 12 regions in three waves, with enablement, telemetry and legacy decommissioning."],
    ["Major deliverables", "Ratified $17.5M SSOT ledger · 0.00% unmasked‑PII certificate · single‑pane co‑pilot live · signed Apex cure rider · unified comms kit · regional cutover sign‑offs · legacy CRM read‑only at Day 60 per wave."],
    ["Constraints", "$40.0M P50 capital envelope · 18‑month schedule · statutory privacy holds cannot be overridden by PMO · MSA liability caps require Legal."],
    ["Assumptions", "Single‑pane UI plus unified coaching lifts blended Y1 adoption 12% → 24% (sensitivity 18%–32%) · 60‑day sunset enforceable via licence renewal controls."],
    ["Change control", "Changes over $250K or over a 5‑day critical‑path slip require VP / SteerCo Chair approval (DACI); smaller changes at Tier 1 / Tier 2."],
    ["Won't have", "Outbound AI sales bot · regional on‑prem LLM forks · migration of tickets older than 3 years."],
  ],

  roadmap: [
    { h: "NOW", when: "Months 6–7 · next 6 weeks", title: "Trust & fix", color: "#1E2761",
      outcome: "Restore executive trust in the numbers, eliminate PII exposure, cure vendor SLAs, double pilot adoption.",
      work: ["Ratify $17.5M SSOT baseline at SteerCo (R5)", "Purge tainted logs; deploy PII scrubber (R1)", "14‑day Apex SLA cure tied to renewal (R2)", "Single‑pane CRM embed + unified comms in Wave 1 (R3 / R4)"],
      exit: ["100% SteerCo sign‑off on SSOT", "0.00% unmasked PII certified", "Vendor SLA ≥ 98.5% (14‑day rolling)", "Wave 1 adoption 12% → 25%"],
      value: "Protects launch legality; lifts pilot run‑rate from $9.0M toward $13M+" },
    { h: "NEXT", when: "Months 8–12", title: "Wave 2 scale & legacy exit", color: "#2D3A8C",
      outcome: "Scale across 8 core regions (89% of tickets) and convert time savings into hard P&L cost‑out.",
      work: ["Cut over Wave 2 (5 core regions, 58% of volume)", "60‑day legacy CRM sunset in Waves 1 and 2", "Help‑centre deflection v2 to blunt the surge", "BPO tier‑down and H2 legacy licence exits"],
      exit: ["Blended adoption ≥ 28% across 8 live regions", "Wave 1 legacy CRM 100% retired", "≥ $9.5M annualised net hard savings booked in SAP"],
      value: "Eliminates dual‑running bleed; unit cost $15.00 → $13.54 per ticket" },
    { h: "LATER", when: "Months 13–18", title: "Wave 3 & steady state", color: "#B26A00",
      outcome: "Complete the 12‑region rollout (or Phase‑2 Tier‑3 if austerity invoked) and hand $32.5M run‑rate to BAU.",
      work: ["Deploy Wave 3 (4 regulated / localised regions)", "Retire the full $6.0M / yr legacy CRM stack", "6‑month Tier‑3 retention cohort readout", "SSOT telemetry → FP&A monthly close"],
      exit: ["40% steady‑state adoption", "$17.5M Y1 realised; $32.5M Y2 run‑rate", "Zero parallel legacy systems"],
      value: "Full $32.5M / yr steady‑state P&L impact plus verified retention upside" },
  ],

  wbs: [
    { id: "1.0", name: "PMO control tower & benefits realisation", wps: ["1.1 Charter & DACI", "1.2 SSOT benefits ledger & bridge", "1.3 Dependency marketplace & master schedule", "1.4 Crisis playbooks & SteerCo pack"], deliv: "Ratified $17.5M SSOT ledger, decision dashboard, live RAID & decision log, SteerCo deck", owner: "Yash Runwal, Tiya Gupta", gate: "M6 SteerCo + monthly close" },
    { id: "2.0", name: "Privacy, security & training‑data remediation", wps: ["2.1 12‑region log forensic scan", "2.2 Automated PII redaction filter", "2.3 Tainted weight purge & v1.2 retrain", "2.4 CISO audit"], deliv: "0.00% unmasked‑PII compliance certificate + production ingestion firewall", owner: "Room 1 Lead (tracked: Vinayak)", gate: "T‑7 days before Wave 2" },
    { id: "3.0", name: "Core platform, single‑pane UI & vendor recovery", wps: ["3.1 Intent routing engine", "3.2 Single‑pane legacy CRM embed", "3.3 Apex 14‑day SLA cure & gainshare rider", "3.4 Backup BPO bench"], deliv: "Single‑pane co‑pilot live; signed Apex cure rider (≥ 98.5% SLA); overflow BPO ready", owner: "Engineering + Room 2 (tracked: Yagnesh)", gate: "14‑day vendor cure + UAT" },
    { id: "4.0", name: "Change enablement, comms & adoption ramp", wps: ["4.1 Global single‑voice messaging", "4.2 In‑tool micro‑prompts", "4.3 Regional champion network", "4.4 Retention holdout cohort test"], deliv: "Unified regional comms kit; ≥ 25% Wave 1 weekly active adoption; holdout readout", owner: "Room 3 Lead + Zaiyan M", gate: "Wave 2 readiness gate" },
    { id: "5.0", name: "Operations cutover, surge triage & legacy sunset", wps: ["5.1 Queue deflection v2 (35% surge)", "5.2 Wave 1–3 regional cutovers", "5.3 60‑day dual‑run cap", "5.4 Legacy licence & BPO seat exit"], deliv: "Regional cutover sign‑offs; legacy CRM read‑only at Day 60; audited invoice reductions", owner: "Room 4 Lead + Urvi Ramekar", gate: "Wave + 60‑day sunset audit" },
  ],
  deps: [
    ["DEP‑01", "Room 1 → Room 5 PMO & Engineering", "GIVE region‑by‑region PII scan & scrubbed dataset v1.2 (0.00% PII) · GET 14‑day Wave 2 code freeze + $1.8M ring‑fenced remediation budget", "T‑7d before Wave 2 gate", "Deterministic non‑LLM routing in affected region; isolate tainted weights"],
    ["DEP‑02", "Room 2 → Room 4 Ops & Room 5", "GIVE signed Apex 14‑day cure rider (≥ 98.5% SLA + co‑pilot clause) & $500K credit escrow · GET $14M renewal signature frozen as leverage", "T‑5d before SteerCo", "Secondary Vendor B warm bench for 25% of W2 tier‑1 volume"],
    ["DEP‑03", "Room 3 → Room 4 Ops & Room 5", "GIVE single global narrative + 3‑minute in‑CRM micro‑coaching cards · GET protected 20‑minute weekly huddle per shift", "T‑10d before Wave 2", "Mandatory guided tooltips inside the CRM UI release"],
    ["DEP‑04", "Room 4 → Room 5 Benefits (Tiya)", "GIVE legacy CRM read‑only at Day 60 + release vacated BPO seats · GET −$2.0M transition buffer booked", "Wave + 60 days per region", "Finance auto‑freezes legacy seat renewals at Day 75 unless VP waiver"],
    ["DEP‑05", "Platform Eng → Room 4 Ops & Room 3", "GIVE single‑pane co‑pilot iframe (no alt‑tab) · GET all Could‑Have scope frozen to protect sprint capacity", "T‑12d before Wave 2", "Hotfix keyboard macro bridge to auto‑sync ticket IDs"],
    ["DEP‑06", "Finance + Product + Ops → Room 5 (Varun & Tiya)", "GIVE automated daily SAP invoice, handle‑time and co‑pilot session feed into SSOT · GET all manual weekly spreadsheets retired", "T‑14d before SteerCo", "Lock prior week's audited SAP actuals; flag missing stream Amber"],
    ["DEP‑07", "Room 1 → Room 3 (Adoption)", "GIVE approved agent safe‑use guardrails for free‑text prompts · GET guardrails embedded in Day‑1 quick‑reference card", "T‑10d before Wave 2", "Disable free‑text prompt box; structured CRM fields only"],
  ],

  raid: [
    { id: "I‑01", type: "Issue", desc: "Three conflicting Y1 benefit figures ($45M, $18M, $9M) briefed to the VP ahead of SteerCo (Room 5)", sev: "RED — open, closing at SteerCo", rag: "RED", mit: "Publish forensic waterfall bridge; lock $17.5M P50 ($14M–$22M) SSOT ledger co‑signed by Finance, Product and Ops", owner: "Tiya Gupta · SteerCo" },
    { id: "I‑02", type: "Issue", desc: "Unmasked customer PII in 3 regional historical training logs, 3 weeks pre‑launch (Room 1)", sev: "RED — containment active", rag: "RED", mit: "Quarantine tainted weights; NER / regex scrubber; clean v1.2 retrain; CISO audit gate", owner: "Vinayak + Room 1 · T+14d" },
    { id: "I‑03", type: "Issue", desc: "Apex Support Partners missed SLAs for 2 consecutive weeks during MSA renewal (Room 2)", sev: "RED — cure notice issued", rag: "RED", mit: "Hold $14M renewal; escrow $500K SLA credits; shift 30% of fee to AI gainshare; warm Backup BPO B", owner: "Yagnesh + Room 2 · T+14d" },
    { id: "I‑04", type: "Issue", desc: "Wave 1 pilot adoption stuck at 12% vs 40% amid 35% ticket surge and dual tools (Rooms 3 & 4)", sev: "AMBER — recovery in flight", rag: "AMBER", mit: "Ship single‑pane CRM embed; 3‑minute in‑tool nudges; audit bot reopen rate", owner: "Zaiyan + Rooms 3 / 4 · T+21d" },
    { id: "R‑01", type: "Risk", desc: "Regional GMs delay the 60‑day legacy CRM shutoff to protect a perceived SLA safety net (+$1.5M drag)", sev: "HIGH (P 60% × I $1.5M)", rag: "RED", p: 60, i: "H", short: "GMs delay 60‑day legacy shutoff (+$1.5M)", mit: "Hard‑code Day‑60 read‑only cutover with 30‑day SLA grace; VP Chair waiver required", owner: "Urvi + Room 4 · Wave + 60d" },
    { id: "R‑02", type: "Risk", desc: "20% corporate budget reduction ($8.0M) lands mid‑execution and guts core adoption scope", sev: "MED‑HIGH (P 50% × I $8M)", rag: "AMBER", p: 50, i: "H", short: "20% budget cut ($8.0M) mid‑execution", mit: "Pre‑built Scenario C cut memo deferring Wave 3 ($3.4M) and Could‑Haves ($2.2M) while shielding Must‑Haves", owner: "Urvi Ramekar · ready" },
    { id: "R‑03", type: "Risk", desc: "Premature self‑service bot closures drive a > 15% 72‑hour ticket reopen rate, worsening the queue cliff", sev: "MED (P 45% × I high)", rag: "AMBER", p: 45, i: "M", short: "Bot closures drive > 15% reopen rate", mit: "Count deflection only on \"7‑day un‑reopened resolution\" in the SSOT dashboard", owner: "Varun Varma Nampally · live" },
    { id: "A‑01", type: "Assumption", desc: "Single‑pane UI plus unified coaching lifts blended Y1 adoption from 12% to 24% (40% Day‑1 invalidated)", sev: "VALIDATED range 18%–32%", rag: "GREEN", mit: "Sensitivity‑tested: even at 18% adoption the P90 floor still delivers $14.0M", owner: "Tiya Gupta · monthly" },
    { id: "D‑01", type: "Dependency", desc: "Wave 2 cutover depends on both Room 1 CISO clearance and Room 2 14‑day vendor SLA ≥ 98.5%", sev: "AMBER — gated", rag: "AMBER", mit: "Tracked daily in the 09:00 UTC standup; Bounded 2‑Region Launch ready if multilingual logs need +7 days", owner: "Yagnesh Reddy · T+14d" },
  ],
  killers: [
    { icon: "storefront", title: "Perverse vendor seat cannibalisation", text: "Apex bills per human agent seat, so every 10% of AI deflection cuts Apex's revenue — silent floor resistance unless 30% of their fee moves to AI‑exception outcome margin." },
    { icon: "content_paste_off", title: "Stressed agents creating shadow PII leaks", text: "During the 35% surge, agents copy‑pasted transcripts into unapproved scratchpads because switching between legacy CRM and Lighthouse took 45 seconds." },
    { icon: "repeat", title: "\"Paper deflection\" reopen loop", text: "Aggressive bot deflection closed tickets prematurely; customers opened twice as many follow‑ups 48 hours later, inflating Room 4's volume spike." },
  ],
  vendorKV: [
    ["Diagnosis", "Apex's MSA bills per human seat; Lighthouse's 40% AI target threatens over 30% of Apex account revenue at renewal. Punitive threats trigger slow‑walking; incentive realignment fixes delay and adoption."],
    ["Options", "(A) Immediate termination — rejected (10‑week capacity cliff, −$4.8M). (B) Unconditional renewal — rejected (rewards failure). (C) Conditional renewal hold + gainshare restructure — selected."],
    ["Leverage", "Freeze the $14.0M two‑year renewal signature; $500K SLA liquidated damages in escrow; Backup Vendor B on 10% shadow traffic."],
    ["The deal", "≥ 98.5% SLA for 14 consecutive days + dedicated W2 migration engineers at zero T&M markup; 30% of renewal value moves to Tier‑2 AI‑exception handling + 15% gainshare when co‑pilot usage on Apex floors exceeds 30%."],
    ["Walk‑away (BATNA)", "SLA below 96.0% at Day 14 or refusal of co‑pilot KPIs → forfeit escrow, 6‑month wind‑down on Wave 1 only, Wave 2 awarded to Backup Vendor B."],
  ],
  privacyOptions: [
    { name: "1 — Total global freeze", desc: "Halt Wave 1 pilot and all Wave 2 work until 100% of archives are scanned. Burns $240K+ / wk CoD in clean regions.", verdict: "Rejected", cls: "rejected" },
    { name: "2 — Proceed and patch live", desc: "Launch Wave 2 on current weights while filters are patched. GDPR fines up to 4% of turnover; prompt‑extraction risk.", verdict: "Hard rejected", cls: "hard" },
    { name: "3 — Segmented Red / Green containment gate", desc: "Quarantine tainted weights; five‑point binary CISO gate per region; clean regions deploy on v1.2, unverified regions run rules‑only triage. Preserves 75%+ of W2 velocity; −$1.0M buffer absorbs 14–21 day retrain.", verdict: "Selected (conditional Go)", cls: "selected" },
  ],
  gateCriteria: [
    "100% of the target region's training corpus scanned with 0.00% unmasked PII",
    "Automated real‑time ingestion NER / regex firewall live in production",
    "Tainted model weights cryptographically purged and verified via adversarial red‑team prompts",
    "Free‑text prompt guardrails active in the single‑pane UI",
    "DPO audit log signed",
  ],

  cadence: [
    { when: "Daily 09:00 UTC · 15 min", what: "Cross‑room standup", who: "Yagnesh Reddy", out: "Unblock dependency slips under 48 hours; track 14‑day PII and vendor cure burndowns" },
    { when: "Fri 12:00 UTC · 30 min", what: "Telemetry & benefits lock", who: "Varun Varma Nampally, Tiya Gupta", out: "Freeze weekly SSOT numbers (adoption, handle time, dual‑run burn, net savings)" },
    { when: "Thu 15:00 UTC · 45 min", what: "RAID & marketplace sync", who: "Vinayak Chauhan", out: "Close Give / Get trades; trigger Tier‑2 escalations; update risk burndown" },
    { when: "Alt. Wednesdays · 45 min", what: "Steering Committee", who: "Yash Runwal (for VP Chair)", out: "Ratify gate Go / No‑Go; approve shifts over $250K; sign the decision log" },
    { when: "Within 4h of trigger", what: "Red‑gate rapid triage", who: "Vinayak Chauhan, Yash Runwal", out: "Binary containment decision on PII exposure, SLA breach or queue meltdown" },
  ],
  ladder: [
    { tier: "Tier 1 · Workstream self‑heal", trigger: "Cost variance under $100K · non‑critical slip ≤ 3 days · local comms tweak", owner: "Room lead", sla: "48 hours" },
    { tier: "Tier 2 · PMO control tower", trigger: "Variance $100K–$250K · critical‑path slip 4–7 days · cross‑room deadlock · vendor SLA below 98.5% for 5 days", owner: "Yash + Vinayak (Finance co‑sign)", sla: "24 hours" },
    { tier: "Tier 3 · VP / SteerCo Chair", trigger: "Variance over $250K · wave slip over 7 days · ANY unmasked PII · MSA termination / renewal freeze", owner: "VP Chair (CISO lock on PII)", sla: "4 hours / next SteerCo" },
  ],
  decisions: [
    { id: "DEC‑001", when: "M6 W1", text: "Adopt $17.5M net hard P&L savings ($14M–$22M) as the sole Y1 baseline; move $12M retention to a Tier‑3 KPI", who: "VP / SteerCo Chair" },
    { id: "DEC‑002", when: "M6 W1", text: "Mandate 60‑day legacy CRM read‑only sunset per region after cutover (caps drag at −$2.0M vs −$3.5M)", who: "VP / SteerCo Chair" },
    { id: "DEC‑003", when: "M6 W2", text: "Hold Wave 2 cutover behind a binary 21‑day privacy (0.00% PII) and vendor (≥ 98.5% SLA) gate", who: "VP / SteerCo Chair + CISO" },
    { id: "DEC‑004", when: "M6 W2", text: "Freeze the $14.0M two‑year Apex renewal signature pending a 14‑day SLA cure and AI gainshare rider", who: "VP / SteerCo Chair" },
    { id: "DEC‑005", when: "M6 W2", text: "Enforce single global adoption comms sign‑off via Room 3 and Zaiyan M; halt local GM ad‑hoc memos", who: "VP / SteerCo Chair" },
    { id: "DEC‑006", when: "reserved", text: "Sponsor risk acceptance if the Wave 2 schedule is overridden (20% canary throttle, $1.0M hypercare reserve)", who: "VP / SteerCo Chair", reserved: true },
  ],
  charterKV: [
    ["Mission", "Unified program governance, financial and benefits integrity, cross‑room dependency orchestration and crisis trade‑off analysis across 12 regions and 5 workstreams over 18 months."],
    ["Success criteria", "(1) Single $17.5M Y1 baseline ratified · (2) zero production PII leaks · (3) blended Y1 adoption ≥ 24% (exit ≥ 35%) · (4) legacy CRM retired ≤ 60 days per wave · (5) CPI ≥ 0.95 against $40.0M."],
    ["Authorised", "Freeze metric definitions · reject un‑reconciled numbers · sequence cross‑room commitments · co‑authorise contingency transfers up to $250K with Finance."],
    ["Not authorised", "Override Room 1 statutory privacy holds · amend MSA liability caps without Legal."],
    ["Disagree & commit", "Bounded Early Launch counter‑offer: 2 PII‑clean English regions (28% of volume) next week; if overridden, DEC‑006 + 20% canary for Days 1–7 (auto‑rollback if reopen rate > 12%) + $1.0M hypercare reserve."],
  ],
  daci: [
    ["Benefits reconciliation & P&L rules", "Tiya Gupta, Yash Runwal", "VP / SteerCo Chair", "Finance, Product, Regional Ops Leads", "Rooms 1–4, 12 Regional GMs"],
    ["Wave 2 / Wave 3 Go/No‑Go cutover", "Yash Runwal", "VP / SteerCo Chair (CISO statutory sign‑off)", "Finance, Product, Regional Ops, Rooms 1–4", "12 Regional GMs & Site Leads"],
    ["Scope changes (> $250K or > 5‑day slip)", "Yagnesh Reddy, Urvi Ramekar", "VP / SteerCo Chair", "Product, Finance, Regional Ops Leads", "Rooms 1–4, Engineering"],
    ["Budget re‑baseline / 20% cut plan", "Urvi Ramekar, Yash Runwal", "VP / SteerCo Chair", "Finance, Product, Regional Ops Leads", "All rooms, Regional GMs"],
    ["Vendor SLA cure & renewal gate", "Yagnesh Reddy (with Room 2)", "VP / SteerCo Chair", "Room 2 Lead, Finance, Regional Ops", "Rooms 1, 3, 4, Regional GMs"],
    ["Governance cadence & KPI thresholds", "Vinayak Chauhan, Varun Varma Nampally", "VP / SteerCo Chair", "Finance, Product, Regional Ops Leads", "Rooms 1–4, Regional GMs"],
  ],

  stakeholders: [
    { name: "VP / SteerCo Chair", power: 3, interest: 3, stance: "Anxious champion", incentive: "Credible board‑level AI showcase, on time, zero regulatory scandal", move: "Pre‑wire 48h early with the $17.5M bridge and the 2‑region Bounded Early Launch option", color: "#1E2761" },
    { name: "Finance Lead", power: 3, interest: 2.9, stance: "Hard sceptic", incentive: "GAAP / P&L discipline; block phantom revenue; eyeing a 20% trim", move: "Adopt Finance's hard‑savings rule for Tier 1 ($17.5M); co‑key contingency release", color: "#B26A00" },
    { name: "Product Lead", power: 2.9, interest: 2, stance: "Defensive bull", incentive: "Defend the $45M case to protect AI roadmap and headcount", move: "Preserve $32.5M Y2 run‑rate; move $12M retention to a Tier‑3 cohort experiment", color: "#D93025" },
    { name: "Regional Ops Lead", power: 2.8, interest: 3, stance: "Burned‑out realist", incentive: "Survive the 35% surge; stop dual‑screen fatigue; protect SLAs", move: "Fund −$2.0M transition drag; ship single‑pane embed before the 60‑day clock", color: "#2D3A8C" },
    { name: "Room 1 Lead & CISO", power: 2.9, interest: 2.1, stance: "Protector (gate)", incentive: "Zero unmasked PII in model weights; avoid fines", move: "Segmented Red / Green gate: clean regions advance, tainted logs isolated", color: "#1E8E3E" },
    { name: "Room 2 Lead & Apex Exec", power: 2, interest: 2.8, stance: "Commercially conflicted", incentive: "Seat revenue at risk from AI deflection; wants 2‑year renewal", move: "Freeze $14M renewal until 14‑day cure; restructure 30% of fees to gainshare", color: "#7B1FA2" },
    { name: "Room 3 Lead (Marketing)", power: 2.1, interest: 2.9, stance: "Misaligned", incentive: "Hit 40% adoption KPI despite conflicting GM emails", move: "Single global message sign‑off; replace 2‑hour classes with in‑tool micro‑prompts", color: "#00838F" },
    { name: "12 Regional GMs (Room 4)", power: 1.9, interest: 3, stance: "Change‑fatigued", incentive: "Keep local handle‑time SLAs green; sceptical of central mandates", move: "Adoption league table; 60‑day SLA grace adjustment during cutover", color: "#5D4037" },
  ],
  comms: [
    ["VP / SteerCo Chair & functional VPs", "Bottom‑line RAG, single SSOT benefit figure, gate readiness, binary asks", "Five‑sentence exec email + one‑page decision dashboard", "Bi‑weekly (Monday before SteerCo)", "Zaiyan M, Yash Runwal"],
    ["Rooms 1–4 workstream leads", "Dependency burndown, blocker escalation, Friday telemetry lock", "Live dependency board + 15‑minute daily standup", "Daily + Thursday RAID (45 min)", "Yagnesh Reddy, Vinayak Chauhan"],
    ["12 Regional GMs & Ops site directors", "Single‑voice rollout readiness, adoption league table, 60‑day sunset clock", "Regional GM sync + standardised rollout playbook", "Bi‑weekly Thursdays", "Zaiyan M, Room 3 Lead"],
    ["2,500 support agents (internal & Apex)", "\"AI removes tier‑1 copy‑paste so you handle complex cases — one screen, safe PII rules\"", "In‑CRM 3‑minute nudges + 20‑minute shift huddles", "Weekly per wave", "Room 3, Room 4 Site Leads"],
    ["CISO, Legal, Data Protection Officers", "Forensic PII scan progress, redaction results, weight‑purge verification", "Written audit dossier & gate checklist", "Weekly until gate is Green", "Vinayak Chauhan, Room 1"],
  ],

  team: [
    { name: "Yash Runwal", ldap: "yashrunwal@", role: "Program Lead & DACI Driver", own: "Business Case, Charter, SteerCo presentation, accelerated‑launch protocol", color: "#1E2761" },
    { name: "Tiya Gupta", ldap: "tiyagupta@", role: "Benefits Realization Lead", own: "Benefits Plan — three‑number reconciliation, taxonomy, SSOT bridge, realisation schedule", color: "#B26A00" },
    { name: "Urvi Ramekar", ldap: "urvir@", role: "Finance & Budget Lead", own: "Budget — range budgeting, scenario costing, 20% cut trade‑off memo", color: "#1E8E3E" },
    { name: "Varun Varma Nampally", ldap: "varunnampally@", role: "Data, Metrics & Dashboard Lead", own: "Telemetry SSOT architecture, vanity‑metric audit, executive decision dashboard", color: "#2D3A8C" },
    { name: "Vinayak Chauhan", ldap: "vinayakchauhan@", role: "Governance & RAID Lead", own: "Governance Framework, RAID register, pre‑mortem, privacy Go/No‑Go gate", color: "#D93025" },
    { name: "Yagnesh Reddy", ldap: "yagneshreddy@", role: "Dependencies & Integration Lead", own: "Scope Statement, WBS, Roadmap, dependency marketplace, vendor recovery", color: "#00838F" },
    { name: "Zaiyan M", ldap: "zaiyan@", role: "Stakeholder & Communications Lead", own: "Stakeholder Register, war‑gaming scripts, communication plan, executive status update", color: "#7B1FA2" },
  ],
};

/* ============================================================================
   Rendering helpers
   ========================================================================== */
const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
const RAG = { RED: "#D93025", AMBER: "#F29900", GREEN: "#1E8E3E" };
const NAVY = "#1E2761", INDIGO = "#2D3A8C", AMBERC = "#F29900", GOLD = "#FFC857", GREY = "#C6C5D0";
const money = (v) => `$${Number(v).toFixed(1)}M`;

const ragBadge = (rag, extra = "") => {
  const icon = { up: "trending_up", flat: "trending_flat", down: "trending_down" }[extra] || "";
  return `<span class="rag rag--${rag.toLowerCase()}">${rag}${icon ? `<span class="material-symbols-rounded">${icon}</span>` : ""}</span>`;
};

Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim() || "Google Sans Text, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = "#45464F";
Chart.defaults.plugins.legend.labels.boxWidth = 12;
Chart.defaults.plugins.legend.labels.boxHeight = 12;
Chart.defaults.plugins.tooltip.backgroundColor = "#1B1B21";
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 10;

/* --- Overview --------------------------------------------------------------- */
function renderOverview() {
  const wrap = $("#kpi-cards");
  DATA.kpis.forEach(k => {
    wrap.appendChild(el("div", "kpi", `
      <span class="material-symbols-rounded kpi__icon">${k.icon}</span>
      <div class="kpi__label">${k.label}</div>
      <div class="kpi__value">${k.value}</div>
      <div class="kpi__delta">${k.delta}</div>`)).style.setProperty("--kpi-color", k.color);
  });

  new Chart($("#ch-runrate"), {
    type: "bar",
    data: { labels: DATA.runRate.labels, datasets: [{ data: DATA.runRate.values, backgroundColor: [GREY, INDIGO, NAVY], borderRadius: 8, barThickness: 46 }] },
    options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${money(c.raw)} / yr · ${DATA.runRate.perTicket[c.dataIndex]} per ticket` } } },
      scales: { y: { min: 100, max: 190, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, x: { grid: { display: false } } } },
  });

  new Chart($("#ch-adoption"), {
    type: "line",
    data: { labels: DATA.adoption.labels, datasets: [{ data: DATA.adoption.values, borderColor: INDIGO, backgroundColor: "rgba(45,58,140,.12)", fill: true, tension: .35, pointRadius: 5, pointBackgroundColor: [RAG.RED, AMBERC, AMBERC, RAG.GREEN], pointBorderColor: "#fff", pointBorderWidth: 2 }] },
    options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.raw}% weekly active co‑pilot usage` } } },
      scales: { y: { min: 0, max: 50, ticks: { callback: (v) => `${v}%` }, grid: { color: "#EEECF4" } }, x: { grid: { display: false }, ticks: { maxRotation: 0, font: { size: 10 } } } } },
  });

  const wv = $("#waves");
  DATA.waves.forEach(w => {
    wv.appendChild(el("div", "wave", `
      <div class="wave__label">${w.name}</div>
      <div class="wave__bar"><div class="wave__fill" style="width:${w.share}%;background:${w.color}">${w.share}% of tickets</div></div>
      <div class="wave__meta">${w.regions} · <b>${w.status}</b> · ${w.note}</div>`));
  });
}

/* --- Decision dashboard ----------------------------------------------------- */
function renderDashboard() {
  const counts = { RED: 0, AMBER: 0, GREEN: 0 };
  DATA.dashboard.forEach(d => counts[d.rag]++);
  $("#rag-summary").innerHTML = `
    <div class="rag-summary__item rag-summary__item--overall"><span class="material-symbols-rounded" style="font-size:34px;color:#F29900">flag</span><div><div class="rag-summary__count" style="color:#B26A00;font-size:22px">OVERALL: AMBER</div><div class="rag-summary__label">Path to Green defined — 21‑day gate</div></div></div>
    <div class="rag-summary__item rag-summary__item--red"><div class="rag-summary__count">${counts.RED}</div><div class="rag-summary__label"><b>RED</b> — adoption, PII, vendor SLA under 14–21 day containment</div></div>
    <div class="rag-summary__item rag-summary__item--amber"><div class="rag-summary__count">${counts.AMBER}</div><div class="rag-summary__label"><b>AMBER</b> — savings run‑rate and cost per ticket stabilising</div></div>
    <div class="rag-summary__item rag-summary__item--green"><div class="rag-summary__count">${counts.GREEN}</div><div class="rag-summary__label"><b>GREEN</b> — sunset clock and CPI on track</div></div>`;

  const tb = $("#kpi-table tbody");
  DATA.dashboard.forEach(d => {
    tb.appendChild(el("tr", "", `<td><b>${d.kpi}</b></td><td class="num muted">${d.base}</td><td class="num">${d.cur}</td><td class="num">${d.target}</td><td>${ragBadge(d.rag, d.trend)}</td><td>${d.trigger}</td>`));
  });
  const vt = $("#vanity-table tbody");
  DATA.vanity.forEach(r => vt.appendChild(el("tr", "", `<td class="muted">${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td>`)));
  const ag = $("#agreements");
  DATA.agreements.forEach(a => ag.appendChild(el("li", "", a)));
}

/* --- Benefits --------------------------------------------------------------- */
function renderBenefits() {
  // Waterfall as floating bars
  const wf = DATA.waterfall;
  const bars = wf.map(s => s.kind ? [0, s.total] : [s.total, s.total - s.delta]);
  new Chart($("#ch-waterfall"), {
    type: "bar",
    data: { labels: wf.map(s => s.axis), datasets: [{ data: bars, backgroundColor: wf.map(s => s.kind === "start" ? GREY : s.kind === "end" ? GOLD : RAG.RED), borderRadius: 6, barPercentage: .7 }] },
    options: { plugins: { legend: { display: false }, tooltip: { callbacks: { title: (items) => wf[items[0].dataIndex].label, label: (c) => { const s = wf[c.dataIndex]; return s.kind ? money(s.total) : `${s.delta > 0 ? "+" : "−"}${money(Math.abs(s.delta))} → running total ${money(s.total)}`; } } } },
      scales: { y: { min: 0, max: 50, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, x: { grid: { display: false }, ticks: { autoSkip: false, font: { size: 10 }, maxRotation: 0, callback(v) { const l = this.getLabelForValue(v); return l.length > 14 ? l.match(/.{1,14}(\s|$)/g) : l; } } } } },
  });

  new Chart($("#ch-claims"), {
    type: "bar",
    data: { labels: DATA.claims.labels, datasets: [{ data: DATA.claims.values, backgroundColor: [RAG.RED, AMBERC, INDIGO, GOLD], borderRadius: 8 }] },
    options: { indexAxis: "y", plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${money(c.raw)} / yr claimed` } } },
      scales: { x: { min: 0, max: 50, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, y: { grid: { display: false } } } },
  });

  new Chart($("#ch-taxonomy"), {
    type: "doughnut",
    data: { labels: DATA.taxonomy.map(t => t.tier), datasets: [{ data: DATA.taxonomy.map(t => t.value), backgroundColor: DATA.taxonomy.map(t => t.color), borderWidth: 2 }] },
    options: { cutout: "62%", plugins: { legend: { position: "right", labels: { font: { size: 10.5 } } }, tooltip: { callbacks: { label: (c) => `${c.label}: ${money(c.raw)}` } } } },
  });

  new Chart($("#ch-bands"), {
    type: "bar",
    data: { labels: DATA.bands.map(b => b.band), datasets: [
      { label: "Year 1 net hard P&L", data: DATA.bands.map(b => b.y1), backgroundColor: [INDIGO, GOLD, INDIGO], borderRadius: 6 },
      { label: "Year 2 annualised run‑rate", data: DATA.bands.map(b => b.y2), backgroundColor: ["rgba(45,58,140,.35)", "rgba(255,200,87,.45)", "rgba(45,58,140,.35)"], borderRadius: 6 }] },
    options: { plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${money(c.raw)}` } } },
      scales: { y: { min: 0, max: 40, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, x: { grid: { display: false } } } },
  });
  $("#band-notes").innerHTML = DATA.bands.map(b => `<div><b>${b.band} · ${money(b.y1)} Y1 / ${money(b.y2)} Y2</b>${b.note}</div>`).join("");

  new Chart($("#ch-curve"), {
    data: { labels: DATA.curve.labels, datasets: [
      { type: "bar", label: "Realised in quarter", data: DATA.curve.realised, backgroundColor: DATA.curve.labels.map((_, i) => i < 4 ? INDIGO : GOLD), borderRadius: 6, yAxisID: "y" },
      { type: "line", label: "Cumulative (Year 1)", data: DATA.curve.cumulative, spanGaps: false, borderColor: AMBERC, backgroundColor: AMBERC, tension: .3, pointRadius: 4, yAxisID: "y1" }] },
    options: { plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${money(c.raw)}${c.dataIndex === 3 && c.datasetIndex === 1 ? " — Year‑1 commitment" : c.dataIndex === 5 ? " — Year‑2 exit run‑rate $32.5M / yr" : ""}` } } },
      scales: { y: { min: 0, max: 10, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" }, title: { display: true, text: "Quarter ($M)" } },
        y1: { position: "right", min: 0, max: 36, ticks: { callback: (v) => `$${v}M` }, grid: { display: false }, title: { display: true, text: "Cumulative ($M)" } }, x: { grid: { display: false } } } },
  });

  const dt = $("#diag-table tbody");
  DATA.diagnosis.forEach(r => dt.appendChild(el("tr", "", `<td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td style="background:var(--md-secondary-container)"><b>${r[4]}</b></td>`)));
}

/* --- Budget ----------------------------------------------------------------- */
function renderBudget() {
  const b = DATA.budget;
  new Chart($("#ch-budget"), {
    type: "bar",
    data: { labels: b.categories, datasets: [
      { label: `P10 lean (${money(b.totals.p10)})`, data: b.p10, backgroundColor: "rgba(30,142,62,.75)", borderRadius: 4 },
      { label: `P50 baseline (${money(b.totals.p50)})`, data: b.p50, backgroundColor: NAVY, borderRadius: 4 },
      { label: `P90 stress (${money(b.totals.p90)})`, data: b.p90, backgroundColor: "rgba(217,48,37,.8)", borderRadius: 4 }] },
    options: { indexAxis: "y", plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label.split(" (")[0]}: ${money(c.raw)}` } } },
      scales: { x: { ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, y: { grid: { display: false }, ticks: { font: { size: 11 }, callback(v) { const l = this.getLabelForValue(v); return l.length > 28 ? l.match(/.{1,28}(\s|$)/g) : l; } } } } },
  });

  new Chart($("#ch-burn"), {
    type: "doughnut",
    data: { labels: ["Spent M1–M6", "Remaining M7–M18"], datasets: [{ data: [b.totals.spent, b.totals.remaining], backgroundColor: [AMBERC, NAVY], borderWidth: 2 }] },
    options: { cutout: "68%", plugins: { legend: { position: "right" }, tooltip: { callbacks: { label: (c) => `${c.label}: ${money(c.raw)}` } } } },
  });
  $("#burn-stats").innerHTML = `<div><b>${b.burn.cpi}</b><span>CPI (target ≥ 0.95)</span></div><div><b>${b.burn.m1_6}</b><span>Burn M1–M6</span></div><div><b>${b.burn.m7_18}</b><span>Burn M7–M18</span></div>`;

  new Chart($("#ch-scenarios"), {
    type: "bar",
    data: { labels: ["A · Stage‑gated (P50)", "B · Unmitigated (P90)", "C · 20% austerity"], datasets: [
      { label: "18‑month cost", data: DATA.scenarios.map(s => s.cost), backgroundColor: GREY, borderRadius: 4 },
      { label: "Y1 net benefit", data: DATA.scenarios.map(s => s.y1), backgroundColor: INDIGO, borderRadius: 4 },
      { label: "Y2 run‑rate", data: DATA.scenarios.map(s => s.y2), backgroundColor: GOLD, borderRadius: 4 }] },
    options: { plugins: { legend: { labels: { font: { size: 10.5 } } }, tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${money(c.raw)}` } } },
      scales: { y: { min: 0, max: 50, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, x: { grid: { display: false }, ticks: { font: { size: 10.5 } } } } },
  });

  new Chart($("#ch-cuts"), {
    type: "bar",
    data: { labels: DATA.cuts.map(c => c.lever), datasets: [
      { label: "Budget saved ($M)", data: DATA.cuts.map(c => c.budget), backgroundColor: RAG.GREEN, borderRadius: 4 },
      { label: "Y1 benefit given up ($M)", data: DATA.cuts.map(c => c.benefit), backgroundColor: RAG.RED, borderRadius: 4 }] },
    options: { indexAxis: "y", plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${money(c.raw)}` } } },
      scales: { x: { min: 0, max: 4, ticks: { callback: (v) => `$${v}M` }, grid: { color: "#EEECF4" } }, y: { grid: { display: false }, ticks: { font: { size: 10.5 }, callback(v) { const l = this.getLabelForValue(v); return l.length > 34 ? l.match(/.{1,34}(\s|$)/g) : l; } } } } },
  });

  const st = $("#scenario-table tbody");
  DATA.scenarios.forEach(s => st.appendChild(el("tr", s.rec ? "rec-row" : "", `<td><b>${s.name}</b></td><td class="num">${money(s.cost)}</td><td class="num">${money(s.y1)}<br><span class="muted">(${s.y1band})</span></td><td class="num">${money(s.y2)} / yr</td><td>${s.note}</td>`)));
}

/* --- Scope & roadmap -------------------------------------------------------- */
function renderScope() {
  const tierColor = { Must: RAG.RED, Should: AMBERC, Could: INDIGO };
  const sorted = [...DATA.scope].sort((a, b) => b.cod - a.cod);
  new Chart($("#ch-cod"), {
    type: "bar",
    data: { labels: sorted.map(s => `${s.tier.toUpperCase()} · ${s.item}`), datasets: [{ data: sorted.map(s => s.cod), backgroundColor: sorted.map(s => tierColor[s.tier]), borderRadius: 4 }] },
    options: { indexAxis: "y", plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `$${c.raw}K / wk cost of delay · est. cost ${money(sorted[c.dataIndex].cost)}` } } },
      scales: { x: { ticks: { callback: (v) => `$${v}K` }, grid: { color: "#EEECF4" } }, y: { grid: { display: false }, ticks: { font: { size: 10 }, callback(v) { const l = this.getLabelForValue(v); return l.length > 40 ? l.match(/.{1,40}(\s|$)/g) : l; } } } } },
  });
  new Chart($("#ch-cod-bubble"), {
    type: "bubble",
    data: { datasets: ["Must", "Should", "Could"].map(t => ({ label: `${t} have`, backgroundColor: tierColor[t] + "B3", borderColor: tierColor[t],
      data: DATA.scope.filter(s => s.tier === t).map(s => ({ x: s.cost, y: s.cod, r: 6 + s.cost * 1.6, item: s.item })) })) },
    options: { plugins: { tooltip: { callbacks: { label: (c) => `${c.raw.item}: ${money(c.raw.x)} · $${c.raw.y}K / wk` } } },
      scales: { x: { title: { display: true, text: "Estimated cost ($M)" }, min: 0, max: 14, grid: { color: "#EEECF4" } }, y: { title: { display: true, text: "Weekly cost of delay ($K)" }, min: 0, max: 700, grid: { color: "#EEECF4" } } } },
  });

  const rm = $("#roadmap");
  DATA.roadmap.forEach(h => {
    rm.appendChild(el("div", "horizon", `
      <div class="horizon__head" style="background:${h.color}"><small>${h.when}</small><b>${h.h} · ${h.title}</b></div>
      <div class="horizon__body">
        <div>${h.outcome}</div>
        <h4>Work executed</h4><ul>${h.work.map(w => `<li>${w}</li>`).join("")}</ul>
        <h4>Hard exit criteria</h4><ul>${h.exit.map(w => `<li>${w}</li>`).join("")}</ul>
        <div class="horizon__value">${h.value}</div>
      </div>`));
  });
  $("#scope-kv").innerHTML = DATA.scopeKV.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
}

/* --- WBS & dependencies ----------------------------------------------------- */
function renderWBS() {
  const w = $("#wbs-cards");
  DATA.wbs.forEach(s => w.appendChild(el("div", "wbs__card", `
    <div class="wbs__id">${s.id}</div><div class="wbs__name">${s.name}</div>
    <ul>${s.wps.map(x => `<li>${x}</li>`).join("")}</ul>
    <div class="wbs__deliv"><b>Deliverable:</b> ${s.deliv}</div>
    <div class="wbs__meta"><b>Owner:</b> ${s.owner}<br><b>Gate:</b> ${s.gate}</div>`)));
  const dt = $("#dep-table tbody");
  DATA.deps.forEach(r => dt.appendChild(el("tr", "", `<td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td class="num">${r[3]}</td><td class="muted">${r[4]}</td>`)));
}

/* --- RAID ------------------------------------------------------------------- */
function renderRAID() {
  const heat = $("#heat");
  const impacts = ["L", "M", "H"], probs = [{ k: "hi", lbl: "P ≥ 60%" }, { k: "mid", lbl: "P 45–59%" }, { k: "lo", lbl: "P < 45%" }];
  const bucket = (p) => p >= 60 ? "hi" : p >= 45 ? "mid" : "lo";
  const level = (pi, ii) => { const s = (3 - pi) + ii; return s >= 4 ? "h" : s >= 3 ? "m" : "l"; };
  heat.innerHTML = `<div class="heat__corner">Prob. ↓ / Impact →</div>` + impacts.map(i => `<div class="heat__axis">${{ L: "Low", M: "Medium", H: "High" }[i]}</div>`).join("");
  probs.forEach((p, pi) => {
    heat.appendChild(el("div", "heat__axis", p.lbl));
    impacts.forEach((imp, ii) => {
      const cell = el("div", `heat__cell heat__cell--${level(pi, ii)}`);
      DATA.raid.filter(r => r.type === "Risk" && bucket(r.p) === p.k && r.i === imp).forEach(r => cell.appendChild(el("span", "heat__tag", `${r.id} · ${r.short}`)));
      heat.appendChild(cell);
    });
  });
  heat.appendChild(el("div", "heat__foot", "Risks only (R‑01 P 60% × $1.5M · R‑02 P 50% × $8M · R‑03 P 45% × high). Issues I‑01…I‑04 are live and tracked in the register below."));

  $("#killers").innerHTML = DATA.killers.map(k => `<div class="killer"><span class="material-symbols-rounded">${k.icon}</span><div><b>${k.title}</b>${k.text}</div></div>`).join("");

  const rt = $("#raid-table tbody");
  DATA.raid.forEach(r => rt.appendChild(el("tr", "", `<td><b>${r.id}</b><br><span class="muted">${r.type}</span></td><td>${r.desc}</td><td>${ragBadge(r.rag)}<div class="muted" style="margin-top:4px;font-size:11.5px">${r.sev}</div></td><td>${r.mit}</td><td class="num">${r.owner}</td>`)));

  $("#vendor-kv").innerHTML = DATA.vendorKV.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
  $("#privacy-options").innerHTML = DATA.privacyOptions.map(o => `<div class="option option--${o.cls}"><div><b>${o.name}</b>${o.desc}</div><span class="rag rag--${o.cls === "selected" ? "green" : o.cls === "hard" ? "red" : "grey"}">${o.verdict}</span></div>`).join("");
  $("#gate-criteria").innerHTML = DATA.gateCriteria.map(g => `<li>${g}</li>`).join("");
}

/* --- Governance ------------------------------------------------------------- */
function renderGovernance() {
  $("#cadence").innerHTML = DATA.cadence.map(c => `<div class="cadence__row"><div class="cadence__when">${c.when}</div><div class="cadence__what"><b>${c.what} — ${c.who}</b><span>${c.out}</span></div></div>`).join("");
  $("#ladder").innerHTML = DATA.ladder.map((l, i) => `<div class="ladder__step ladder__step--${i + 1}"><div class="ladder__top"><div class="ladder__tier">${l.tier}</div><div class="ladder__sla">${l.sla}</div></div><div>${l.trigger}</div><div><b>Owner: ${l.owner}</b></div></div>`).join("");
  $("#declog").innerHTML = DATA.decisions.map(d => `<div class="tl ${d.reserved ? "tl--reserved" : ""}"><span class="tl__id">${d.id}</span> <span class="tl__meta">${d.when} · ${d.who}</span><div>${d.text}</div></div>`).join("");
  $("#charter-kv").innerHTML = DATA.charterKV.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
  const dt = $("#daci-table tbody");
  DATA.daci.forEach(r => dt.appendChild(el("tr", "", `<td><b>${r[0]}</b></td><td>${r[1]}</td><td><b>${r[2]}</b></td><td>${r[3]}</td><td class="muted">${r[4]}</td>`)));
}

/* --- Stakeholders ----------------------------------------------------------- */
function renderStakeholders() {
  new Chart($("#ch-stake"), {
    type: "bubble",
    data: { datasets: DATA.stakeholders.map(s => ({ label: s.name, data: [{ x: s.interest, y: s.power, r: 11 }], backgroundColor: s.color + "CC", borderColor: s.color })) },
    options: { plugins: { legend: { position: "bottom", labels: { font: { size: 10 } } }, tooltip: { callbacks: { label: (c) => `${c.dataset.label} — ${DATA.stakeholders[c.datasetIndex].stance}` } } },
      scales: { x: { min: 1.5, max: 3.3, title: { display: true, text: "Interest →" }, ticks: { callback: (v) => ({ 2: "Medium", 3: "High" }[v] || "") }, grid: { color: "#EEECF4" } },
        y: { min: 1.5, max: 3.3, title: { display: true, text: "Power →" }, ticks: { callback: (v) => ({ 2: "Medium", 3: "High" }[v] || "") }, grid: { color: "#EEECF4" } } } },
  });
  const st = $("#stake-table tbody");
  DATA.stakeholders.forEach(s => st.appendChild(el("tr", "", `<td><b>${s.name}</b></td><td><span class="rag rag--grey" style="background:${s.color}22;color:${s.color}">${s.stance}</span></td><td>${s.incentive}</td><td>${s.move}</td>`)));
  const ct = $("#comms-table tbody");
  DATA.comms.forEach(r => ct.appendChild(el("tr", "", `<td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td class="num">${r[3]}</td><td class="muted">${r[4]}</td>`)));
}

/* --- Team ------------------------------------------------------------------- */
function renderTeam() {
  const t = $("#team-cards");
  DATA.team.forEach(m => t.appendChild(el("div", "member", `
    <div class="avatar" style="background:${m.color}">${m.name.split(" ").map(p => p[0]).slice(0, 2).join("")}</div>
    <div><div class="member__name">${m.name} <span class="muted" style="font-weight:400;font-size:12px">(${m.ldap})</span></div><div class="member__role">${m.role}</div><div class="member__own">${m.own}</div></div>`)));
}

/* --- Nav highlighting ------------------------------------------------------- */
function initNav() {
  const tabs = [...document.querySelectorAll("#nav-tabs .tab")];
  const sections = tabs.map(t => document.querySelector(t.getAttribute("href")));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { tabs.forEach(t => t.classList.toggle("is-active", t.getAttribute("href") === `#${e.target.id}`)); } });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => s && io.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
  renderOverview(); renderDashboard(); renderBenefits(); renderBudget(); renderScope();
  renderWBS(); renderRAID(); renderGovernance(); renderStakeholders(); renderTeam(); initNav();
});
