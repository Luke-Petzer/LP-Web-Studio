/**
 * Computed-style probe for the homepage "feel" pass (audit 2026-09).
 *
 * Reads getComputedStyle out of a real Chromium and asserts the motion
 * contract the pass is supposed to establish. Run it against BOTH `main`
 * and `feat/feel-home`: on the branch every assertion should PASS; on
 * `main` the motion assertions are expected to FAIL — that is the
 * "before" evidence.
 *
 *   node docs/feel-home/probe.mjs http://localhost:3100
 *
 * No package.json dependency is added: Playwright is resolved from the
 * local node_modules if present, else from the npx cache, else from
 * $PLAYWRIGHT_MODULE. Chromium must already be installed
 * (`npx playwright install chromium`).
 */

import { pathToFileURL } from "node:url";
import { readdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

/* ── Playwright resolution (no new deps) ─────────────────────────────── */
/**
 * Collect candidate `playwright` module paths, then LAUNCH through them in
 * order: a cached copy whose matching Chromium build is missing simply falls
 * through to the next candidate instead of killing the run.
 */
function playwrightCandidates() {
    const candidates = [];
    if (process.env.PLAYWRIGHT_MODULE) candidates.push(process.env.PLAYWRIGHT_MODULE);
    candidates.push(path.resolve(process.cwd(), "node_modules/playwright/index.js"));

    // npx cache: ~/.npm/_npx/<hash>/node_modules/playwright
    const npxRoot = path.join(homedir(), ".npm", "_npx");
    if (existsSync(npxRoot)) {
        for (const d of readdirSync(npxRoot)) {
            candidates.push(path.join(npxRoot, d, "node_modules", "playwright", "index.js"));
        }
    }
    return candidates.filter((c) => existsSync(c));
}

async function launchChromium() {
    const tried = [];
    for (const c of playwrightCandidates()) {
        try {
            const m = await import(pathToFileURL(c).href);
            const pw = m.chromium ? m : (m.default ?? m);
            if (!pw?.chromium) { tried.push(`${c} (no chromium export)`); continue; }
            const browser = await pw.chromium.launch();
            console.log(`# playwright: ${c}`);
            return browser;
        } catch (e) {
            tried.push(`${c} (${String(e.message).split("\n")[0]})`);
        }
    }
    try {
        const m = await import("playwright");
        const pw = m.chromium ? m : (m.default ?? m);
        return await pw.chromium.launch();
    } catch (e) { tried.push(`bare "playwright" (${String(e.message).split("\n")[0]})`); }

    console.error("Could not launch Chromium through any Playwright install. Tried:\n  " + tried.join("\n  "));
    console.error("Fix: `npx playwright install chromium`.");
    process.exit(2);
}

/* ── Tiny assertion harness ──────────────────────────────────────────── */
let failures = 0;
function check(name, ok, actual, expected) {
    const verdict = ok ? "PASS" : "FAIL";
    if (!ok) failures++;
    console.log(`${verdict}  ${name}`);
    console.log(`      expected: ${expected}`);
    console.log(`      actual:   ${actual}`);
}

const listed = (value) =>
    String(value ?? "").split(",").map((s) => s.trim()).filter(Boolean);

/** Read computed styles for the first match of `selector`; null if absent. */
const styleOf = (page, selector, props) =>
    page.evaluate(([sel, keys]) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el);
        const out = {};
        for (const k of keys) out[k] = cs[k];
        return out;
    }, [selector, props]);

/* ── Main ────────────────────────────────────────────────────────────── */
const base = process.argv[2];
if (!base) {
    console.error("usage: node docs/feel-home/probe.mjs <base-url>");
    process.exit(2);
}

const browser = await launchChromium();

console.log(`# feel-home computed-style probe`);
console.log(`# target: ${base}`);
console.log(`# ${new Date().toISOString()}`);
console.log("");

