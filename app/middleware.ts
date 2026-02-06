import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;
    const session = req.cookies.get("session")?.value;

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/api/auth");
    if (isAuthRoute) return NextResponse.next();

    const isOrders = pathname.startsWith("/orders");
    const isAdmin = pathname.startsWith("/admin");

    if (!isOrders && !isAdmin) return NextResponse.next();

    if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname + (searchParams.toString() ? `?${searchParams}` : ""));
        return NextResponse.redirect(url);
    }

    // Роль мы здесь не можем безопасно распарсить без кода проверки подписи.
    // Поэтому роль будем проверять на сервере в страницах / api.
    return NextResponse.next();
}

export const config = {
    matcher: ["/orders/:path*", "/admin/:path*"],
};
