// Run with: npm test   (node's built-in runner; needs Node >= 22.18 or 23.6+
// for native TypeScript type stripping. No test dependency is installed.)
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
    describeTelegramFailure,
    readTelegramConfig,
    redactSecrets,
} from "./telegram.ts";

const TOKEN = "123456789:AAExampleFakeTokenValueForTests_abc";
const CHAT_ID = "-1001234567890";

describe("readTelegramConfig", () => {
    it("is ready when both are set", () => {
        assert.deepEqual(
            readTelegramConfig({ TELEGRAM_BOT_TOKEN: TOKEN, TELEGRAM_CHAT_ID: CHAT_ID }),
            { state: "ready", token: TOKEN, chatId: CHAT_ID }
        );
    });

    it("is silently disabled when neither is set (unset or empty)", () => {
        assert.deepEqual(readTelegramConfig({}), { state: "disabled" });
        assert.deepEqual(
            readTelegramConfig({ TELEGRAM_BOT_TOKEN: "", TELEGRAM_CHAT_ID: "" }),
            { state: "disabled" }
        );
    });

    it("flags a half-configured alert and names only the missing variable", () => {
        assert.deepEqual(readTelegramConfig({ TELEGRAM_BOT_TOKEN: TOKEN }), {
            state: "partial",
            missing: "TELEGRAM_CHAT_ID",
        });
        assert.deepEqual(readTelegramConfig({ TELEGRAM_CHAT_ID: CHAT_ID }), {
            state: "partial",
            missing: "TELEGRAM_BOT_TOKEN",
        });
    });
});

describe("describeTelegramFailure", () => {
    it("explains a malformed token (404)", () => {
        const out = describeTelegramFailure(404, {
            ok: false,
            error_code: 404,
            description: "Not Found",
        });
        assert.match(out, /^Not Found/);
        assert.match(out, /TELEGRAM_BOT_TOKEN/);
    });

    it("explains a rejected token (401)", () => {
        const out = describeTelegramFailure(401, {
            ok: false,
            error_code: 401,
            description: "Unauthorized",
        });
        assert.match(out, /^Unauthorized/);
        assert.match(out, /TELEGRAM_BOT_TOKEN/);
    });

    it("explains a wrong chat id (400 chat not found)", () => {
        const out = describeTelegramFailure(400, {
            ok: false,
            error_code: 400,
            description: "Bad Request: chat not found",
        });
        assert.match(out, /^Bad Request: chat not found/);
        assert.match(out, /TELEGRAM_CHAT_ID/);
    });

    it("explains a bot that was never started (403)", () => {
        const out = describeTelegramFailure(403, {
            ok: false,
            error_code: 403,
            description: "Forbidden: bot can't initiate conversation with a user",
        });
        assert.match(out, /^Forbidden/);
        assert.match(out, /press Start/);
    });

    it("does not blame the chat id for unrelated 400s", () => {
        const out = describeTelegramFailure(400, {
            ok: false,
            description: "Bad Request: message text is empty",
        });
        assert.equal(out, "Bad Request: message text is empty");
    });

    it("copes with a missing, non-JSON or odd body", () => {
        assert.equal(describeTelegramFailure(500, null), "(no description)");
        assert.equal(describeTelegramFailure(500, "<html>"), "(no description)");
        assert.equal(describeTelegramFailure(500, { description: 42 }), "(no description)");
        assert.equal(describeTelegramFailure(500, { description: "   " }), "(no description)");
        assert.match(describeTelegramFailure(401, undefined), /^\(no description\)/);
    });

    it("never echoes the token or chat id, even if the description contains them", () => {
        const out = describeTelegramFailure(
            400,
            { description: `Bad Request: chat ${CHAT_ID} not found via bot${TOKEN}` },
            [TOKEN, CHAT_ID]
        );
        assert.ok(!out.includes(TOKEN));
        assert.ok(!out.includes(CHAT_ID));
        assert.match(out, /\[redacted\]/);
    });

    it("caps very long descriptions", () => {
        const out = describeTelegramFailure(500, { description: "x".repeat(5000) });
        assert.ok(out.length <= 201);
    });
});

describe("redactSecrets", () => {
    it("scrubs every occurrence and strips control characters", () => {
        const out = redactSecrets(`fetch failed: https://api.telegram.org/bot${TOKEN}/sendMessage\nretry ${TOKEN}`, [
            TOKEN,
        ]);
        assert.ok(!out.includes(TOKEN));
        assert.ok(!out.includes("\n"));
        assert.equal(out.match(/\[redacted\]/g)?.length, 2);
    });

    it("leaves text alone for empty or very short secrets", () => {
        assert.equal(redactSecrets("a 1 b 1", ["", "1"]), "a 1 b 1");
    });
});
