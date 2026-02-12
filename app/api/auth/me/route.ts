export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { readUsers } from "@/app/lib/usersRepo";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ user: null });

    const users = await readUsers();
    const user = users.find(u => u.id === session.userId) ?? null;

    return NextResponse.json({
        user: user ? { id: user.id, email: user.email, role: user.role, name: user.name ?? null } : null,
    });
}