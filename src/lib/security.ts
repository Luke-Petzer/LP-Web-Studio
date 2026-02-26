import "server-only";

import { z } from "zod";

/**
 * Generic Zod validation function for Zero-Trust API routes.
 * ALL API inputs MUST pass through this function.
 */
export async function validateRequest<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): Promise<T> {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new Error(`Validation failed: ${result.error.message}`);
    }
    return result.data;
}

/**
 * Turnstile verification stub.
 * ⚠️ Replace with real Cloudflare API call in production.
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.warn("TURNSTILE_SECRET_KEY not set — skipping verification");
        return true;
    }

    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        }
    );

    const result = await response.json();
    return result.success === true;
}
