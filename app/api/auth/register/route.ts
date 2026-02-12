export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/app/lib/password";
import { createSessionCookie, setSessionCookieOnResponse } from "@/app/lib/session";
import { getUserByEmail, readUsers, writeUsers } from "@/app/lib/usersRepo";
import type { User } from "@/app/lib/types";

const RegisterSchema = z.object({
    name: z.string().min(2, "Имя минимум 2 символа").max(50, "Имя слишком длинное"),
    email: z.string().email(),
    password: z.string().min(10, "Пароль минимум 10 символов"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = RegisterSchema.parse(body);
        const normalizedEmail = email.trim().toLowerCase();

        const existing = await getUserByEmail(normalizedEmail);
        if (existing) {
            return NextResponse.json({ error: "Email уже зарегистрирован" }, { status: 409 });
        }

        const passwordHash = await hashPassword(password);

        const normalizedName = name.trim();

        // важно: по умолчанию роль user
        const users = await readUsers();

        const user: User = {
            id: `u_${Date.now()}`,
            name: normalizedName,
            email: normalizedEmail,
            passwordHash,
            role: "user",
        };

        users.push(user);
        await writeUsers(users);

        // автологин после регистрации (по желанию)
        const res = NextResponse.json({ ok: true });
        //await createSessionCookie(res, { userId: user.id, role: user.role });
        setSessionCookieOnResponse(res, { userId: user.id, role: user.role });
        return res;
    } catch (e: any) {
        // zod ошибки и другие
        return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
    }
}