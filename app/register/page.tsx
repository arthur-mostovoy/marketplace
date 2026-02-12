"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.error ?? "Ошибка регистрации");
                return;
            }

            router.push("/orders"); // или куда тебе нужно после регистрации
        } catch {
            setError("Сеть/сервер недоступны");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="text-2xl font-semibold">Регистрация</h1>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm">Email</label>
                    <input
                        className="mt-1 w-full rounded border p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Имя</label>
                    <input
                        className="mt-1 w-full rounded border p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        autoComplete="name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm">Пароль</label>
                    <input
                        className="mt-1 w-full rounded border p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={10}
                    />
                    <p className="mt-1 text-xs opacity-70">Минимум 10 символов</p>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                    disabled={loading}
                    type="submit"
                >
                    {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
                </button>
            </form>
        </div>
    );
}
