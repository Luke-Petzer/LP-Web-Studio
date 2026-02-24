import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest } from "@/lib/security";

/**
 * Zero-Trust Contact API Route
 * Protocol §5: All API routes MUST use Zod schema validation.
 * Edge Runtime: cpt1 (Cape Town) — Protocol §7
 */
export const runtime = "edge";

// ─── Zod Schema ────────────────────────────────────────────────────────────
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
        .trim()
        .optional(),
    website: z.string().url().optional().or(z.literal("")), // honeypot-style optional field
});

export type ContactPayload = z.infer<typeof contactSchema>;

// ─── POST Handler ──────────────────────────────────────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Zero-Trust: validate all input through Zod
        const data = await validateRequest(contactSchema, body);

        // ── Honeypot check (bot trap) ──────────────────────────────────────
        if (data.website && data.website.length > 0) {
            // Silently accept but do nothing — bot submitted the honeypot field
            return NextResponse.json({ success: true });
        }

        // ── TODO: Wire up email provider (Resend / Nodemailer / Supabase) ──
        // Example with Resend:
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: 'LP Web Studio <noreply@lpwebstudio.co.za>',
        //   to: 'luke@lpwebstudio.co.za',
        //   subject: `New enquiry from ${data.name}`,
        //   html: `<p>${data.message}</p>`,
        // });

        console.log("[Contact API] New submission:", {
            name: data.name,
            email: data.email,
        });

        return NextResponse.json(
            { success: true, message: "Your message has been received. We'll be in touch within 24 hours." },
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

// ─── Method Guard ──────────────────────────────────────────────────────────
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
