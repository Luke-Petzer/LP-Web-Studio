import { NextRequest, NextResponse } from "next/server";

/**
 * Security headers proxy function.
 * ⚠️ Per Manifest: Use proxy.ts, NOT middleware.ts
 */
export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
    );
    response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://challenges.cloudflare.com"
    );

    // Geo-routing for South Africa (POPIA/GDPR compliance)
    const country = request.headers.get("x-vercel-ip-country") || "ZA";
    response.headers.set(
        "x-compliance-standard",
        country === "ZA" ? "POPIA" : "GDPR"
    );
    response.headers.set("x-deployment-region", "af-south-1");

    return response;
}
