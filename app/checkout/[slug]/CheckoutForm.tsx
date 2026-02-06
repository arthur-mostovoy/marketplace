"use client";

import { useState } from "react";

export default function CheckoutForm({ slug }: { slug: string }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit() {
        setError(null);

        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) {
            setError("Введи email.");
            return;
        }

        setLoading(true);
        try {
            console.log("[checkout] submit start", { slug });
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug, email: trimmedEmail, name: name.trim() }),
            });

            const data = await res.json().catch(() => null);
            console.log("[checkout] response", res.status, res.ok, data);

            if (!res.ok) {
                setError(data?.error ?? `Ошибка оформления (${res.status}).`);
                return;
            }

            const orderId = data?.order?.id;
            if (!orderId) {
                setError("Сервер не вернул orderId. Проверь ответ /api/orders.");
                return;
            }
            console.log("[checkout] orderId", { orderId });
            console.log("[checkout] redirect to thank-you", data?.order?.id);
            window.location.href = `/thank-you?orderId=${encodeURIComponent(orderId)}`;
        } catch {
            setError("Сеть/сервер недоступны. Попробуй ещё раз.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-semibold text-zinc-900">Имя (необязательно)</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван"
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-zinc-900">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-400 focus:outline-none"
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                onClick={submit}
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
                {loading ? "Оформляем..." : "Оформить заявку"}
            </button>

            <p className="text-xs text-zinc-500">
                Нажимая “Оформить”, ты соглашаешься получить письмо с демо/инструкциями.
            </p>
        </div>
    );
}