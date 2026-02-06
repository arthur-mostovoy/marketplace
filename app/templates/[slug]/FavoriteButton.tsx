"use client";

import { useFavorites } from "../../hooks/useFavorites";

export default function FavoriteButton({ slug }: { slug: string }) {
const { isFavorite, toggleFavorite } = useFavorites();
const fav = isFavorite(slug);

return (
    <button
        type="button"
        onClick={() => toggleFavorite(slug)}
        className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
        aria-label="Добавить в избранное"
        title={fav ? "Убрать из избранного" : "Добавить в избранное"}
    >
        {fav ? "★ В избранном" : "☆ В избранное"}
    </button>
);
}