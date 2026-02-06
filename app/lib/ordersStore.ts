import { FILE } from "dns/promises";
import { promises as fs } from "fs";
import { writeFile } from "node:fs/promises";
import path from "path";

export type OrderStatus = "created" | "paid" | "delivered" | "canceled";

export type Order = {
    id: string;
    slug: string;
    title: string;
    priceUsd: number;
    email: string;
    name?: string;
    status: OrderStatus;
    createdAt: string; // ISO
};

const DATADIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATADIR, "orders.json");
//const ORDERS_PATH = path.join(process.cwd(), "app", "data", "orders.json");

async function ensureFile() {
    await fs.mkdir(DATADIR, { recursive: true });
    try {
        await fs.access(FILE_PATH);
    } catch {
        await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf-8");
    }
}

/*export async function readOrders(): Promise<Order[]> {
    await ensureFile();
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    try {
        const parsed = JSON.parse(raw);
        Array.isArray(parsed) ? (parsed as Order[]) : [];
    } catch {
        return [];
    }
} */
export async function readOrders(): Promise<Order[]> {
    try {
        await ensureFile();
        const raw = await fs.readFile(FILE_PATH, "utf-8");

        // если файл существует, но пустой — считаем как []
        if (!raw.trim()) return [];

        const parsed = JSON.parse(raw);

        // если там не массив — тоже []
        if (!Array.isArray(parsed)) return [];

        return parsed as Order[];
    } catch (e: any) {
        // если файла нет — это ок, вернём []
        if (e?.code === "ENOENT") return [];

        console.log("[ordersStore] readOrders: file not found, returning []");
        // любые другие ошибки (битый json и т.п.)
        return [];
        }
    }

export async function writeOrders(orders: Order[]) {
    await ensureFile();
    await fs.writeFile(FILE_PATH, JSON.stringify(orders, null, 2), "utf-8");
}

export async function createOrder(order: Order) {
    console.log("[ordersStore] createOrder: incoming order", order);
    const orders = await readOrders();
    console.log("[ordersStore] before unshift, orders length:", orders.length);
    orders.unshift(order); // новые сверху
    await writeOrders(orders);
    console.log("[ordersStore] order saved successfully");
    return order;
}

export async function getOrderById(id: string) {
    const orders = await readOrders();
    return orders.find((o) => o.id === id) ?? null;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
    const orders = await readOrders();
    const idx = orders.findIndex((o) => o.id === id);

    if (idx === -1) return null;

    const updated = { ...orders[idx], status };
    orders[idx] = updated;

    await writeOrders(orders);
    return updated;
}