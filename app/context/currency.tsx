"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "USD" | "RUB";

const DEFAULT_USD_TO_RUB = 95;

const CurrencyContext = createContext<{
    currency: Currency;
    setCurrency: (c: Currency) => void;
    toggleCurrency: () => void;
    usdToRub: number;
} | null>(null);

const STORAGE_KEY = "currency:v1";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("USD");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "USD" || saved === "RUB") setCurrency(saved);
        } catch { }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, currency);
        } catch { }
    }, [currency]);

    const toggleCurrency = () => setCurrency((c) => (c === "USD" ? "RUB" : "USD"));

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, usdToRub: DEFAULT_USD_TO_RUB, }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
    return ctx;
}
