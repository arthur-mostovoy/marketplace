import { NextResponse } from "next/server";
import crypto from "crypto";
import { templates } from "../../data/templates";
import { getSession } from "../../lib/session";
import { createOrder, readOrders, updateOrderStatus, type Order } from "../../lib/ordersRepo";

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await readOrders();
  const visible = session.role === "admin"
    ? orders
    : orders.filter(o => o.userId === session.userId);

  return NextResponse.json({ ok: true, orders: visible });
}

export async function POST(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const slug = String(body?.slug ?? "");
  const email = String(body?.email ?? "").trim().toLowerCase();
  const name = String(body?.name ?? "").trim();

  const template = templates.find(t => t.slug === slug);
  if (!template) return NextResponse.json({ error: "Template not found" }, { status: 400 });

  const order: Order = {
    id: crypto.randomUUID(),
    userId: session.userId,         // ⭐ вот тут “привязка”
    slug: template.slug,
    title: template.title,
    priceUsd: template.price,
    email,
    name: name || undefined,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  await createOrder(order);
  return NextResponse.json({ ok: true, order }, { status: 201 });
}

export async function PATCH(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const id = String(body?.id ?? "");
  const status = String(body?.status ?? "");

  const allowed = ["created", "paid", "delivered", "canceled"] as const;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!allowed.includes(status as any)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const updated = await updateOrderStatus(id, status as any);
  if (!updated) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  return NextResponse.json({ ok: true, order: updated });
}
