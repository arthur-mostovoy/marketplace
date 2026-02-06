import { NextResponse } from "next/server";
import { updateOrderStatus } from "../../../../lib/ordersStore";
import { OrderStatus } from "../../../../lib/ordersStore";

function requierAdmin(req: Request) {
    const token = reg.headers.get("x-admin-token");
    return token && token === process.env.ADMIN_TOKEN;
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!requireAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const body = await req.json().catch(() => null);
    const status = body?.status as OrderStatus | undefined;

    const allowed: OrderStatus[] = ["created", "paid", "delivered", "canceled"];
    if (!status || !allowed.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await updateOrderStatus(id, status);
    if (!updated) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: updated });
}