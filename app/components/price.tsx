"use client";

import { use } from "react";
import { useCurrency } from "../context/currency";
import { formatPrice } from "../lib/formatPrice";

export default function Price({ amountUsd }: { amountUsd: number }) {
    const { currency, usdToRub } = useCurrency();
    return <>{formatPrice(amountUsd, currency, usdToRub)}</>;
}