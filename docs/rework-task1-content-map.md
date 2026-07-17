# Task 1 — Content Inventory & Rewrite Map

Investigation only. No code changed. Maps every user-visible string on home / work / about / audit
(plus layout metadata, learn, not-found, error, privacy, sitemap/robots/manifest, and the shared
Nav / Footer / ContactDrawer / SubpageHero components that carry copy across pages) to a verdict:

- **KEEP** — copy is accurate to the new positioning, no change needed.
- **REWRITE** — copy sells the old website business or uses dev jargon; replacement drafted inline.
- **DELETE** — copy/section should be removed entirely (pricing tables, jargon labels with no
  systems-era equivalent).

Per the brief: no pricing below R35,000 anywhere; care plans "from R1,950/month"; no client-specific
numeric claims (no "R1.5m") until Luke flags permission; B2B ordering platform is the lead case
study; Gio/Cafe Crave testimonial stays; voice is plain English, outcome-first, no dev jargon.

---

## 1. `src/app/layout.tsx` — global metadata (applies site-wide via template)

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `layout.tsx:36` `metadata.title.default` | "LP Web Studio \| Web Development & Automation Cape Town" | REWRITE | "LP Web Studio \| Custom Ordering Systems & Business Automation Cape Town" |
| `layout.tsx:37` `metadata.title.template` | "%s \| LP Web Studio" | KEEP | — |
| `layout.tsx:39-40` `metadata.description` | "LP Web Studio builds custom Next.js websites and n8n automation systems for Cape Town businesses. Hand-coded, no WordPress, guaranteed 90+ PageSpeed scores." | REWRITE | "LP Web Studio builds the systems that run your business — ordering portals, client platforms, and automations that replace manual admin. Custom-built for Cape Town and South African businesses." |
| `layout.tsx:41-52` `metadata.keywords` array | "web developer Cape Town", "custom website Cape Town", "Next.js developer South Africa", "n8n automation Cape Town", "fast website Cape Town", "website speed optimisation Cape Town", "business automation South Africa", "custom web application Cape Town", "WhatsApp lead capture website", "React developer Cape Town" | REWRITE | `["custom ordering system South Africa", "B2B client portal", "business automation Cape Town", "custom web application Cape Town", "ordering portal developer South Africa", "replace WhatsApp orders with a system", "client portal development Cape Town", "business systems developer South Africa", "n8n automation Cape Town", "custom software Cape Town"]` |
| `layout.tsx:79-80` OG title/description | same as above | REWRITE | mirror the new title/description |
| `layout.tsx:86` OG image alt | "LP Web Studio - High-Performance Web Architecture" | REWRITE | "LP Web Studio — Custom Ordering Systems & Business Automation" |
| `layout.tsx:92-94` Twitter card title/description | same pattern | REWRITE | mirror new title/description |

---

## 2. `src/app/page.tsx` — homepage

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `page.tsx:22` title | "LP Web Studio \| Custom Websites & Automation Systems Cape Town" | REWRITE | "LP Web Studio \| Ordering Systems, Client Portals & Business Automation" |
| `page.tsx:23,26` description (x2, meta + OG) | "We build high-performance Next.js websites and automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed, real results." | REWRITE | "We build the systems that run your business — ordering portals, client platforms, and automations that replace manual admin. Custom builds from R35,000." |
| `page.tsx:32-33` FAQ 1 Q | "What does a custom website cost in Cape Town?" | DELETE | replaced by systems FAQ (see below) |
| `page.tsx:33` FAQ 1 A | "...starter 1-page website costs R5,500... R12,500... R21,500." | DELETE | pricing structure no longer exists |
| `page.tsx:36-37` FAQ 2 | "How long does a website take to build?" / "1-2 weeks... 2-6 weeks..." | REWRITE | Q: "How long does a system take to build?" A: "Most custom systems take 4-8 weeks from discovery call to launch, depending on scope — ordering portals and client platforms are usually on the longer end, single automations on the shorter end. You'll get a firm timeline after the discovery call." |
| `page.tsx:40-41` FAQ 3 | "Do you work with businesses outside Cape Town?" / "Yes. We work with businesses across South Africa and internationally..." | KEEP | — |
| `page.tsx:44-45` FAQ 4 | "What industries do you work with?" / "...manufacturing, trade services, hospitality, and B2B companies." | REWRITE | A: "Any business drowning in manual admin — wholesalers and distributors taking orders over WhatsApp, trade and hospitality businesses juggling spreadsheets, and B2B companies that need a client portal instead of email chains." |
| `page.tsx:48-49` FAQ 5 | "What makes LP Web Studio different..." / "...hand-coded in Next.js, comes with a 90+ PageSpeed guarantee, and you own the code outright..." | REWRITE | Q: "What does a system cost?" A: "Custom systems start at R35,000. Ongoing care plans start at R1,950/month for updates, monitoring, and support after launch. You'll get an exact quote after a free discovery call." (Per handoff Task 2 spec — this replaces the "what makes us different" framing with the cost FAQ the brief calls for.) |
| — (new FAQ needed per Task 2 brief) | n/a | REWRITE (add) | Q: "Do I own the system?" A: "Yes. Every system we build is yours outright — full code ownership, no lock-in, no monthly licence fees to keep using what you paid for." |
| — (new FAQ needed) | n/a | REWRITE (add) | Q: "What happens after launch?" A: "You can go it alone, or move onto a care plan from R1,950/month — we handle updates, monitoring, and changes so the system keeps running without you thinking about it." |

Note: the brief for Task 2 explicitly names 4 FAQ topics (cost, timeline, ownership, after-launch).
Current homepage has 5 FAQs; recommend landing on 5-6 total covering: cost, timeline, industries/fit,
ownership, after-launch, remote-friendliness. Final count is Task 2's call — flagged here so the
map has drafted copy ready.

Section-by-section (home is a composition of organisms — see component tables below for the actual
strings; `page.tsx` itself only carries metadata + FAQ data + the section order, which stays KEEP).

---

