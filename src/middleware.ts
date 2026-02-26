import { NextResponse, type NextRequest } from "next/server";

/**
 * Sovereign Security Middleware
 * Enforces CSP, HSTS, and all mandatory security headers on every response.
 * Protocol §5: Zero Trust API — Mandatory Headers
 */
export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // ─── Content Security Policy ───────────────────────────────────────────
    // Strict CSP: only allow resources from self + trusted CDNs
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-inline/eval needed for Next.js dev; tighten with nonce in prod
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https:",
        "connect-src 'self' https://challenges.cloudflare.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests",
    ].join("; ");

    // ─── Mandatory Security Headers ────────────────────────────────────────
    response.headers.set("Content-Security-Policy", csp);
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
    );
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
    );
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );

    return response;
}

export const config = {
    // Apply to all routes except static files and Next.js internals
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
    ],
};
