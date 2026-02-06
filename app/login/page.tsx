"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/orders";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(e?: React.FormEvent) {
        e?.preventDefault();
        setError(null);

        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail) {
            setError("Введи email.");
            return;
        }
        if (!password) {
            setError("Введи пароль.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: cleanEmail, password }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setError(data?.error ?? `Ошибка входа (${res.status})`);
                return;
            }

            const role = data?.role;

            if (role === "admin") {
                window.location.href = "/admin/orders";
                return;
            }

            router.replace(next);
        } catch {
            setError("Сеть/сервер недоступны.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-md px-4 py-12">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Вход</h1>
            <p className="mt-1 text-sm text-zinc-600">
                Войди, чтобы увидеть свои заявки. Админ попадёт в админ-панель.
            </p>

            <form onSubmit={submit} className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
                <div>
                    <label className="text-sm font-semibold text-zinc-900">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        autoComplete="email"
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-zinc-900">Пароль</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                        autoComplete="current-password"
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-400 focus:outline-none"
                    />
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {loading ? "Входим..." : "Войти"}
                </button>

                <p className="text-xs text-zinc-500">
                    После входа ты вернёшься на <span className="font-mono">{next}</span>.
                </p>
            </form>
        </main>
    );
}