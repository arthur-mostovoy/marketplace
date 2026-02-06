import crypto from "crypto";
import { cookies } from "next/headers";
import type { Role } from "./types";

const COOKIE_NAME = "session";

function base64url(input: Buffer | string) {
    const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
    return b.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlJson(obj: unknown) {
    return base64url(JSON.stringify(obj));
}

function sign(data: string, secret: string) {
    return base64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export type SessionPayload = {
    userId: string;
    role: Role;
    exp: number; // unix seconds
};

export function createSessionCookie(payload: Omit<SessionPayload, "exp">, days = 7) {
    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error("SESSION_SECRET is not set");

    const exp = Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
    const full: SessionPayload = { ...payload, exp };

    const body = base64urlJson(full);
    const sig = sign(body, secret);
    const token = `${body}.${sig}`;

    cookies().set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
}

export function clearSessionCookie() {
    cookies().set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSession(): SessionPayload | null {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error("SESSION_SECRET is not set");

    const [body, sig] = token.split(".");
    if (!body || !sig) return null;

    const expected = sign(body, secret);
    if (sig !== expected) return null;

    try {
        const json = Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
        const payload = JSON.parse(json) as SessionPayload;

        if (!payload?.userId || !payload?.role || !payload?.exp) return null;
        if (payload.exp < Math.floor(Date.now() / 1000)) return null;

        return payload;
    } catch {
        return null;
    }
}
