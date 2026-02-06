"use client";

import { useMemo, useState } from "react";
import TemplateCard from "../components/TemplateCard";
import { templates } from "../data/templates";
import { useFavorites } from "../hooks/useFavorites";

export default function TemplatesPage() {
    const [query, setQuery] = useState("");
    const [priceFilter, setPriceFilter] = useState<"all" | "cheap" | "expensive">("all");
    const [sort, setSort] = useState<"default" | "price-asc" | "price-desc" | "title-asc">("default");
    const [onlyFavorites, setOnlyFavorites] = useState(false);

    const { isFavorite, toggleFavorite } = useFavorites();

    const input =
        "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-blue-400 focus:outline-none";
    const select =
        "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-blue-400 focus:outline-none";
    const btnSecondary =
        "inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50";
    const section =
        "rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm";

    const pillBase =
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition";
    const pillOn =
        "border-zinc-900 bg-zinc-900 text-white";
    const pillOff =
        "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50";

    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
            const matchesQuery = template.title.toLowerCase().includes(query.toLowerCase());

            let matchesPrice = true;
            if (priceFilter === "cheap") matchesPrice = template.price < 18;
            if (priceFilter === "expensive") matchesPrice = template.price >= 18;

            const matchesFavorites = !onlyFavorites || isFavorite(template.slug);

            return matchesQuery && matchesPrice && matchesFavorites;
        });
    }, [query, priceFilter, onlyFavorites, isFavorite]);

    const visibleTemplates = useMemo(() => {
        return [...filteredTemplates].sort((a, b) => {
            if (sort === "price-asc") return a.price - b.price;
            if (sort === "price-desc") return b.price - a.price;
            if (sort === "title-asc") return a.title.localeCompare(b.title);
            return 0;
        });
    }, [filteredTemplates, sort]);

    const hasFilters =
        query.trim() !== "" || priceFilter !== "all" || sort !== "default" || onlyFavorites;

    function resetFilters() {
        setQuery("");
        setPriceFilter("all");
        setSort("default");
        setOnlyFavorites(false);
    }

    return (
        <div className="space-y-6">
            {/* Заголовок + панель управления */}
            <section className={section}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Каталог шаблонов</h1>
                        <p className="mt-1 text-zinc-600">
                            Выбирай лендинг для запуска онлайн-курса — быстро, красиво, адаптивно.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                        {/* Поиск */}
                        <div className="w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Поиск по названию..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={input}
                            />
                        </div>

                        {/* Сортировка */}
                        <div className="w-full sm:w-56">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as any)}
                                className={select}
                            >
                                <option value="default">По умолчанию</option>
                                <option value="price-asc">Цена ↑</option>
                                <option value="price-desc">Цена ↓</option>
                                <option value="title-asc">Название A→Z</option>
                            </select>
                        </div>

                        {/* Сброс */}
                        <button onClick={resetFilters} className={`w-full sm:w-auto ${btnSecondary}`}>
                            Сбросить
                        </button>
                    </div>
                </div>

                {/* Фильтры */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setPriceFilter("all")}
                        className={`${pillBase} ${priceFilter === "all" ? pillOn : pillOff}`}
                    >
                        Все
                    </button>

                    <button
                        onClick={() => setPriceFilter("cheap")}
                        className={`${pillBase} ${priceFilter === "cheap" ? pillOn : pillOff}`}
                    >
                        До $18
                    </button>

                    <button
                        onClick={() => setPriceFilter("expensive")}
                        className={`${pillBase} ${priceFilter === "expensive" ? pillOn : pillOff}`}
                    >
                        От $18
                    </button>

                    <button
                        onClick={() => setOnlyFavorites((v) => !v)}
                        className={`${pillBase} ${onlyFavorites ? pillOn : pillOff}`}
                    >
                        {onlyFavorites ? "★ Избранное" : "☆ Избранное"}
                    </button>

                    <span className="ml-auto text-sm text-zinc-500">
                        Показано: {visibleTemplates.length} / {templates.length}
                    </span>
                </div>
            </section>

            {/* Сетка */}
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleTemplates.map((template) => (
                    <TemplateCard
                        key={template.slug}
                        template={template}
                        isFavorite={isFavorite(template.slug)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </ul>

            {/* Пустое состояние */}
            {filteredTemplates.length === 0 && (
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-zinc-100 text-xl">
                        🔎
                    </div>

                    <p className="mt-4 text-base font-semibold text-zinc-900">Ничего не найдено</p>

                    <p className="mt-2 text-sm text-zinc-600">
                        По запросу <strong className="text-zinc-900">{query || "—"}</strong> ничего не подошло.
                        Попробуй убрать фильтры или изменить запрос.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button onClick={resetFilters} className={btnSecondary}>
                            Сбросить фильтры
                        </button>

                        {hasFilters && (
                            <button
                                onClick={() => setQuery("")}
                                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                            >
                                Очистить поиск
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
