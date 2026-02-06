import { NextResponse } from "next/server";
import { getOrderById } from "@/app/lib/ordersStore";
import { createDownloadToken } from "@/app/lib/downloadToken";


export async function GET(req: Request) {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId") ?? "";

    if (!orderId) {
        return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const order = await getOrderById(orderId);
    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "delivered") {
        return NextResponse.json({ error: "Not delivered yet" }, { status: 403 });
    }

    // токен действует 10 минут
    const token = createDownloadToken(orderId, 10 * 60);

    return NextResponse.json({
        downloadUrl: `/api/download?token=${encodeURIComponent(token)}`,
        expiresInSeconds: 10 * 60,
    });
}
