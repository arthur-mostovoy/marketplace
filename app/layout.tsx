import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import { CurrencyProvider } from "./context/currency";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Marketplace",
    description: "Шаблоны лендингов для онлайн-курсов",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 text-zinc-900`}>
                <CurrencyProvider>
                    <div className="min-h-screen">
                        <Header />

                        {/* Контент */}
                        <main className="mx-auto w-full max-w-6xl px-4 py-8">
                            {children}
                        </main>

                        {/* Footer */}
                        <footer className="border-t border-zinc-200 bg-white/70">
                            <div className="mx-auto w-full max-w-6xl px-4 py-8">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                    {/* Бренд */}
                                    <div className="max-w-md">
                                        <div className="flex items-center gap-2">
                                            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-sm font-bold text-white shadow-sm">
                                                MP
                                            </div>
                                            <div className="leading-tight">
                                                <div className="text-sm font-semibold">Marketplace</div>
                                                <div className="text-xs text-zinc-500">Шаблоны для онлайн-курсов</div>
                                            </div>
                                        </div>

                                        <p className="mt-3 text-sm text-zinc-600">
                                            MVP-каталог шаблонов: выбирай, добавляй в избранное, смотри страницу товара.
                                            Дальше подключим оплату и выдачу файлов.
                                        </p>
                                    </div>

                                    {/* Ссылки */}
                                    <div className="grid gap-2 text-sm">
                                        <a className="text-zinc-700 hover:text-zinc-900" href="/templates">
                                            Каталог
                                        </a>
                                        <a className="text-zinc-700 hover:text-zinc-900" href="/favorites">
                                            Избранное
                                        </a>
                                        <a className="text-zinc-700 hover:text-zinc-900" href="/">
                                            Главная
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                                    <span>© {new Date().getFullYear()} Marketplace</span>
                                    <span>Сделано на Next.js + Tailwind</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </CurrencyProvider>
            </body>
        </html>
    );
}
