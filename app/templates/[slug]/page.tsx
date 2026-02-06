import Link from "next/link";
import { templates } from "../../data/templates";
import Price from "../../components/price";
import FavoriteButton from "./FavoriteButton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const template = templates.find((t) => t.slug === slug);

    if (!template) {
        return {
            title: "Шаблон не найден — Marketplace",
            description: "Запрошенный шаблон не найден.",
        };
    }

    return {
        title: `${template.title} — Marketplace`,
        description: template.description,
        openGraph: {
            title: `${template.title} — Marketplace`,
            description: template.description,
            // Позже добавим og:image, когда появятся картинки
        },
    };
}

function getSimilarTemplates(currentSlug: string, price: number) {
    return templates
        .filter((t) => t.slug !== currentSlug)
        .sort((a, b) => Math.abs(a.price - price) - Math.abs(b.price - price))
        .slice(0, 3);
}

export default async function TemplatePage({ params }: { params: Params }) {
    const { slug } = await params;

    const template = templates.find((t) => t.slug === slug);

    if (!template) {
        notFound();
    }

    const similar = getSimilarTemplates(template.slug, template.price);

    const section = "rounded-3xl border border-zinc-200 bg-white shadow-sm";
    const softCard = "rounded-2xl border border-zinc-200 bg-zinc-50";
    const btnPrimary =
        "inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
    const btnSecondary =
        "inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50";

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            {/* Breadcrumbs */}
            <div className="text-sm text-zinc-500">
                <Link href="/templates" className="transition hover:text-zinc-900">
                    Каталог
                </Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-700">{template.title}</span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Левая колонка */}
                <section className="lg:col-span-2 space-y-6">
                    {/* Превью */}
                    <div className={`overflow-hidden ${section}`}>
                        <div className="relative h-72 bg-gradient-to-br from-zinc-50 to-white">
                            {/* Скелет лендинга */}
                            <div className="absolute inset-0 p-6">
                                <div className="h-6 w-44 rounded-full bg-zinc-200/70" />
                                <div className="mt-6 h-10 w-3/4 rounded-xl bg-zinc-200/70" />
                                <div className="mt-3 h-4 w-2/3 rounded-lg bg-zinc-200/60" />
                                <div className="mt-2 h-4 w-1/2 rounded-lg bg-zinc-200/60" />

                                <div className="mt-6 flex gap-3">
                                    <div className="h-9 w-28 rounded-xl bg-blue-600/90" />
                                    <div className="h-9 w-36 rounded-xl border border-zinc-200 bg-white" />
                                </div>

                                <div className="mt-8 grid grid-cols-3 gap-3">
                                    <div className="rounded-2xl bg-zinc-200/50" />
                                    <div className="rounded-2xl bg-zinc-200/50" />
                                    <div className="rounded-2xl bg-zinc-200/50" />
                                </div>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur">
                                <div className="text-sm font-semibold text-zinc-900">Превью шаблона</div>
                                <div className="mt-1 text-sm text-zinc-600">
                                    Здесь позже будут скриншоты или live-demo.
                                </div>
                            </div>
                        </div>

                        {/* Миниатюры */}
                        <div className="grid grid-cols-3 gap-3 border-t border-zinc-200 p-4">
                            {["Hero", "Программа", "Отзывы"].map((label) => (
                                <div
                                    key={label}
                                    className={`${softCard} p-3 text-sm text-zinc-700`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Описание */}
                    <div className={`${section} p-6`}>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                            {template.title}
                        </h1>
                        <p className="mt-3 text-zinc-600">{template.description}</p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className={`${softCard} p-4`}>
                                <div className="text-sm font-semibold text-zinc-900">Адаптивный</div>
                                <div className="mt-1 text-sm text-zinc-600">Mobile / Tablet / Desktop</div>
                            </div>
                            <div className={`${softCard} p-4`}>
                                <div className="text-sm font-semibold text-zinc-900">Компоненты</div>
                                <div className="mt-1 text-sm text-zinc-600">Hero, блоки, CTA</div>
                            </div>
                            <div className={`${softCard} p-4`}>
                                <div className="text-sm font-semibold text-zinc-900">Технологии</div>
                                <div className="mt-1 text-sm text-zinc-600">Next.js + Tailwind</div>
                            </div>
                        </div>
                    </div>

                    {/* Что внутри */}
                    <div className={`${section} p-6`}>
                        <h2 className="text-xl font-semibold text-zinc-900">Что внутри</h2>
                        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                            <li>• Готовая структура лендинга (Hero → программа → отзывы → FAQ → CTA)</li>
                            <li>• Адаптивная сетка Tailwind</li>
                            <li>• Чистые компоненты + понятные классы</li>
                        </ul>
                    </div>
                </section>

                {/* Правая колонка */}
                <aside className="lg:sticky lg:top-6 lg:col-span-1 space-y-6">
                    <div className= "space-y-6">
                    {/* Sticky: только покупка */}
                    <div className={`sticky top-6 ${section} p-6`}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-sm text-zinc-500">Цена</div>
                                <div className="mt-1 text-2xl font-bold text-zinc-900">
                                    <Price amountUsd={template.price} />
                                </div>
                            </div>

                            <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
                                Готов к запуску
                            </span>
                        </div>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link href={`/checkout/${template.slug}`} className={btnPrimary}>
                                Оформить заявку
                            </Link>

                            <FavoriteButton slug={template.slug} />

                            <Link href="/templates" className={btnSecondary}>
                                Вернуться в каталог
                            </Link>
                        </div>
                    </div>

                    {/* НЕ sticky: гарантии отдельной карточкой */}
                    <div className={`${section} p-6`}>
                        <div className="text-sm font-semibold text-zinc-900">Гарантии</div>
                        <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                            <li>• Мгновенная выдача после оплаты (будет)</li>
                            <li>• Лицензия на 1 проект</li>
                            <li>• Поддержка обновлений (план)</li>
                        </ul>
                    </div>

                    {/* Похожие */}
                    <div className={`${section} p-6`}>
                        <h3 className="text-base font-semibold text-zinc-900">Похожие шаблоны</h3>

                        <div className="mt-4 space-y-3">
                            {similar.map((t) => (
                                <Link
                                    key={t.slug}
                                    href={`/templates/${t.slug}`}
                                    className="block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex gap-3">
                                        <div className="h-16 w-16 shrink-0 rounded-xl border border-zinc-200 bg-zinc-50" />
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-zinc-900">{t.title}</div>
                                            <div className="mt-1 text-sm text-zinc-600 line-clamp-2">
                                                {t.description}
                                            </div>

                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="text-sm font-semibold text-zinc-900">
                                                    <Price amountUsd={t.price} />
                                                </div>
                                                <span className="text-xs text-zinc-500">Открыть →</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        </div>
                        </div>
                </aside>
            </div>
        </main>
    );
}
