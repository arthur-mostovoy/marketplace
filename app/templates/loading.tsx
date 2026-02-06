export default function LoadingTemplates() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            {/* Заголовок-скелет */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <div className="h-7 w-48 rounded-lg bg-zinc-200/70" />
                    <div className="h-4 w-80 rounded-lg bg-zinc-200/50" />
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <div className="h-10 w-full rounded-xl bg-zinc-200/60 sm:w-64" />
                    <div className="h-10 w-full rounded-xl bg-zinc-200/60 sm:w-56" />
                    <div className="h-10 w-full rounded-xl bg-zinc-200/60 sm:w-24" />
                </div>
            </div>

            {/* Фильтры-скелет */}
            <div className="mt-3 flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-24 rounded-full bg-zinc-200/60" />
                ))}
                <div className="ml-auto h-5 w-36 rounded-lg bg-zinc-200/50" />
            </div>

            {/* Сетка карточек-скелет */}
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i}>
                        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                            <div className="h-28 bg-zinc-100" />
                            <div className="p-4">
                                <div className="h-5 w-3/4 rounded bg-zinc-200/70" />
                                <div className="mt-2 h-4 w-full rounded bg-zinc-200/50" />
                                <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200/50" />

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="h-9 w-24 rounded-lg bg-zinc-200/70" />
                                    <div className="h-4 w-20 rounded bg-zinc-200/50" />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
