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
    website: z.string().url().optional().or(z.literal("")),
    arch: z.enum(["web_app", "ecommerce", "automation", "branding"]).optional(),
    budget: z.string().max(100).trim().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

const FALLBACK_EMAIL = "contact@lpwebstudio.co.za";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = await validateRequest(contactSchema, body);

        if (data.website && data.website.length > 0) {
            return NextResponse.json({ success: true });
        }

        const webhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            console.warn("[Contact API] N8N_WEBHOOK_URL not configured — submission logged only");
            console.log("[Contact API] Submission (unsent):", {
                name: data.name,
                email: data.email,
                arch: data.arch,
                budget: data.budget,
            });
            return NextResponse.json(
                {
                    success: false,
                    error: `The contact form is temporarily unavailable. Please email ${FALLBACK_EMAIL} directly and we'll reply within 24 hours.`,
                },
                { status: 503 }
            );
        }

        try {
            const webhookResponse = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    arch: data.arch,
                    budget: data.budget,
                }),
            });

            if (!webhookResponse.ok) {
                throw new Error(`Webhook returned ${webhookResponse.status}`);
            }
        } catch (webhookError) {
            console.error("[Contact API] Webhook delivery failed:", webhookError);
            return NextResponse.json(
                {
                    success: false,
                    error: `We couldn't deliver your message right now. Please email ${FALLBACK_EMAIL} directly and we'll reply within 24 hours.`,
                },
                { status: 502 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been received. We'll be in touch within 24 hours.",
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error && error.message.startsWith("Validation failed")) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 422 }
            );
        }

        console.error("[Contact API] Unexpected error:", error);
        return NextResponse.json(
            { success: false, error: "An unexpected error occurred. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
