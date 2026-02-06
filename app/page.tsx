import Link from "next/link";
import { templates } from "./data/templates";
import Price from "./components/price";

export default function Home() {
    const featured = templates.slice(0, 6);

    const btnPrimary =
        "inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
    const btnSecondary =
        "inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50";
    const btnDark =
        "inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800";
    const section =
        "rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm";
    const softCard =
        "rounded-3xl border border-zinc-200 bg-zinc-50 p-5";

    return (
        <div className="space-y-14">
            {/* HERO */}
            <section className={`relative overflow-hidden ${section}`}>
                {/* мягкие “пятна” (без зелёного, чтобы не грязнило) */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                    MVP-маркетплейс шаблонов • ниша: онлайн-курсы
                </span>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                    Запусти курс быстрее — с готовым лендингом
                </h1>

                <p className="mt-4 max-w-2xl text-zinc-600">
                    Выбирай шаблон, добавляй в избранное, смотри страницу товара. Минимум лишнего — максимум запуска.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href="/templates" className={btnPrimary}>
                        Открыть каталог
                    </Link>

                    <Link href="/favorites" className={btnSecondary}>
                        Моё избранное →
                    </Link>
                </div>

                {/* мини-статы */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                        { k: "Шаблоны", v: `${templates.length}+` },
                        { k: "Стиль", v: "лёгкий, белый" },
                        { k: "Скорость", v: "MVP за вечер" },
                    ].map((s) => (
                        <div
                            key={s.k}
                            className="rounded-2xl border border-zinc-200 bg-white/70 p-4"
                        >
                            <div className="text-sm text-zinc-500">{s.k}</div>
                            <div className="mt-1 text-lg font-semibold text-zinc-900">
                                {s.v}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CATEGORIES */}
            <section>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                            Под разные сценарии запуска
                        </h2>
                        <p className="mt-2 text-zinc-600">
                            Не все курсы продаются одинаково. Выбирай шаблон под формат: вебинар, поток, менторство, мини-курс.
                        </p>
                    </div>

                    <Link
                        href="/templates"
                        className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                        Смотреть все →
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: "Вебинар", text: "Регистрация + таймер + бонусы", emoji: "🎙️" },
                        { title: "Набор в поток", text: "Дедлайны + расписание + тарифы", emoji: "📅" },
                        { title: "Мини-курс", text: "Лид-магнит для первых заявок", emoji: "🧲" },
                        { title: "Менторство", text: "Кейсы + места ограничены", emoji: "🤝" },
                    ].map((c) => (
                        <div key={c.title} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="text-2xl">{c.emoji}</div>
                            <div className="mt-3 text-base font-semibold text-zinc-900">
                                {c.title}
                            </div>
                            <div className="mt-1 text-sm text-zinc-600">{c.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className={section}>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Как это работает
                </h2>
                <p className="mt-2 text-zinc-600">
                    Три шага — и у тебя есть красивая страница под курс.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                        { step: "1", title: "Выбираешь шаблон", text: "Смотри каталог и открывай страницу товара." },
                        { step: "2", title: "Добавляешь в избранное", text: "Сравнивай варианты и возвращайся позже." },
                        { step: "3", title: "Запускаешь курс", text: "Подставляешь контент — и публикуешь лендинг." },
                    ].map((x) => (
                        <div key={x.step} className={softCard}>
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                                {x.step}
                            </div>
                            <div className="mt-3 text-base font-semibold text-zinc-900">
                                {x.title}
                            </div>
                            <div className="mt-1 text-sm text-zinc-600">{x.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURED */}
            <section>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                            Популярные шаблоны
                        </h2>
                        <p className="mt-2 text-zinc-600">
                            Пара вариантов, с которых удобно начать.
                        </p>
                    </div>

                    <Link
                        href="/templates"
                        className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                        В каталог →
                    </Link>
                </div>

                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((t) => (
                        <li key={t.slug} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-zinc-900">
                                        {t.title}
                                    </div>
                                    <div className="mt-1 text-sm text-zinc-600 line-clamp-2">
                                        {t.description}
                                    </div>
                                </div>

                                <div className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-800">
                                    <Price amountUsd={t.price} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <Link href={`/templates/${t.slug}`} className={btnPrimary}>
                                    Открыть
                                </Link>
                                <span className="text-sm text-zinc-500">Подробнее →</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* TRUST */}
            <section className={section}>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Почему это удобно
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: "Лёгкий дизайн", text: "Белый фон, аккуратные карточки, чистая типографика." },
                        { title: "Адаптивность", text: "Смотрится нормально на телефоне, планшете и десктопе." },
                        { title: "Быстрый старт", text: "Структура уже есть — ты добавляешь контент и запускаешь." },
                    ].map((b) => (
                        <div key={b.title} className={softCard}>
                            <div className="text-base font-semibold text-zinc-900">{b.title}</div>
                            <div className="mt-2 text-sm text-zinc-600">{b.text}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className={section}>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Отзывы</h2>
                <p className="mt-2 text-zinc-600">
                    Эти отзывы — пример для MVP. Позже заменишь на реальные кейсы и скриншоты.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: "Анна, эксперт",
                            role: "Запуск курса",
                            text: "Собрала лендинг за вечер: вставила тексты, поменяла цвета — и на следующий день уже брала заявки.",
                        },
                        {
                            name: "Илья, продюсер",
                            role: "Набор в поток",
                            text: "Понравилось, что структура уже продумана: программа, тарифы, FAQ. Не надо изобретать велосипед.",
                        },
                        {
                            name: "Мария, преподаватель",
                            role: "Мини-курс",
                            text: "Идеально для лид-магнита: быстро собрала страницу регистрации и добавила первый бесплатный урок.",
                        },
                    ].map((r) => (
                        <div key={r.name} className={softCard}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-zinc-900">{r.name}</div>
                                    <div className="mt-0.5 text-xs text-zinc-500">{r.role}</div>
                                </div>
                                <div className="shrink-0 text-lg">⭐️</div>
                            </div>
                            <p className="mt-3 text-sm text-zinc-700">{r.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className={section}>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">FAQ</h2>
                <p className="mt-2 text-zinc-600">
                    Частые вопросы перед выбором шаблона. Это помогает продажам: снимает сомнения.
                </p>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {[
                        {
                            q: "Это готовый сайт или только дизайн?",
                            a: "Это готовая страница на Next.js + Tailwind. Ты получаешь код и можешь менять тексты, блоки и стили.",
                        },
                        {
                            q: "Можно ли использовать шаблон несколько раз?",
                            a: "Для MVP считаем: лицензия на 1 проект. Позже можно добавить расширенные лицензии.",
                        },
                        {
                            q: "Подойдёт ли для вебинара или набора в поток?",
                            a: "Да. В каталоге есть сценарии под вебинар, поток, мини-курс и менторство — выбирай по задаче.",
                        },
                        {
                            q: "Будут ли обновления и поддержка?",
                            a: "В MVP — минимально. Идея такая: сначала выпускаем, затем добавляем обновления и поддержку по плану.",
                        },
                    ].map((item) => (
                        <div key={item.q} className={softCard}>
                            <div className="text-sm font-semibold text-zinc-900">{item.q}</div>
                            <div className="mt-2 text-sm text-zinc-600">{item.a}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className={section}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-zinc-900">Готов начать?</h3>
                        <p className="mt-1 text-zinc-600">
                            Открой каталог, выбери шаблон и посмотри страницу товара. Если понравится — добавь в избранное.
                        </p>
                    </div>

                    {/* выравниваем стиль кнопок: primary/secondary/dark */}
                    <Link href="/templates" className={btnDark}>
                        Перейти в каталог
                    </Link>
                </div>
            </section>
        </div>
    );
}
