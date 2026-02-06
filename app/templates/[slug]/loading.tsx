export default function LoadingTemplate() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="h-4 w-56 rounded bg-zinc-200/50" />

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Левая часть */}
                <section className="lg:col-span-2">
                    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                        <div className="h-72 bg-zinc-100" />
                        <div className="grid grid-cols-3 gap-3 border-t border-zinc-200 p-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-12 rounded-2xl bg-zinc-200/60" />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="h-8 w-2/3 rounded bg-zinc-200/70" />
                        <div className="mt-3 h-4 w-full rounded bg-zinc-200/50" />
                        <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200/50" />

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                    <div className="h-4 w-24 rounded bg-zinc-200/70" />
                                    <div className="mt-2 h-4 w-32 rounded bg-zinc-200/50" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="h-6 w-40 rounded bg-zinc-200/70" />
                        <div className="mt-3 space-y-2">
                            <div className="h-4 w-full rounded bg-zinc-200/50" />
                            <div className="h-4 w-11/12 rounded bg-zinc-200/50" />
                            <div className="h-4 w-10/12 rounded bg-zinc-200/50" />
                        </div>
                    </div>
                </section>

                {/* Правая часть */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="h-4 w-16 rounded bg-zinc-200/50" />
                        <div className="mt-2 h-8 w-32 rounded bg-zinc-200/70" />

                        <div className="mt-5 space-y-3">
                            <div className="h-10 w-full rounded-xl bg-zinc-200/70" />
                            <div className="h-10 w-full rounded-xl bg-zinc-200/60" />
                            <div className="h-10 w-full rounded-xl bg-zinc-200/60" />
                        </div>

                        <div className="mt-6 border-t border-zinc-200 pt-5">
                            <div className="h-4 w-20 rounded bg-zinc-200/70" />
                            <div className="mt-3 space-y-2">
                                <div className="h-4 w-full rounded bg-zinc-200/50" />
                                <div className="h-4 w-11/12 rounded bg-zinc-200/50" />
                                <div className="h-4 w-10/12 rounded bg-zinc-200/50" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="h-5 w-40 rounded bg-zinc-200/70" />
                        <div className="mt-4 space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-24 rounded-2xl bg-zinc-100" />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
