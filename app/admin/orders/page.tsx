"use client";

import { useEffect, useState } from "react";

type Order = {
    id: string;
    slug: string;
    title: string;
    priceUsd: number;
    email: string;
    name?: string;
    status: "created" | "paid" | "delivered" | "canceled";
    createdAt: string;
};

const statuses: Order["status"][] = ["created", "paid", "delivered", "canceled"];

export default function AdminOrdersPage() {
    const [adminToken, setAdminToken] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data.orders ?? []);
        } catch {
            setError("Не удалось загрузить заказы.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function setStatus(id: string, status: Order["status"]) {
        setError(null);

        try {
            const res = await fetch("/api/orders", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": adminToken,
                },
                body: JSON.stringify({ id, status }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data?.error ?? "Ошибка обновления.");
                return;
            }

            // обновляем список локально, чтобы UI сразу отразил изменения
            setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)));
        } catch {
            setError("Сеть/сервер недоступны.");
        }
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Админка: заказы</h1>
                    <p className="mt-1 text-zinc-600">
                        Локальный MVP. Меняем статусы заявок в <code className="px-1 py-0.5 bg-zinc-100 rounded">.data/orders.json</code>
                    </p>
                </div>

                <button
                    onClick={load}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                    Обновить
                </button>
            </div>

            {/* токен */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                <label className="text-sm font-semibold text-zinc-900">ADMIN_TOKEN (для локальной защиты)</label>
                <input
                    value={adminToken}
                    onChange={(e) => setAdminToken(e.target.value)}
                    placeholder="dev-secret-123"
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-400 focus:outline-none"
                />
                <p className="mt-2 text-xs text-zinc-500">
                    Введи токен из <code className="px-1 py-0.5 bg-zinc-100 rounded">.env.local</code>.
                    Без него PATCH вернёт <code className="px-1 py-0.5 bg-zinc-100 rounded">403</code>.
                </p>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">Загрузка…</div>
            ) : orders.length === 0 ? (
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    Пока нет заказов. Создай заявку через /checkout/&lt;slug&gt;.
                </div>
            ) : (
                <ul className="grid gap-4">
                    {orders.map((o) => (
                        <li key={o.id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-zinc-900">{o.title}</div>
                                    <div className="mt-1 text-sm text-zinc-600">
                                        {o.email}
                                        {o.name ? ` • ${o.name}` : ""}
                                    </div>
                                    <div className="mt-2 text-xs text-zinc-500">
                                        slug: <span className="text-zinc-700">{o.slug}</span> • id:{" "}
                                        <span className="text-zinc-700">{o.id}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <select
                                        value={o.status}
                                        onChange={(e) => setStatus(o.id, e.target.value as Order["status"])}
                                        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-blue-400 focus:outline-none"
                                    >
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>

                                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700">
                                        {new Date(o.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
