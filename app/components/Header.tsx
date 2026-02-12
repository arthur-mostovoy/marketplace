"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrency } from "../context/currency";
import { useFavorites } from "../hooks/useFavorites";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

function NavLink({ href, label, badge }: { href: string; label: string; badge?: number }) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${active
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
        >
            <span>{label}</span>

            {typeof badge === "number" && badge > 0 && (
                <span
                    className={`min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-semibold ${active ? "bg-white/20 text-white" : "bg-zinc-200/70 text-zinc-800"
                        }`}
                    aria-label={`${badge} в избранном`}
                    title={`${badge} в избранном`}
                >
                    {badge}
                </span>
            )}
        </Link>
    );
}

export default function Header() {
    const { currency, toggleCurrency } = useCurrency();
    const { favoriteSlugs } = useFavorites();

    const favoritesCount = favoriteSlugs.length;

    const router = useRouter();
    const [me, setMe] = useState<{ email: string; role: "user" | "admin" } | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/auth/me", { cache: "no-store" });
            const data = await res.json().catch(() => ({ user: null }));
            setMe(data.user ?? null);
        })();
    }, []);

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
        setMe(null);
        router.push("/login");
        router.refresh();
    }

    const pill =
        "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-sm font-semibold transition";
    const pillOn = "bg-zinc-900 border-zinc-900 text-white shadow-sm";
    const pillOff = "bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50";

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-sm font-bold text-white shadow-sm">
                        MP
                    </div>

                    <div className="leading-tight">
                        <div className="text-sm font-semibold text-zinc-900">Marketplace</div>
                        <div className="text-xs text-zinc-500">Шаблоны для онлайн-курсов</div>
                    </div>
                </Link>

                <nav className="flex items-center gap-2">
                    <NavLink href="/templates" label="Каталог" />
                    <NavLink href="/favorites" label="Избранное" badge={favoritesCount} />

                    {/* Переключатель валюты (как “пилюля”) */}
                    <button
                        onClick={toggleCurrency}
                        className={`ml-2 ${pill} ${pillOff}`}
                        title="Переключить валюту"
                        aria-label="Переключить валюту"
                    >
                        <span className="mr-2 text-zinc-400">Валюта</span>
                        <span className="inline-flex items-center gap-1">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${currency === "USD" ? pillOn : "bg-zinc-100 text-zinc-700 border border-transparent"}`}>
                                $
                            </span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${currency === "RUB" ? pillOn : "bg-zinc-100 text-zinc-700 border border-transparent"}`}>
                                ₽
                            </span>
                        </span>
                    </button>
                    {/* Блок пользователя */}
                    <div className="ml-2 flex items-center gap-2">
                        {me ? (
                            <>
                                <span className="text-sm text-zinc-700">{me.email}</span>
                                <NavLink href="/orders" label="Заказы" />
                                {me.role === "admin" && <NavLink href="/admin/orders" label="Админка" />}
                                <button className={`${pill} ${pillOff}`} onClick={logout}>
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <NavLink href="/login" label="Войти" />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
