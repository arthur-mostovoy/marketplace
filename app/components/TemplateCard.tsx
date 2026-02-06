import Link from "next/link";
import type { Template } from "../data/types";
import Price from "./price";

export default function TemplateCard({
    template,
    isFavorite,
    onToggleFavorite,
}: {
    template: Template;
    isFavorite: boolean;
    onToggleFavorite: (slug: string) => void;
}) {
    const btnPrimary =
        "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";

    return (
        <li className="group">
            {/* Вся карточка как ссылка (маркетплейс-ощущение) */}
            <Link
                href={`/templates/${template.slug}`}
                className="block focus:outline-none"
                aria-label={`Открыть шаблон: ${template.title}`}
            >
                <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500">
                    {/* Превью / mock */}
                    <div className="relative h-36 border-b border-zinc-200 bg-gradient-to-br from-zinc-50 to-white">
                        {/* мягкий “блик” */}
                        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/50 blur-2xl" />

                        {/* лёгкий shine по диагонали */}
                        <div className="pointer-events-none absolute -left-24 top-0 h-full w-40 -skew-x-12 bg-white/40 opacity-0 transition group-hover:opacity-100" />

                        {/* Категория */}
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                            Онлайн-курсы
                        </div>

                        {/* Цена — сразу в шапке (как “badge”) */}
                        <div className="absolute left-4 bottom-4 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
                            <Price amountUsd={template.price} />
                        </div>

                        {/* Избранное (действие, НЕ переход) */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault(); // не переходим по Link
                                e.stopPropagation(); // не всплываем (на всякий)
                                onToggleFavorite(template.slug);
                            }}
                            className={`absolute right-4 top-4 inline-flex items-center justify-center rounded-full border px-2.5 py-1.5 text-sm transition ${isFavorite
                                    ? "border-zinc-300 bg-zinc-100 text-zinc-900"
                                    : "border-zinc-200 bg-white/90 text-zinc-600 hover:bg-zinc-100"
                                }`}
                            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                            title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                        >
                            {isFavorite ? "★" : "☆"}
                        </button>

                        {/* Лёгкий “скелет” превью */}
                        <div className="absolute bottom-4 right-4 hidden rounded-2xl border border-zinc-200 bg-white/80 p-3 backdrop-blur sm:block">
                            <div className="h-2.5 w-36 rounded-full bg-zinc-200/70" />
                            <div className="mt-2 h-2.5 w-2/3 rounded-full bg-zinc-200/60" />
                            <div className="mt-2 flex gap-2">
                                <div className="h-6 w-18 rounded-lg bg-blue-600/90" />
                                <div className="h-6 w-22 rounded-lg border border-zinc-200 bg-white" />
                            </div>
                        </div>
                    </div>

                    {/* Контент */}
                    <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="text-base font-semibold leading-snug text-zinc-900">
                                    {template.title}
                                </h3>
                                <p className="mt-1.5 text-sm text-zinc-600 line-clamp-2">
                                    {template.description}
                                </p>

                                {/* контентные бейджи */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {["Адаптивный", "Hero + тарифы", "FAQ + CTA"].map((x) => (
                                        <span
                                            key={x}
                                            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700"
                                        >
                                            {x}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Низ карточки */}
                        <div className="mt-5 flex items-center justify-between">
                            <span className={btnPrimary}>Открыть</span>

                            <span className="text-sm text-zinc-500 transition group-hover:text-zinc-700">
                                Подробнее →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
