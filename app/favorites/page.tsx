"use client";

import Link from "next/link";
import TemplateCard from "../components/TemplateCard";
import { templates } from "../data/templates";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
    const { favoriteSlugs, isFavorite, toggleFavorite } = useFavorites();

    // Берём только те шаблоны, slug которых есть в избранном
    const favoriteTemplates = templates.filter((t) => favoriteSlugs.includes(t.slug));

    const section = "rounded-3xl border border-zinc-200 bg-white shadow-sm";
    const btnPrimary =
        "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
    const btnSecondary =
        "inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50";

    return (
        <div className="space-y-6">
            {/* Шапка раздела */}
            <section className={`${section} p-6`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Избранное</h1>
                        <p className="mt-1 text-zinc-600">
                            Тут лежат шаблоны, которые ты отметил звёздочкой.
                        </p>
                    </div>

                    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
                        {favoriteTemplates.length} шт.
                    </span>
                </div>
            </section>

            {/* Empty state */}
            {favoriteTemplates.length === 0 ? (
                <section className={`${section} p-8`}>
                    <div className="mx-auto max-w-xl text-center">
                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-zinc-100 text-xl">
                            ★
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-zinc-900">Пока пусто</h2>
                        <p className="mt-2 text-zinc-600">
                            Добавь шаблоны в избранное в каталоге или на странице товара — они появятся здесь.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link href="/templates" className={btnPrimary}>
                                Перейти в каталог
                            </Link>

                            <Link href="/" className={btnSecondary}>
                                На главную
                            </Link>
                        </div>

                        <p className="mt-5 text-xs text-zinc-500">
                            Подсказка: нажми ☆ на карточке или на странице товара.
                        </p>
                    </div>
                </section>
            ) : (
                <>
                    {/* Сетка карточек */}
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {favoriteTemplates.map((template) => (
                            <TemplateCard
                                key={template.slug}
                                template={template}
                                isFavorite={isFavorite(template.slug)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </ul>

                    {/* Небольшой “footer” секции */}
                    <div className="text-center text-sm text-zinc-500">
                        Нажми ★ на карточке, чтобы убрать из избранного.
                    </div>
                </>
            )}
        </div>
    );
}
