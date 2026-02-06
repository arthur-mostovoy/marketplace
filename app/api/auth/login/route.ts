import { NextResponse } from "next/server";
import { getUserByEmail } from "../../../lib/usersRepo";
import { hashPassword } from "../../../lib/password";
import { createSessionCookie } from "../../../lib/session";

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!email || !password) {
        return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passHash = hashPassword(password);
    if (user.passwordHash !== passHash) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    createSessionCookie({ userId: user.id, role: user.role });
    return NextResponse.json({ ok: true, role: user.role });
}
