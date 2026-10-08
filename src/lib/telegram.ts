/**
 * Pure helpers for the contact-form Telegram alert (see
 * src/app/api/contact/route.ts).
 *
 * Deliberately has NO imports (not even `server-only`) so it can be unit-tested
 * with plain `node --test`. Anything that ends up in a log line goes through
 * here, and nothing here ever echoes the bot token or chat id back.
 */

export type TelegramEnv = {
    TELEGRAM_BOT_TOKEN?: string;
    TELEGRAM_CHAT_ID?: string;
};

export type TelegramConfig =
    | { state: "ready"; token: string; chatId: string }
    // Neither variable set: the owner hasn't created the bot. Skip silently.
    | { state: "disabled" }
    // Exactly one set: a half-configured alert that can never send. Worth a log line.
    | { state: "partial"; missing: "TELEGRAM_BOT_TOKEN" | "TELEGRAM_CHAT_ID" };

export function readTelegramConfig(env: TelegramEnv): TelegramConfig {
    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;
    if (token && chatId) return { state: "ready", token, chatId };
    if (!token && !chatId) return { state: "disabled" };
    return {
        state: "partial",
        missing: token ? "TELEGRAM_CHAT_ID" : "TELEGRAM_BOT_TOKEN",
    };
}

const MAX_LOGGED_LENGTH = 200;
// Secrets shorter than this are not scrubbed: replacing e.g. "1" everywhere
// would garble the message and a real token / chat id is far longer.
const MIN_SECRET_LENGTH = 4;

/** Strips control characters, scrubs any of `secrets` (replaced with
 *  "[redacted]"), and caps the length. Defence in depth: Telegram's own error
 *  descriptions don't echo credentials, but runtime fetch errors sometimes
 *  include the request URL, which contains the bot token. */
export function redactSecrets(text: string, secrets: readonly string[] = []): string {
    let out = text.replace(/[\u0000-\u001f\u007f]+/g, " ");
    for (const secret of secrets) {
        if (secret && secret.length >= MIN_SECRET_LENGTH) {
            out = out.split(secret).join("[redacted]");
        }
    }
    out = out.trim();
    return out.length > MAX_LOGGED_LENGTH ? `${out.slice(0, MAX_LOGGED_LENGTH)}…` : out;
}

function telegramDescription(body: unknown): string | undefined {
    if (body && typeof body === "object" && "description" in body) {
        const description = (body as { description?: unknown }).description;
        if (typeof description === "string" && description.trim()) return description;
    }
    return undefined;
}

function telegramHint(status: number, description: string | undefined): string | undefined {
    if (status === 401) return "bot token rejected; check TELEGRAM_BOT_TOKEN";
    if (status === 404) return "bot token malformed or revoked; check TELEGRAM_BOT_TOKEN";
    if (status === 403) {
        return "bot was blocked by, or never started by, that chat; open the bot in Telegram and press Start";
    }
    if (status === 400 && description && /chat not found/i.test(description)) {
        return "check TELEGRAM_CHAT_ID";
    }
    if (status === 429) return "rate limited by Telegram";
    return undefined;
}

/** One-line, log-safe explanation of a non-2xx Telegram Bot API response.
 *  `body` is the parsed JSON (or null if it wasn't JSON). Telegram answers like
 *  `{ ok: false, error_code: 400, description: "Bad Request: chat not found" }`. */
export function describeTelegramFailure(
    status: number,
    body: unknown,
    secrets: readonly string[] = []
): string {
    const description = telegramDescription(body);
    const base = description ? redactSecrets(description, secrets) : "(no description)";
    const hint = telegramHint(status, description);
    return hint ? `${base} (${hint})` : base;
}
