import Link from "next/link";

export default function NotFound() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
                    404
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
                    Страница не найдена
                </h1>

                <p className="mt-2 max-w-2xl text-zinc-600">
                    Возможно, ссылка устарела или страница была перемещена.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/templates"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Открыть каталог
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                    >
                        На главную
                    </Link>
                </div>
            </div>
        </main>
    );
}
