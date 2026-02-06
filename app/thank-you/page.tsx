import Link from "next/link";
import { getOrderById } from "../lib/ordersStore"

export default async function ThankYouPage({ searchParams, }: { searchParams: Promise<{ orderId?: string }>; }) {
    const { orderId } = await searchParams;
    const order = orderId ? await getOrderById(orderId) : null;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
                    Готово
                </div>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
                    Заявка принята 🎉
                </h1>

                {order ? (
                    <p className="mt-2 text-zinc-600">
                        Мы получили заявку на <strong className="text-zinc-900">{order.title}</strong>. <br />
                        Email: <strong className="text-zinc-900">{order.email}</strong>
                    </p>
                ) : (
                    <p className="mt-2 text-zinc-600">
                        Мы получили заявку. Проверь почту — пришлём инструкции/демо.
                    </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/orders"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Посмотреть мои заявки
                    </Link>

                    <Link
                        href="/templates"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                    >
                        Вернуться в каталог
                    </Link>
                </div>
            </div>
        </main>
    );
}