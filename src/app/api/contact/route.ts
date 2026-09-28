import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest } from "@/lib/security";

export const runtime = "edge";

const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be under 100 characters")
        .trim(),
    email: z
        .string()
        .email("Please provide a valid email address")
        .max(254, "Email address is too long")
        .toLowerCase(),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must be under 2000 characters")
        .trim(),
    // Honeypot — a real off-screen field in ContactDrawer.tsx. Any value at all
    // (not just a URL) means it was filled by something that isn't a human, so
    // this is deliberately permissive rather than `.url()`.
    website: z.string().max(200).optional(),
    // Time-trap — ms between the drawer opening and this submit. Optional only
    // so a malformed/missing value fails closed (treated as "too fast" below)
    // rather than failing the whole request.
    elapsedMs: z.number().nonnegative().optional(),
    // Must stay in sync with ARCH_OPTIONS in ContactDrawer.tsx.
    // `.nullish()` because the drawer posts `arch: null` when no chip is picked.
    arch: z
        .enum([
            "ordering_portal",
            "client_platform",
            "automation",
            "mobile_app",
            "other",
        ])
        .nullish(),
    budget: z.string().max(100).trim().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

const WHATSAPP_URL = "https://wa.me/27673852286";
const FALLBACK_EMAIL = "contact@lpwebstudio.co.za";
const FALLBACK_PHONE = "+27 67 385 2286";
const MIN_ELAPSED_MS = 1500;
const RPC_TIMEOUT_MS = 5000;
const TELEGRAM_TIMEOUT_MS = 3000;

// lp-os's Supabase project. The publishable key is public by design: anon has
// no table access at all, only execute on this one RPC (see migration
// 015_contact_enquiries — validates, rate-limits, inserts, done server-side).
const LP_OS_SUPABASE_URL =
    process.env.LP_OS_SUPABASE_URL || "https://hawmuhrzegxkjsejdulq.supabase.co";
const LP_OS_SUPABASE_PUBLISHABLE_KEY =
    process.env.LP_OS_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_IT1Uv9ErXIGC7CeB5T_AIQ_V1K6ZrfJ";

const FALLBACK_MESSAGE =
    `We couldn't deliver your message right now. Please reach us directly: ` +
    `WhatsApp ${WHATSAPP_URL}, email ${FALLBACK_EMAIL}, or call ${FALLBACK_PHONE}.`;

const SUCCESS_MESSAGE = "Your message has been received. We'll be in touch within 24 hours.";

function fakeSuccess() {
    // Honeypot / time-trap hit: behave exactly like a real success to the
    // caller (bots watch for a differing response), but nothing is written
    // and nobody is notified.
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
}

function invalidFieldMessage(code: string): string {
    switch (code) {
        case "invalid_name":
            return "Please enter a valid name (2–100 characters).";
        case "invalid_email":
            return "Please provide a valid email address.";
        case "invalid_message":
            return "Your message should be between 10 and 2000 characters.";
        default:
            return "Please check your details and try again.";
    }
}

/** Best-effort Telegram ping. Never throws — a failure here must never change
 *  the response already promised to the visitor. Silently skipped if the two
 *  env vars aren't set (owner hasn't created the bot yet). */
async function notifyTelegram(data: {
    name: string;
    email: string;
    arch?: string | null;
    budget?: string;
    message: string;
}): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;

    const summaryLines = [
        "New contact-form enquiry",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Arch: ${data.arch ?? "(not specified)"}`,
        `Budget: ${data.budget ?? "(not specified)"}`,
        `Message: ${data.message.slice(0, 500)}`,
        "Board task created.",
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: summaryLines.join("\n"),
            }),
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeout);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = await validateRequest(contactSchema, body);

        // Honeypot: filled → fake success, write nothing, notify nobody.
        if (data.website && data.website.length > 0) {
            console.warn("[Contact API] honeypot triggered — no RPC call made");
            return fakeSuccess();
        }

        // Time-trap: too fast to be a human filling four fields.
        // Only trap when a timing was actually sent. A missing value (e.g. a
        // visitor still running the pre-deploy bundle) must never be treated
        // as spam - silently dropping a real enquiry is the bug being fixed.
        if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_ELAPSED_MS) {
            console.warn(
                `[Contact API] time-trap triggered (elapsedMs=${data.elapsedMs ?? "missing"}) — no RPC call made`
            );
            return fakeSuccess();
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), RPC_TIMEOUT_MS);

        let rpcResponse: Response;
        try {
            rpcResponse = await fetch(
                `${LP_OS_SUPABASE_URL}/rest/v1/rpc/submit_contact_enquiry`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: LP_OS_SUPABASE_PUBLISHABLE_KEY,
                    },
                    body: JSON.stringify({
                        p_name: data.name,
                        p_email: data.email,
                        p_message: data.message,
                        p_arch: data.arch ?? null,
                        p_budget: data.budget ?? null,
                        p_user_agent: request.headers.get("user-agent") ?? null,
                    }),
                    signal: controller.signal,
                }
            );
        } catch (networkError) {
            console.error(
                "[Contact API] RPC network error:",
                networkError instanceof Error ? networkError.message : "unknown"
            );
            return NextResponse.json(
                { success: false, error: FALLBACK_MESSAGE },
                { status: 502 }
            );
        } finally {
            clearTimeout(timeout);
        }

        if (!rpcResponse.ok) {
            const errBody: unknown = await rpcResponse.json().catch(() => null);
            const rpcMessage =
                errBody && typeof errBody === "object" && "message" in errBody &&
                typeof (errBody as { message?: unknown }).message === "string"
                    ? (errBody as { message: string }).message
                    : undefined;

            if (rpcMessage === "rate_limited") {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "You've sent a few messages already — please wait a few minutes, or WhatsApp us.",
                    },
                    { status: 429 }
                );
            }

            if (rpcMessage && rpcMessage.startsWith("invalid_")) {
                return NextResponse.json(
                    { success: false, error: invalidFieldMessage(rpcMessage) },
                    { status: 400 }
                );
            }

            // "busy" (global rate limit) or any other/unrecognised DB error.
            console.error(
                "[Contact API] RPC error:",
                rpcResponse.status,
                rpcMessage ?? "(no message)"
            );
            return NextResponse.json(
                { success: false, error: FALLBACK_MESSAGE },
                { status: 502 }
            );
        }

        const newId: unknown = await rpcResponse.json().catch(() => null);
        if (!newId || typeof newId !== "string") {
            // Never report success unless the RPC actually returned an id.
            console.error("[Contact API] RPC returned no id on a 2xx response");
            return NextResponse.json(
                { success: false, error: FALLBACK_MESSAGE },
                { status: 502 }
            );
        }

        // Best-effort Telegram ping. Bounded and swallowed — never affects the
        // response below, which is already a confirmed, durable success.
        try {
            await notifyTelegram({
                name: data.name,
                email: data.email,
                arch: data.arch,
                budget: data.budget,
                message: data.message,
            });
        } catch (telegramError) {
            console.error(
                "[Contact API] Telegram notify failed:",
                telegramError instanceof Error ? telegramError.message : "unknown"
            );
        }

        return NextResponse.json(
            // Identical to fakeSuccess(): a bot must not be able to tell a
            // honeypot/time-trap response from a real one (no id leaked).
            { success: true, message: SUCCESS_MESSAGE },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error && error.message.startsWith("Validation failed")) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 422 }
            );
        }

        console.error(
            "[Contact API] Unexpected error:",
            error instanceof Error ? error.message : "unknown"
        );
        return NextResponse.json(
            { success: false, error: FALLBACK_MESSAGE },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
