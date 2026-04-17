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