## 3. `src/components/organisms/HeroSection.tsx` + `src/components/molecules/HeroContent.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `HeroContent.tsx:26` eyebrow | "Established MMXXIV" | KEEP | — (harmless brand flourish, not website-era language) |
| `HeroContent.tsx:33-35` H1 | "Custom Websites & Web Platforms **That Work.**" | REWRITE | "Systems That Run **Your Business.**" (or per Task 2 spec: hero should be outcome-led, subline names ordering portals / client platforms / automation) |
| `HeroContent.tsx:45` CTA 1 | "See Our Work" (→ `/work`) | KEEP (label ok, but consider "See the platform in action" per handoff Task 2 spec if it should point at the demo instead of `/work`) | If repointing to demo: "See the Platform in Action" → `NEXT_PUBLIC_DEMO_URL` placeholder. If keeping as portfolio link: KEEP as-is. **Flagged for Luke — see Decisions Needed.** |
| `HeroContent.tsx:51` CTA 2 | "Get Started" (opens drawer) | REWRITE | "Book a Discovery Call" (matches handoff's named CTA) |
| `HeroContent.tsx:61` glass descriptor | "We design and build custom websites and web platforms for Cape Town businesses. From standalone websites to full ordering systems — built to your exact requirements." | REWRITE | "We build ordering portals, client platforms, and automations that replace manual admin — custom systems built to how your business actually runs." |
| `HeroContent.tsx:68-70` pillars | "01 Infrastructure / 02 Automation / 03 Scalability" | REWRITE | "01 Ordering Portals / 02 Client Platforms / 03 Automation" (mirrors the one-line positioning: "ordering portals, client platforms, and automations") |

---

## 4. `src/components/organisms/MetricsBanner.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `MetricsBanner.tsx:2` | "100% / Custom Built" | KEEP | — |
| `MetricsBanner.tsx:3` | "Next.js / & React" | REWRITE | Stack-badge language the brief explicitly kills ("stack badges all die"). Replace with an outcome metric, e.g. "Zero / Manual Order Entry" |
| `MetricsBanner.tsx:4` | "Cape Town / Based" | KEEP | — |
| `MetricsBanner.tsx:5` | "Yours. / Client-Owned Code" | KEEP | — (ownership is a genuine differentiator, not jargon) |

Note: this banner previously read "90+/100 / Google PageSpeed Guarantee" per STATUS.md Batch 3, but
current file shows 4 different metrics ("100%", "Next.js", "Cape Town", "Yours."). The PageSpeed
metric is not present in the current homepage banner at all — it lives only in `AboutPageContent.tsx`
now. Flagging the PageSpeed guarantee's fate as a Decision Needed (see bottom).

---

## 5. `src/components/organisms/CoreInfrastructure.tsx` — "Web Development & Automation Services"

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `CoreInfrastructure.tsx:229` H2 | "Web Development & Automation Services" | REWRITE | "What We Build" |
| `CoreInfrastructure.tsx:231` subhead | "Proprietary methodologies engineered for scale and absolute structural integrity." | REWRITE | Dev-jargon filler, no concrete meaning. Delete or replace with: "Three outcomes, one system: orders without admin, one source of truth, automations while you sleep." (ties directly to the handoff's named outcome blocks) |
| `CoreInfrastructure.tsx:235` label | "01 — Capabilities" | KEEP | — |
| `CoreInfrastructure.tsx:19-20` Card 1 title/body | "Custom\nBackends" / "Custom backend logic built around how your business operates. No off-the-shelf limitations, no vendor lock-in." | REWRITE | Per Task 2 spec, this whole 4-card grid becomes 3 outcome blocks. Card 1 → "Orders Without Admin" / "Customers place orders through a portal, not a WhatsApp thread. No re-typing, no lost messages, no spreadsheet." |
| `CoreInfrastructure.tsx:27-28` Card 2 title/body | "Precision\nUI" / "Interfaces built for clarity and speed. Clean, purposeful design that your team picks up without training." | REWRITE | → "One Source of Truth" / "Stock, pricing, and orders live in one place your whole team can see — not scattered across chats and paper." |
| `CoreInfrastructure.tsx:35-36` Card 3 title/body | "Data\nStorage" / "Structured databases and file storage configured to your needs. Your data is accessible, exportable, and owned by you." | REWRITE | → "Automations While You Sleep" / "Orders route to the warehouse, invoices go out, and stock updates — automatically, without anyone touching a keyboard." |
| `CoreInfrastructure.tsx:43-44` Card 4 title/body | "Third-Party\nIntegrations" / "Connections to the tools your business already uses — payments, accounting, WhatsApp, email, and more — automated end to end." | DELETE (fold into 3-card structure) | 4th card collapses into the 3 above per Task 2 spec ("Replace capabilities jargon with 3 outcome blocks"). If a 4th is kept, reuse this copy — it's already jargon-free — but confirm with Task 2 executor whether grid becomes 3 or stays 4. **Flagged.** |

---

## 6. `src/components/organisms/ArchitecturalMethod.tsx` — "How We Build"

Marked "parked" / "user still thinking" in STATUS.md across multiple batches — treat as active
content until told otherwise; it renders on the homepage today.

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `ArchitecturalMethod.tsx:54` label | "02 — Execution" | KEEP | — |
| `ArchitecturalMethod.tsx:59` H2 | "How We Build" | KEEP | — |
| `ArchitecturalMethod.tsx:62` subhead | "A structured process from brief to launch. We scope carefully, build precisely, and deliver on time." | KEEP | — |
| `ArchitecturalMethod.tsx:4-6` Step 1 | "01 / Discover" / "Requirements & Scope" / "We start by understanding your business, your goals, and what you actually need. Every project begins with a clear scope and agreed deliverables — no surprises." | KEEP | — (already plain English, no jargon) |
| `ArchitecturalMethod.tsx:9-12` Step 2 | "02 / Build" / "Development & Testing" / "We build to the agreed scope using Next.js and modern tooling. Every feature is tested before it ships and you review progress throughout." | REWRITE | Drop the stack name per "no dev jargon" rule: "We build to the agreed scope and test everything before it ships. You review progress throughout — no surprises at delivery." |
| `ArchitecturalMethod.tsx:14-18` Step 3 | "03 / Optimise" / "Launch & Support" / "After launch we monitor performance, address any issues, and stay available for updates. Your site should get better over time, not stale." | REWRITE | "your site" → "your system": "After launch we monitor performance, fix anything that comes up, and stay available for updates. Your system should get better over time — that's what the care plan is for." (ties to care-plan upsell) |

---

## 7. `src/components/organisms/ScaleBanner.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `ScaleBanner.tsx:21` H2 | "Ready to Scale?" | KEEP | — |
| `ScaleBanner.tsx:5` pills | "Scalable", "Secure", "Automated" | KEEP | — |
| `ScaleBanner.tsx:32` CTA | "Start a Project" (opens drawer) | KEEP | — |

---

## 8. `src/components/organisms/TestimonialSection.tsx` — Gio / Cafe Crave

Per handoff: **keep verbatim, move higher on the page** (Task 2 concern, not a copy change).

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `TestimonialSection.tsx:10` label | "04 — Validation" | KEEP (renumber if section order changes in Task 2) | — |
| `TestimonialSection.tsx:21-26` quote | "Luke has been exceptional from start to finish..." | KEEP | — |
| `TestimonialSection.tsx:36,38` attribution | "Gio" / "Owner, Cafe Crave" | KEEP | — |

---

## 9. `src/components/organisms/B2BPlatform.tsx` — lead case study (currently mid-page, becomes teaser)

Per handoff: keep the story, make it the lead case-study teaser, no numeric claims until flagged.

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `B2BPlatform.tsx:4` Card 1 label | "01 / The Bottleneck" | KEEP | — |
| `B2BPlatform.tsx:5` Card 1 title | "Growth is bottlenecked by manual admin and scattered communication." | KEEP | — |
| `B2BPlatform.tsx:6` Card 1 body | "Scattered WhatsApp messages, manual spreadsheet entry, and outdated PDF price lists cause costly human errors and limit your ability to scale." | KEEP | — (matches handoff's "WhatsApp + spreadsheet chaos" framing exactly) |
| `B2BPlatform.tsx:9` Card 2 title | "A centralized, role-based ordering portal built for your exact operational workflow." | KEEP | — |
| `B2BPlatform.tsx:10` Card 2 body | "Clients get secure logins with custom pricing. They browse a live, synced catalog and place orders through an automated 24/7 self-serve engine." | KEEP | — |
| `B2BPlatform.tsx:14` Card 3 title | "End-to-end automation. Orders sync instantly with zero human touchpoints." | KEEP | — |
| `B2BPlatform.tsx:15` Card 3 body | "The moment a client clicks \"Submit,\" the order routes instantly to the warehouse and accounting software without a single staff member touching a keyboard. **Process 10x the volume with 100% accuracy.**" | REWRITE (partial) | "10x the volume" / "100% accuracy" are unverified numeric claims not covered by the R1.5m flag but same risk category. Replace with non-numeric outcome: "The moment a client clicks 'Submit,' the order routes instantly to the warehouse and accounting software — no staff member touches a keyboard, and nothing gets lost in a chat thread." |
| `B2BPlatform.tsx:77` label | "RECENT WORK" | REWRITE | "FEATURED CASE STUDY" or "01 — The Platform" (signal it's the lead proof asset per Task 2/3, not one of several) |
| `B2BPlatform.tsx:83` H2 | "B2B Ordering Platform" | KEEP | — |
| `B2BPlatform.tsx:90` accent line | "Zero Manual Entry" | KEEP | — (non-numeric, on-brand outcome statement) |
| `B2BPlatform.tsx:19,95-97` tech pills | "PostgreSQL", "Next.js", "n8n", "WhatsApp API" | DELETE | Explicit "stack badges all die" rule in the brief. Remove the pill row entirely, or replace with a single "See the platform in action" CTA to `NEXT_PUBLIC_DEMO_URL`. |

---

## 10. `src/components/organisms/FounderSection.tsx` (homepage quote block, distinct from `/about`)

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `FounderSection.tsx:33-37` quote | "You don't need another generic website. You need an engine. My focus is entirely on engineering the backend systems, client portals, and automations that let you step out of the daily admin and actually scale your operations." | KEEP | — (already systems-first language, matches new positioning almost exactly — genuinely ahead of the rest of the site) |
| `FounderSection.tsx:41,43` attribution | "Luke Petzer" / "Lead Architect" | KEEP | — |

---

## 11. `src/components/organisms/FAQSection.tsx` (homepage FAQ — duplicate data source of `page.tsx` homepageFaqs)

Same 5 Q&As as `page.tsx:30-51`, verbatim duplicated in this component's local `faqs` array
(`FAQSection.tsx:5-26`). **This is the duplication the CLAUDE.md flags as a problem** — two copies
of the same FAQ content that must be kept in sync (one drives the JSON-LD schema, the other drives
the visible accordion). Recommend Task 2 executor consolidate to one source of truth (export from
`page.tsx` and import into `FAQSection.tsx`, or move both to a shared `lib/faq-data.ts`) — flagged
below in Decisions Needed / as an implementation note for Task 2, not a copy verdict.

Verdicts identical to Section 2 above (`page.tsx` FAQ table) — same 5 Q&As, same replacements apply
verbatim to `FAQSection.tsx:6-25`.

---

## 12. `src/components/organisms/LatestWriting.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `LatestWriting.tsx:27` eyebrow | "Knowledge Base" | KEEP | — |
| `LatestWriting.tsx:33` H2 | "LATEST WRITING." | KEEP | — |
| `LatestWriting.tsx:40` link | "All articles →" | KEEP | — |
| Article title/description | pulled from `content/knowledge-base/*.md` frontmatter | Out of scope for Task 1 page/component sweep, but flagged: both existing articles ("Next.js vs WordPress", "Why PageSpeed Matters") are pure website-era content. Task 5 adds 2 new systems-focused stubs per the handoff; **the 2 existing articles need a KEEP/REWRITE/DELETE decision too** — not covered by Task 1's file list (home/work/about/audit) but will surface on the homepage "Latest Writing" and `/learn` regardless. **Flagged as Decision Needed.** |

---

## 13. `src/components/organisms/FinalCTA.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `FinalCTA.tsx:23` H2 | "Stop Managing. Start Building." | KEEP | — (already outcome-flavoured, works fine for systems positioning) |
| `FinalCTA.tsx:28-32` micro-timeline | "01 / Free Discovery Call → 02 / Scope & Proposal → 03 / Your System Is Built" | KEEP | — (already says "System" — ahead of the rest of the copy) |
| `FinalCTA.tsx:41` CTA 1 | "Start a Project" (opens drawer) | KEEP | — |
| `FinalCTA.tsx:49` CTA 2 | "Request Audit" (→ `/audit`) | KEEP pending Decision Needed on `/audit`'s fate (see bottom) | If `/audit` survives repositioning: KEEP. If cut: REWRITE to "Book a Discovery Call" or similar, pointing at the drawer. |

---

## 14. `src/components/organisms/Footer.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `Footer.tsx:15` copyright | "© 2025 LP Web Studio. All rights reserved." | REWRITE | Year is stale — current date is 2026-07-11. → "© 2026 LP Web Studio. All rights reserved." (mechanical fix, not a positioning issue, but genuinely wrong today) |
| `Footer.tsx:21-23` nav links | "Work", "About", "Privacy" | REWRITE (add) | Task 4 adds a `/products` page and nav gains "Products" — footer nav should get the same link for consistency: "Work", "Products", "About", "Privacy" |
| `Footer.tsx:37` Contact button | "Contact" (opens drawer) | KEEP | — |
| `Footer.tsx:46` status pill | "Systems Online" | KEEP | — (on-brand, no change needed) |

---

## 15. `src/components/organisms/Navigation.tsx` / `src/components/molecules/NavClient.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `NavClient.tsx:9` nav link | "Solutions" (→ `/work`) | KEEP | — (already systems-neutral wording) |
| `NavClient.tsx:10` nav link | "Infrastructure" (→ `/about`) | REWRITE | "About" — "Infrastructure" is dev-jargon framing for what is a founder/team page; plain English per voice rule |
| `NavClient.tsx:11` nav link | "Learn" (→ `/learn`) | KEEP | — |
| `NavClient.tsx:12` nav link | "Contact" (→ drawer) | KEEP | — |
| — (new, per Task 4) | n/a | REWRITE (add) | Add "Products" nav link → `/products`, positioned between "Solutions" and "About" |
| `NavClient.tsx:134` desktop CTA | "Get Started" | REWRITE | "Book a Discovery Call" (consistency with hero CTA rewrite) |
| `NavClient.tsx:185` mobile CTA | "Get Started" | REWRITE | "Book a Discovery Call" |

---

## 16. `src/components/organisms/ContactDrawer.tsx`

This is the biggest concentration of dev-jargon on the site — explicitly called out in the handoff.

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `ContactDrawer.tsx:188` eyebrow | "PROJECT INITIATION" | REWRITE | "GET IN TOUCH" |
| `ContactDrawer.tsx:191` H2 | "LET'S BUILD." | KEEP | — |
| `ContactDrawer.tsx:9-13` `ARCH_OPTIONS` | "WEB_APP / Custom build", "E_COMMERCE / Shop", "AUTOMATION / n8n pipelines", "BRANDING / Identity" | REWRITE | Per handoff Task 2: "Ordering portal / Client platform / Automation / Mobile app / Something else". Drop "E_COMMERCE" and "BRANDING" (not part of the current offering), add "Mobile app" and an open-ended "Something else" catch-all. |
| `ContactDrawer.tsx:226` field label | "ARCHITECTURE TYPE" | REWRITE | "WHAT DO YOU NEED?" |
| `ContactDrawer.tsx:261,279,296,312` field labels | "NAME", "EMAIL", "BUDGET", "MESSAGE" | KEEP | — (plain, fine as-is) |
| `ContactDrawer.tsx:302` budget placeholder | "e.g. R15,000 – R50,000" | REWRITE | Placeholder floor sits below the new R35,000 minimum — must not imply projects start under R35k. → "e.g. R35,000 – R100,000" |
| `ContactDrawer.tsx:214` success message | "MESSAGE RECEIVED." | KEEP | — |
| `ContactDrawer.tsx:217` success subtext | "Luke will review and respond within 24 hours." | KEEP | — |
| `ContactDrawer.tsx:356` submit button | "SEND MESSAGE" | KEEP | — |
| `ContactDrawer.tsx:367` footer label | "OR REACH US DIRECTLY" | KEEP | — |

---

## 17. `src/components/organisms/SubpageHero.tsx` (shared shell — copy comes from callers)

Component itself carries no hardcoded copy (all via props). Caller-site strings covered in their
respective page sections below (`/about`, `/work`, `/audit`, `/learn`).

---

## 18. `src/app/about/page.tsx` + `src/components/organisms/AboutPageContent.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `about/page.tsx:10` title | "About \| Cape Town Next.js Developer — Luke Petzer" | REWRITE | "About \| Luke Petzer, Systems Builder — Cape Town" |
| `about/page.tsx:11-12,19-20` description (x2) | "Luke Petzer is a Cape Town-based web developer and automation engineer. Custom Next.js builds, n8n pipelines, and 90+ PageSpeed scores guaranteed. No agencies, no bloat." | REWRITE | "Luke Petzer builds the ordering portals, client platforms, and automations that replace manual admin for South African businesses. Honours computer science background, ships production systems solo." |
| `about/page.tsx:31` SubpageHero title | "INFRASTRUCTURE" | REWRITE | "ABOUT" (matches the nav rename above; "Infrastructure" as a page identity is dev-jargon) |
| `about/page.tsx:32` SubpageHero subtitle | "ENGINEERED FOR PERFORMANCE" | REWRITE | "THE PERSON BUILDING YOUR SYSTEM" |
| `AboutPageContent.tsx:101` eyebrow | "SYSTEM_OPERATOR" | REWRITE | "FOUNDER" |
| `AboutPageContent.tsx:108` H2 | "THE ARCHITECT." | REWRITE | "THE BUILDER." (or keep "Architect" if Luke likes the branding — flagged as a light-touch call, not jargon in the same category as PROJECT INITIATION) |
| `AboutPageContent.tsx:114` name | "Luke Petzer" | KEEP | — |
| `AboutPageContent.tsx:118-124` bio | "I don't run a bloated agency. I'm a Cape Town-based web developer and automation engineer managing the entire stack — from hand-coded Next.js applications to n8n automation pipelines. When you work with LP Web Studio you speak directly to the person writing your code. No sales reps, no account managers, no outsourcing." | REWRITE | "I don't run a bloated agency. I build the systems that run your business — ordering portals, client platforms, and the automations that replace manual admin — end to end, solo. Honours computer science background, AI-accelerated delivery, and production systems shipped without a team behind me. When you work with LP Web Studio you speak directly to the person building your system. No sales reps, no account managers, no outsourcing." |
| `AboutPageContent.tsx:127` tag pills | "Next.js 15", "React", "n8n", "Vercel Edge", "Supabase", "Framer Motion" | DELETE | Stack badges — explicitly killed by the brief. Remove the pill row entirely. |
| `AboutPageContent.tsx:148` terminal window label | "architect.profile — zsh" | REWRITE (light touch) | Keep the terminal device (it's a nice bit of brand personality, not jargon per se) but align content below — see next rows. If "Architect" is dropped per H2 decision, rename to "founder.profile — zsh". |
| `AboutPageContent.tsx:156` terminal line | "Web Developer & Automation Engineer" | REWRITE | "Systems Builder" (matches `personSchema()` jobTitle too — see schema table below) |
| `AboutPageContent.tsx:160` terminal line | "Next.js · React · n8n · Vercel" | DELETE | Stack-badge language inside a "no dev jargon" rule; terminal device can stay but this line should go or become outcome-oriented, e.g. "Ordering portals · Client platforms · Automation" |
| `AboutPageContent.tsx:179` H2 | "THE_PHILOSOPHY" | KEEP | — (stylised but not incomprehensible jargon; matches site's visual language) |
| `AboutPageContent.tsx:184-186` quote | "Most agencies sell you a pre-packaged template and charge you a monthly fee to press 'update'. We build custom software." | KEEP | — (already systems-aligned, no website-package language) |
| `AboutPageContent.tsx:190-193` body | "I believe in hand-coded performance. No drag-and-drop page builders. No WordPress plugin vulnerabilities. Every site I build is custom Next.js code that scores 90+ on Google PageSpeed Insights — or I fix it until it does." | REWRITE | "site" language + heavy dev-jargon framing ("drag-and-drop page builders", "WordPress plugin vulnerabilities") sells against a business the studio no longer runs (competing with template sites). Replace: "I believe in building things properly. No templates, no page builders bolted onto a generic theme — every system is built for how your business actually operates, and built to last." |
| `AboutPageContent.tsx:203` label | "CORE STACK" | DELETE | Section 4 entire "Tech Stack" grid is stack badges — explicitly killed by the brief. |
| `AboutPageContent.tsx:208` H2 | "THE_ENGINE" | DELETE | see above |
| `AboutPageContent.tsx:212` intro | "The same stack powering enterprise applications, running your Cape Town business." | DELETE | see above |
| `AboutPageContent.tsx:34-67` `techStack` array (6 items: Next.js 15, Tailwind CSS, Vercel Edge Network, Supabase, n8n & Gemini 2.0, Generative Engine Optimization — incl. jokes like "The Ferrari of web frameworks") | entire array | DELETE | Whole section removed per "stack badges all die." If Luke wants a lightweight "how it's built" trust signal, replace with 2-3 outcome-oriented capability statements instead of named technologies — **flag as Decision Needed** if he wants something here at all. |
| `AboutPageContent.tsx:257` label | "THE CASE FOR WORKING TOGETHER" | KEEP | — |
| `AboutPageContent.tsx:262` H2 | "WHY_LP_WEB" | KEEP | — |
| `AboutPageContent.tsx:71-73` Reason 1 | "Direct Access" / "You speak to Luke Petzer — the developer actually building your system. Not a sales rep, not an account manager. Direct access means faster decisions and no miscommunication." | KEEP | — (already says "system") |
| `AboutPageContent.tsx:75-77` Reason 2 | "Code Ownership" / "Every line of code we write belongs to you. The GitHub repository is transferred to your account on delivery. No monthly retainer required to access your own site." | REWRITE | "your own site" → "your own system": "Every line of code we write belongs to you. The repository is transferred to your account on delivery. No monthly retainer required to access your own system." |
| `AboutPageContent.tsx:79-81` Reason 3 | "Speed Guarantee" / "Every website we build scores 90+ on Google PageSpeed Insights. If it doesn't, we optimise it until it does — at no extra cost. This is not a target. It is a guarantee." | Flagged — see Decisions Needed | "website" language throughout; whether the PageSpeed guarantee itself survives repositioning to systems (where "page speed" is a less central metric than for marketing sites) is genuinely ambiguous. If kept: reword to "Every system we build is optimised for speed — 90+ on Google PageSpeed Insights where it applies, no exceptions." If cut: replace this 3rd reason with something systems-specific, e.g. "Built to Last" / "You're not locked into a template that breaks when your business changes. Every system is built to grow with you." |
| `AboutPageContent.tsx:306` closing H2 | "READY TO DEPLOY?" | KEEP | — (works fine for systems too) |
| `AboutPageContent.tsx:309` closing subtext | "One engineer. Full stack. No account managers." | REWRITE | "Full stack" is dev-jargon. → "One engineer. Start to finish. No account managers." |
| `AboutPageContent.tsx:316` closing CTA | "INITIATE PROJECT" | REWRITE | "BOOK A DISCOVERY CALL" (consistency with nav/hero CTA renames) |

---

## 19. `src/app/work/page.tsx` + `src/components/organisms/WorkPageContent.tsx` + children

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `work/page.tsx:8` title | "Our Work \| Cape Town Web Development Portfolio" | REWRITE | "Case Studies \| Custom Ordering Systems & Client Platforms" |
| `work/page.tsx:9-10,17-18` description (x2) | "Case studies from LP Web Studio — custom React websites for Cape Town businesses including Cafe Crave and The Big Six. Real projects, real PageSpeed scores." | REWRITE | "How LP Web Studio replaces manual admin with real systems — including a B2B ordering platform live in production and the Cafe Crave rebuild." |
| `work/page.tsx:22-32` `cafeCraveSchema` JSON-LD | name/description mention "Custom React and Next.js website... 93/100 PageSpeed score", keywords "restaurant website Cape Town, cafe website, Next.js, React, Google Reviews integration" | KEEP schema mechanics, REWRITE keywords field | Cafe Crave itself is a legitimate website case study (not every case study needs to be a "system" — Cafe Crave was and remains a marketing site win, kept per brief). Keywords → "restaurant website Cape Town, cafe website, Google Reviews integration" (drop "Next.js, React" framework-name keyword stuffing, low search value and reads as dev-jargon) |
| `WorkPageContent.tsx:10-26` `cafeCrave` object | `ident: "CAFE CRAVE"`, `sector: "HOSPITALITY"`, `authority: "ELITE_TIER"`, `descriptionHeading: "THE_CONVERSION_ENGINE"`, full body copy | KEEP mostly — see below | — |
| `WorkPageContent.tsx:15` `authority: "ELITE_TIER"` | "ELITE_TIER" | DELETE | Meaningless self-graded label, pure dev-jargon with no real content. Drop the "Authority" metadata field from the card entirely, or replace with something concrete like the client's industry vertical (already covered by `sector`). |
| `WorkPageContent.tsx:20` description body | "...The result: a 93/100 PageSpeed score and a site that works as hard as the team behind the counter." | KEEP | — (Cafe Crave is a real, already-live, non-flagged case study; the 93/100 is their own verified live score, not a disputed client figure, and matches the STATUS.md-recorded schema. Not the same risk category as the B2B platform's pending "R1.5m" figure.) |
| `work/page.tsx` (missing) — B2B ordering platform case study | **Not present on `/work` at all today** — only lives in the homepage `B2BPlatform.tsx` component | REWRITE (add) | Per Task 3: `/work` needs to become case-study format with the B2B ordering platform as **Entry 1** (problem → build → outcome), Cafe Crave as Entry 2, and a placeholder Meridian-demo entry. This is a structural gap, not just a copy fix — flagged for Task 3, drafted copy source is the existing `B2BPlatform.tsx` cards (Section 9 above), reusable verbatim for the "problem" and "build" beats; "outcome" beat needs non-numeric language per the flag rule. |
| `WorkScrollReveal.tsx:7-9` | "Every project starts with a problem." / "Every solution leaves a mark." / "This is how we grew." | KEEP | — (voice-neutral, works for systems too) |
| `ChapterHook.tsx` usage in `WorkPageContent.tsx:38` | "Real foot traffic. Zero digital footprint." | KEEP | — (Cafe Crave-specific hook, accurate) |
| `WorkPageContent.tsx:33-34` SubpageHero | title "WORK", subtitle "SELECTED CLIENT ENGAGEMENTS" | KEEP | — |
| `WorkClosingCTA.tsx:15` H2 | "IS YOUR WEBSITE COSTING YOU CUSTOMERS?" | REWRITE | Website-centric framing, wrong business. → "IS MANUAL ADMIN COSTING YOU GROWTH?" |
| `WorkClosingCTA.tsx:19-20` body | "Every slow website is a lead that didn't convert. Every generic template is a client that chose someone else." | REWRITE | "Every order taken over WhatsApp is a mistake waiting to happen. Every manual spreadsheet is time you're not spending on the business." |
| `WorkClosingCTA.tsx:29` CTA 1 | "RUN FREE AUDIT" (→ `/audit`) | Flagged — see Decisions Needed on `/audit` | If `/audit` survives: KEEP. If cut: replace with "SEE THE PLATFORM" → demo link. |
| `WorkClosingCTA.tsx:36` CTA 2 | "INITIATE PROJECT" (opens drawer) | REWRITE | "BOOK A DISCOVERY CALL" |
| `ProjectSection.tsx:146-147` metadata labels | "PROJECT_IDENT" / "PERFORMANCE" | REWRITE | "PROJECT" / "SCORE" (plain English, same meaning) |
| `ProjectSection.tsx:174,180,186,195` field labels | "SECTOR" / "TIMELINE" / "STATUS" / "AUTHORITY" | REWRITE (drop AUTHORITY per above) | "SECTOR" / "TIMELINE" / "STATUS" — 3-field grid instead of 4 once "Authority" is deleted |
| `ProjectSection.tsx:205` tech pills | rendered from `stack: string[]` prop, e.g. "REACT", "NEXT.JS", "TAILWIND", "VERCEL" (Cafe Crave) | DELETE | Stack badges — kill per brief, same rule as `B2BPlatform.tsx` tags and `AboutPageContent.tsx` tech pills |
| `ProjectSection.tsx:219` CTA | "LAUNCH_EXPERIENCE" | REWRITE | "VIEW LIVE SITE" (plain English) |

---

## 20. `src/app/audit/page.tsx` + `src/components/organisms/AuditForm.tsx`

Entire page sells a standalone "free website audit" lead magnet — a website-era funnel. Its fate is
genuinely ambiguous (flagged below), so this table drafts REWRITE copy assuming it survives in some
form, while flagging the keep/cut decision separately.

| Location | Current text | Verdict | Replacement (if kept) |
|---|---|---|---|
| `audit/page.tsx:8` title | "Free Website Audit \| LP Web Studio" | REWRITE (if kept) | "Free Systems Audit \| LP Web Studio" — or reframe entirely as "is WhatsApp/spreadsheets costing you" audit rather than a PageSpeed audit |
| `audit/page.tsx:9-10,17-18` description | "Free 5-point website audit — page speed, mobile, SEO, accessibility. Cape Town web development. Report emailed within 1-2 business days." | REWRITE (if kept) | Needs a different 5 areas if reframed toward operations/admin rather than website performance — **Decision Needed**, drafting deferred |
| `audit/page.tsx:51-52` SubpageHero | title "AUDIT", subtitle "FREE PERFORMANCE & VISIBILITY REPORT" | REWRITE (if kept) | subtitle → "FREE OPERATIONS AUDIT" if reframed |
| `audit/page.tsx:24-43` `AUDIT_AREAS` | "PAGE_SPEED" (Core Web Vitals...), "MOBILE", "SEO", "ACCESSIBILITY", "DELIVERY" | REWRITE (if kept) or DELETE (if cut) | These 5 areas are 100% website-performance metrics — none map to "ordering system / client platform / automation" positioning. If the page survives, it needs a full area reset (e.g. "Where's the manual work happening," "What's the WhatsApp/spreadsheet cost," "What would a portal replace") — this is a content redesign, not a line-edit, so exact copy is deferred to whoever owns the keep/cut call. |
| `audit/page.tsx:98` H2 | "REQUEST YOUR AUDIT." | KEEP (if kept) | — |
| `AuditForm.tsx:125` success heading | "AUDIT REQUESTED." | KEEP (if kept) | — |
| `AuditForm.tsx:135` success subtext | "Your report will arrive by email within 1-2 business days." | KEEP (if kept) | — |
| `AuditForm.tsx:238` submit button | "REQUEST AUDIT" | KEEP (if kept) | — |

---

## 21. `src/app/learn/page.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `learn/page.tsx:9` title | "Web Development Insights \| LP Web Studio" | REWRITE | "Systems & Automation Insights \| LP Web Studio" |
| `learn/page.tsx:11,19` description (x2) | "Practical guides on Next.js, website performance, and digital infrastructure for Cape Town businesses." | REWRITE | "Practical guides on ordering systems, business automation, and replacing manual admin — for Cape Town and South African businesses." |
| `learn/page.tsx:32` SubpageHero subtitle | "FIELD NOTES ON BUILDING FAST WEBSITES" | REWRITE | "FIELD NOTES ON BUILDING BUSINESS SYSTEMS" |
| `learn/page.tsx:41` label | "01 — FIELD NOTES" | KEEP | — |
| `learn/page.tsx:48` H2 | "RECENT WRITING." | KEEP | — |
| `learn/page.tsx:56-59` body | "Practical guides on Next.js, website performance, and digital infrastructure — written from the studio, for operators who care about shipping fast. No tutorials-for-tutorials-sake; every piece ties back to work we've shipped for clients." | REWRITE | "Practical guides on ordering systems, automation, and replacing manual admin — written from the studio, for operators who care about running a tighter business. No tutorials-for-tutorials-sake; every piece ties back to work we've shipped for clients." |

---

## 22. `src/app/learn/[slug]/page.tsx` (template — copy is per-article, not hardcoded here)

Marked in STATUS.md as blocked / pre-existing user WIP — **not modified**, per standing instruction
repeated across three prior batches. Static UI strings only:

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `[slug]/page.tsx:66-67` SubpageHero | title "LEARN", subtitle "FIELD NOTES FROM THE STUDIO" | KEEP | — (generic enough to survive either way) |
| `[slug]/page.tsx:89` label | "FIELD NOTE" | KEEP | — |
| `[slug]/page.tsx:117` prefix | "PUBLISHED" | KEEP | — |
| `[slug]/page.tsx:153` FAQ H2 | "Frequently Asked Questions." | KEEP | — |

Article body content itself (both existing knowledge-base `.md` files) is website-era and needs its
own pass — flagged in Decisions Needed, not drafted here since it's outside Task 1's file scope
(home/work/about/audit) and belongs to Task 5.

---

## 23. `src/app/not-found.tsx` / `src/app/error.tsx` / `src/app/privacy/page.tsx`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `not-found.tsx:30` eyebrow | "ERROR / 404" | KEEP | — |
| `not-found.tsx:39` H1 | "ROUTE NOT FOUND." | KEEP | — |
| `not-found.tsx:46-47` body | "The page you're looking for has moved, been archived, or never existed. Let's get you back to something real." | KEEP | — |
| `not-found.tsx:52` CTA | "Return home" | KEEP | — |
| `error.tsx:32` eyebrow | "SYSTEM / UNEXPECTED" | KEEP | — |
| `error.tsx:41` H1 | "SOMETHING WENT WRONG." | KEEP | — |
| `error.tsx:47-48` body | "An unexpected error interrupted this page. Try again, or head back to safer ground." | KEEP | — |
| `error.tsx:55,61` CTAs | "Try again" / "Return home" | KEEP | — |
| `privacy/page.tsx:7-8,15-16` metadata | "How LP Web Studio handles contact form data, analytics, and your privacy. Cape Town web development studio — no ad tracking, no third-party data sales." | REWRITE (light) | "web development studio" → "systems studio": "How LP Web Studio handles contact form data, analytics, and your privacy. Cape Town systems studio — no ad tracking, no third-party data sales." |
| `privacy/page.tsx:75-78` "THE STUDIO" body | "LP Web Studio is a Cape Town-based web development and automation studio operated by Luke Petzer. We build custom Next.js websites and n8n automation systems for South African businesses." | REWRITE | "LP Web Studio is a Cape Town-based systems studio operated by Luke Petzer. We build custom ordering platforms, client portals, and automation systems for South African businesses." |
| Rest of privacy sections (contact form, analytics, cookies, rights, changes) | — | KEEP | — (legal/procedural content, unaffected by positioning) |

---

## 24. `src/app/sitemap.ts` / `src/app/robots.ts` / `src/app/manifest.ts`

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| `sitemap.ts` route list | `/`, `/work`, `/about`, `/learn`, `/audit`, `/privacy` + `/learn/[slug]` | REWRITE (add) | Add `/products` once Task 4 ships. Priority/changefreq values are KEEP. `/audit` entry's fate depends on the Decision Needed below. |
| `robots.ts` | disallow `/api/`, `/_next/`; sitemap ref | KEEP | — (no copy, purely mechanical) |
| `manifest.ts:5` `name` | "LP Web Studio" | KEEP | — |
| `manifest.ts:6` `short_name` | "LP Web" | KEEP | — |
| `manifest.ts:8` `description` | "Custom Next.js websites and n8n automation systems for Cape Town businesses." | REWRITE | "Ordering systems, client platforms, and business automation for South African businesses." |

---

## 25. `public/llms.txt` (AI-citation file — outside the literal home/work/about/audit scope but

user/AI-visible metadata in the same spirit as sitemap/robots; flagging since it will contradict the
new positioning the moment Task 2 ships if left alone)

| Location | Current text | Verdict | Replacement |
|---|---|---|---|
| Services list | "Custom Next.js websites: R5,500 – R21,500 once-off" | DELETE | Old pricing tiers, directly contradicts the R35,000 floor rule |
| Services list | "n8n business automation and WhatsApp integration" / "B2B ordering portals and custom web applications" | KEEP (mostly) | Fold into a rewritten services block: "Custom ordering portals and client platforms (from R35,000)", "Business automation and WhatsApp-to-system migration", "Monthly care plans (from R1,950/month)" |
| Services list | "Performance audits and WordPress-to-Next.js migrations" | DELETE | Website-era service line no longer offered |
| Services list | "Guaranteed 90+ Google PageSpeed scores" | Flagged — see Decisions Needed | Same PageSpeed-guarantee ambiguity as `/about` |
| Portfolio | "Cafe Crave... 93/100 PageSpeed" / "The Big Six... 91/100" | KEEP Cafe Crave, REWRITE list | Add the B2B ordering platform as the lead portfolio entry once public; "The Big Six" does not appear anywhere else in the current live component tree (`WorkPageContent.tsx` only has Cafe Crave) — **flagged as a stale-content Decision Needed**, may be a dead/removed project reference. |

This file is a strong candidate to fold into Task 6's full-site sweep rather than Task 1/2, since it
duplicates the site's own metadata rather than being a page. Flagging its existence here so it isn't
missed.

---

## Counts

| Verdict | Count (approx., counting each table row as one item) |
|---|---|
| KEEP | 78 |
| REWRITE | 71 |
| DELETE | 16 |
| **Total items reviewed** | **165** |

(Counts are approximate — several rows bundle multiple related strings, e.g. FAQ arrays, tag pill
lists, or multi-field metadata objects, counted once per row rather than once per string.)

Roughly 43% of reviewed copy needs rewriting and another 10% needs outright deletion — over half the
site's current words sell the wrong business, concentrated in exactly the places the handoff called
out: `ContactDrawer.tsx` (PROJECT INITIATION / ARCHITECTURE TYPE / stack-flavoured budget
placeholder), `AboutPageContent.tsx` (entire Tech Stack section + hand-coded-performance
website-jargon block), `CoreInfrastructure.tsx` (4-card jargon grid → 3 outcome blocks), and every
FAQ/metadata string carrying R5,500/R12,500/R21,500 pricing.

---

## Decisions needed from Luke (max 5)

1. **Does `/audit` survive the repositioning, and if so, what does it audit?** The whole page,
   its 5-point framework (PAGE_SPEED / MOBILE / SEO / ACCESSIBILITY / DELIVERY), and its "free
   website audit" lead-magnet concept are pure website-era funnel mechanics. It's linked from
   `WorkClosingCTA`, `FinalCTA`, and the sitemap. Either it gets fully reframed around operational
   pain (WhatsApp chaos, spreadsheet cost, manual admin) with a new 5-area structure, or it gets
   cut and those 3 CTA slots point at "Book a Discovery Call" / the demo instead. This is the
   single biggest structural unknown blocking Task 2/3 CTA wiring.

2. **Does the "90+ PageSpeed Guarantee" survive, and where does it live?** It currently appears in
   `AboutPageContent.tsx` (Speed Guarantee reason + Philosophy section), `SchemaTemplates.ts`
   (`localBusinessSchema` description), and `llms.txt`. For a marketing site like Cafe Crave,
   PageSpeed is a legitimate, still-relevant metric. For a B2B ordering portal or client platform,
   page speed is a much smaller part of the value story than "does the order sync correctly" — the
   guarantee may need to be scoped to "website builds only" rather than presented as a universal
   claim, or dropped from the systems-positioned pages entirely.

3. **Is the R1.5m+ orders figure clearable now, or should Task 2/3 draft strictly non-numeric
   outcome copy?** This blocks the exact wording of the B2B case-study teaser and the new `/work`
   Entry 1. I've drafted non-numeric versions throughout this map per the "until Luke confirms
   permission" instruction, but confirming one way or the other now avoids a second copy pass
   later.

4. **What happens to the 2 existing `/learn` articles** ("Next.js vs WordPress" and "Why PageSpeed
   Matters")? Both are pure website-era content and will sit awkwardly next to the 2 new
   systems-focused stubs Task 5 adds. Options: rewrite their framing toward "systems vs.
   templates," unpublish them, or leave them as legacy website-service content with a caveat. Not
   in Task 1's literal file scope but they render on the homepage "Latest Writing" block regardless
   of what Task 2 ships.

5. **Does "The Big Six" project still exist anywhere?** It's referenced in `llms.txt` and in
   `STATUS.md`'s historical batch notes, but the live `WorkPageContent.tsx` only renders Cafe
   Crave — no Big Six data object exists in the current component tree. Either it was already
   quietly removed and `llms.txt` is stale, or there's a second case study that should be folded
   into the new `/work` case-study structure in Task 3. Worth a 30-second confirmation before Task
   3 finalizes the case-study list (B2B platform, Cafe Crave, lp-os, Meridian placeholder — does
   Big Six belong in that lineup too?).
