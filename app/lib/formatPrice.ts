import type { Currency } from "../context/currency";

export function formatPrice(amountUsd: number, currency: Currency, usdToRub: number) {
    if (currency === "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amountUsd);
    }

    // простой фиксированный курс для MVP (позже сделаем API)
    // const rate = 95;
    // const amountRub = Math.round(amountUsd * rate);

    const amountRub = Math.round(amountUsd * usdToRub);

    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
    }).format(amountRub);
}