import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const auditSchema = z.object({
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
    url: z
        .string()
        .min(1, "Website URL is required")
        .max(2048, "URL is too long")
        .trim(),
});

const FALLBACK_EMAIL = "contact@lpwebstudio.co.za";

function normaliseUrl(input: string): string {
    const trimmed = input.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body." },
            { status: 400 }
        );
    }

    if (
        body &&
        typeof body === "object" &&
        "company_field" in body &&
        typeof (body as Record<string, unknown>).company_field === "string" &&
        ((body as Record<string, string>).company_field).trim().length > 0
    ) {
        return NextResponse.json({ success: true });
    }

    const parsed = auditSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            {
                success: false,
                error: parsed.error.errors[0]?.message ?? "Invalid submission.",
            },
            { status: 422 }
        );
    }

    const { name, email, url } = parsed.data;
    const normalisedUrl = normaliseUrl(url);

    try {
        new URL(normalisedUrl);
    } catch {
        return NextResponse.json(
            { success: false, error: "That doesn't look like a valid website address." },
            { status: 422 }
        );
    }

    // TODO: Replace with actual n8n webhook URL once n8n workflow is built
    const webhookUrl = "https://placeholder.lpwebstudio.co.za/api/audit-webhook";

    try {
        const webhookResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                url: normalisedUrl,
                timestamp: new Date().toISOString(),
            }),
        });
        if (!webhookResponse.ok) {
            throw new Error(`Webhook returned ${webhookResponse.status}`);
        }
    } catch (webhookError) {
        console.error("[Audit API] Webhook delivery failed:", webhookError);
        return NextResponse.json(
            {
                success: false,
                error: `We couldn't submit your audit request right now. Please email ${FALLBACK_EMAIL} with your URL and we'll send the report manually.`,
            },
            { status: 502 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message:
                "Audit requested. Your report will arrive within 1-2 business days.",
        },
        { status: 200 }
    );
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
