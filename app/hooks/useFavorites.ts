"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "favorites:v1";
const EVENT_NAME = "favorites:changed";

function readFavorites(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeFavorites(next: string[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
        // ignore
    }

    // ВАЖНО: чтобы обновлялось в этом же табе (Header, другие страницы)
    try {
        /*window.dispatchEvent(new Event(EVENT_NAME));*/
        queueMicrotask(() => window.dispatchEvent(new Event(EVENT_NAME)));
    } catch {
        //ignore
    }
}

export function useFavorites() {
    const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

    // 1) Гидратация + подписка на изменения
    useEffect(() => {
        // при первом заходе
        setFavoriteSlugs(readFavorites());

        // изменения в этом же табе
        const onChanged = () => setFavoriteSlugs(readFavorites());
        window.addEventListener(EVENT_NAME, onChanged);

        // изменения из других вкладок
        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) setFavoriteSlugs(readFavorites());
        };
        window.addEventListener("storage", onStorage);

        return () => {
            window.removeEventListener(EVENT_NAME, onChanged);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    const favoritesSet = useMemo(() => new Set(favoriteSlugs), [favoriteSlugs]);

    function isFavorite(slug: string) {
        return favoritesSet.has(slug);
    }

    function toggleFavorite(slug: string) {
        setFavoriteSlugs((prev) => {
            const set = new Set(prev);
            if (set.has(slug)) set.delete(slug);
            else set.add(slug);

            const next = Array.from(set);

            // 2) Сохраняем СРАЗУ, не ждём useEffect
            writeFavorites(next);

            return next;
        });
    }

    function clearFavorites() {
        setFavoriteSlugs(() => {
            const next: string[] = [];
            writeFavorites(next);
            return next;
        });
    }

    return { favoriteSlugs, isFavorite, toggleFavorite, clearFavorites };
}

/*
export function useFavorites() {
    const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

    // 1) Загрузка из localStorage при первом запуске в браузере
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) setFavoriteSlugs(parsed);
        } catch {
            // игнорируем битые данные
        }
    }, []);

    // 2) Сохранение при изменении
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteSlugs));
        } catch {
            // localStorage может быть недоступен (редко)
        }
    }, [favoriteSlugs]);

    const favoritesSet = useMemo(() => new Set(favoriteSlugs), [favoriteSlugs]);

    function isFavorite(slug: string) {
        return favoritesSet.has(slug);
    }

    function toggleFavorite(slug: string) {
        setFavoriteSlugs((prev) => {
            const set = new Set(prev);
            if (set.has(slug)) set.delete(slug);
            else set.add(slug);
            return Array.from(set);
        });
    }

    return { favoriteSlugs, isFavorite, toggleFavorite };
} */