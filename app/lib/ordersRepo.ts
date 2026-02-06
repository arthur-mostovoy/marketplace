import { promises as fs } from "fs";
import path from "path";
import type { Order, OrderStatus } from "./types";

const DATADIR = path.join(process.cwd(), ".data");
const ORDERS_PATH = path.join(DATADIR, "orders.json");

async function ensureOrdersFile() {
    await fs.mkdir(DATADIR, { recursive: true });
    try {
        await fs.access(ORDERS_PATH);
    } catch {
        await fs.writeFile(ORDERS_PATH, JSON.stringify([], null, 2), "utf-8");
    }
}

export async function readOrders(): Promise<Order[]> {
    await ensureOrdersFile();
    const raw = await fs.readFile(ORDERS_PATH, "utf-8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
}

export async function writeOrders(orders: Order[]) {
    await ensureOrdersFile();
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf-8");
}

export async function createOrder(order: Order) {
    const orders = await readOrders();
    orders.unshift(order);
    await writeOrders(orders);
    return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
    const orders = await readOrders();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return null;

    const updated = { ...orders[idx], status };
    orders[idx] = updated;
    await writeOrders(orders);
    return updated;
}

export async function getOrderById(id: string) {
    const orders = await readOrders();
    return orders.find(o => o.id === id) ?? null;
}
