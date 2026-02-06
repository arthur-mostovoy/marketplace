"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NextResponse } from "next/server";

type Order = {
    id: string;
    slug: string;
    title: string;
    priceUsd: number;
    email: string;
    name?: string;
    status: string;
    createdAt: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/orders");
            if (!res.ok) return NextResponse.json({ error: "Missing orders" }, { status: 400 });
            const data = await res.json();
            setOrders(data.orders ?? []);
            setLoading(false);
        })();
    }, []);

    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Мои заявки</h1>
                    <p className="mt-1 text-zinc-600">История оформлений на этом устройстве (локальный MVP).</p>
                </div>
                <Link
                    href="/templates"
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                    В каталог
                </Link>
            </div>

            {loading ? (
                <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    Загружаем…
                </div>
            ) : orders.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                    <h2 className="text-lg font-semibold text-zinc-900">Пока нет заявок</h2>
                    <p className="mt-2 text-zinc-600">Оформи любую через страницу товара.</p>
                    <Link
                        href="/templates"
                        className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Открыть каталог
                    </Link>
                </div>
            ) : (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((o) => (
                        <li key={o.id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="text-sm font-semibold text-zinc-900">{o.title}</div>
                            <div className="mt-1 text-sm text-zinc-600">
                                {o.email}
                                {o.name ? ` • ${o.name}` : ""}
                            </div>

                            <div className="mt-3 flex items-center justify-between text-sm">
                                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700">
                                    {o.status}
                                </span>

                                <Link
                                    href={`/templates/${o.slug}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Открыть товар →
                                </Link>

                                <button
                                    onClick={async () => {
                                        const res = await fetch(`/api/orders/download-link?orderId=${encodeURIComponent(o.id)}`);
                                        const data = await res.json();

                                        if (!res.ok) {
                                            alert(data?.error ?? "Не удалось получить ссылку");
                                            return;
                                        }

                                        window.location.href = data.downloadUrl;
                                    }}
                                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                                    disabled={o.status !== "delivered"}
                                    title={o.status !== "delivered" ? "Станет доступно после delivery" : "Скачать"}
                                >
                                    Скачать
                                </button>
                            </div>

                            <div className="mt-3 text-xs text-zinc-500">
                                {new Date(o.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
