export type Role = "user" | "admin";

export type User = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
    createdAt: string;
};

export type OrderStatus = "created" | "paid" | "delivered" | "canceled";

export type Order = {
    id: string;
    userId: string;          // ⭐ ключ к “только свои заказы”
    slug: string;
    title: string;
    priceUsd: number;
    email: string;
    name?: string;
    status: OrderStatus;
    createdAt: string;
};