try {
    /* ---------- 1. Desktop, motion allowed ---------- */
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });

    console.log("## desktop 1440x900, motion allowed");

    for (const sel of [".btn-primary", ".btn-ghost"]) {
        const s = await styleOf(page, sel, ["transitionProperty", "transitionDuration"]);
        if (!s) {
            check(`${sel} transition-property includes transform`, false, "element not found", "an element matching " + sel);
            check(`${sel} transition-duration includes 0.12s`, false, "element not found", "an element matching " + sel);
            continue;
        }
        check(
            `${sel} transition-property includes "transform"`,
            listed(s.transitionProperty).includes("transform"),
            s.transitionProperty,
            'a list containing "transform"',
        );
        check(
            `${sel} transition-duration includes "0.12s"`,
            listed(s.transitionDuration).includes("0.12s"),
            s.transitionDuration,
            'a list containing "0.12s" (--dur-press)',
        );
    }

    {
        const s = await styleOf(page, ".panel-row", ["transitionDuration"]);
        check(
            `.panel-row transition-duration === "0.25s"`,
            !!s && s.transitionDuration === "0.25s",
            s ? s.transitionDuration : "element not found",
            '"0.25s" (--dur-panel)',
        );
    }

    {
        // The fixed site header (nav wrapper).
        const s = await styleOf(page, "header", ["transitionProperty", "transitionDuration", "position"]);
        const props = s ? listed(s.transitionProperty) : [];
        check(
            `header transition-property contains no "all" and no "top"`,
            !!s && !props.includes("all") && !props.includes("top"),
            s ? `${s.transitionProperty}  (position: ${s.position})` : "element not found",
            'an explicit property list without "all" or "top"',
        );
    }

    {
        const s = await styleOf(page, ".pressable", ["transitionProperty", "transitionDuration"]);
        check(
            `.pressable transition-property starts with "transform"`,
            !!s && listed(s.transitionProperty)[0] === "transform",
            s ? s.transitionProperty : "element not found (no .pressable in the DOM)",
            'a list whose first entry is "transform"',
        );
    }

    /* ---------- 2. Reduced motion ---------- */
    console.log("");
    console.log("## desktop 1440x900, prefers-reduced-motion: reduce");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload({ waitUntil: "networkidle" });

    const NEAR_ZERO = ["0.01ms", "0.00001s", "1e-05s"];
    {
        const s = await styleOf(page, ".panel-row", ["transitionDuration"]);
        const first = s ? listed(s.transitionDuration)[0] : null;
        check(
            `.panel-row transition-duration is near-zero under reduce`,
            !!first && NEAR_ZERO.includes(first),
            s ? s.transitionDuration : "element not found",
            NEAR_ZERO.join(" | "),
        );
    }
    {
        const s = await styleOf(page, ".animate-pulse", ["animationIterationCount", "animationDuration"]);
        check(
            `.animate-pulse animation-iteration-count === "1" under reduce`,
            !!s && s.animationIterationCount === "1",
            s ? `${s.animationIterationCount} (duration ${s.animationDuration})` : "element not found",
            '"1" (the pulse must stop, not just run fast)',
        );
    }
    {
        const sb = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
        check(
            `documentElement scroll-behavior !== "smooth" under reduce`,
            sb !== "smooth",
            sb,
            '"auto"',
        );
    }

    await ctx.close();

    /* ---------- 3. Touch context: hover must be gated ---------- */
    console.log("");
    console.log("## touch context 375x812 (hasTouch, isMobile) — hover gating");

    const tctx = await browser.newContext({
        hasTouch: true,
        isMobile: true,
        viewport: { width: 375, height: 812 },
    });
    const tpage = await tctx.newPage();
    await tpage.goto(base + "/", { waitUntil: "networkidle" });

    // .infra-card is CSS-only on this site; the homepage's hover-reactive
    // card is .dark-card (same audit finding, same @media (hover:hover) gate).
    const CARD = (await tpage.$(".infra-card")) ? ".infra-card" : ".dark-card";
    const PROPS = ["backgroundColor", "borderTopColor", "boxShadow"];
    const before = await styleOf(tpage, CARD, PROPS);

    if (!before) {
        check(`${CARD} hover is gated on touch`, false, "element not found", "a hover-reactive card in the DOM");
    } else {
        await tpage.hover(CARD);
        await tpage.waitForTimeout(400); // longer than --dur-hover
        const after = await styleOf(tpage, CARD, PROPS);
        const same = PROPS.every((p) => before[p] === after[p]);
        check(
            `${CARD} background/border/shadow unchanged after hover() on touch`,
            same,
            PROPS.map((p) => `${p}: ${before[p]} -> ${after[p]}`).join("\n                "),
            "identical values (hover behind @media (hover: hover) and (pointer: fine))",
        );
    }

    await tctx.close();
} finally {
    await browser.close();
}

console.log("");
console.log(failures === 0 ? "RESULT: all assertions PASS" : `RESULT: ${failures} assertion(s) FAILED`);
process.exit(failures === 0 ? 0 : 1);
