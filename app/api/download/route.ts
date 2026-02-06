import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/app/lib/downloadToken";
import { getOrderById } from "@/app/lib/ordersStore";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";

    const payload = verifyDownloadToken(token);
    if (!payload) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const order = await getOrderById(payload.orderId);
    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "delivered") {
        return NextResponse.json({ error: "Not delivered" }, { status: 403 });
    }

    // Пока отдаём “файл-заглушку”
    const content = [
        `Marketplace demo delivery`,
        `Order: ${order.id}`,
        `Template: ${order.slug}`,
        `Email: ${order.email}`,
        `Status: ${order.status}`,
        ``,
        `Следующий шаг: вместо этого текста будем отдавать ZIP с шаблоном.`,
    ].join("\n");

    const filename = `${order.slug}-demo.txt`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-store",
        },
    });
}
