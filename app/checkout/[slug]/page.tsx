import Link from "next/link";
import { notFound } from "next/navigation";
import Price from "../../components/price";
import CheckoutForm from "./CheckoutForm";
import { templates } from "../../data/templates";

type Params = Promis<{ slug: string }>;

export default async function CheckoutPage({ params }: { params: Params }) {
    const { slug } = await params;

    const template = templates.find((t) => t.slug === slug);
    if (!template) notFound();

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <div className="text-sm text-zinc-500">
                <Link href="/templates" className="hover:text-zinc-900">
                    Каталог
                </Link>
                <span className="mx-2">/</span>
                <Link href={`/templates/${template.slug}`} className="hover:text-zinc-900">
                    {template.title}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-700">Оформление</span>
            </div>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Оформление заявки
                </h1>

                <p className="mt-2 text-zinc-600">
                    Платежи подключим позже. Сейчас собираем заявки и отправляем демо/инструкции на почту.
                </p>

                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm font-semibold text-zinc-900">{template.title}</div>
                            <div className="mt-1 text-sm text-zinc-600 line-clamp-2">{template.description}</div>
                        </div>

                        <div className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-semibold text-zinc-900">
                            <Price amountUsd={template.price} />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <CheckoutForm slug={template.slug} />
                </div>
            </div>

            <div className="mt-6 text-sm text-zinc-500">
                Хочешь вернуться?{" "}
                <Link href={`/templates/${template.slug}`} className="text-blue-600 hover:underline">
                    Страница товара
                </Link>
            </div>
        </main>
    );
}