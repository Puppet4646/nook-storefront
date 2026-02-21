"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export default function CategoryFilterClient({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Obtener los parámetros actuales
    const currentCategory = searchParams.get("categoria") || "todas";
    const currentSort = searchParams.get("orden") || "default";

    // Modificador de URL Query
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-zen-sage/30 pb-4 gap-6">
            {/* Lista de Categorías */}
            <div className="flex gap-8 overflow-x-auto w-full md:w-auto scrollbar-hide">
                <button
                    onClick={() => router.push(`/tienda?${createQueryString("categoria", "todas")}`)}
                    className={`text-xs uppercase tracking-widest font-semibold pb-4 -mb-[17px] whitespace-nowrap transition-colors ${currentCategory === "todas" ? "text-zen-dark border-b border-zen-dark" : "text-zen-sage hover:text-zen-dark"}`}
                >
                    Catálogo Completo
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => router.push(`/tienda?${createQueryString("categoria", cat.slug)}`)}
                        className={`flex items-center gap-1 text-xs uppercase tracking-widest font-semibold pb-4 -mb-[17px] whitespace-nowrap transition-colors ${currentCategory === cat.slug ? "text-zen-dark border-b border-zen-dark" : "text-zen-sage hover:text-zen-dark"}`}
                    >
                        {cat.name} <span className="opacity-50 text-[10px]">({cat.count})</span>
                    </button>
                ))}
            </div>

            {/* Selector de Ordenación */}
            <div className="flex items-center gap-3 w-full md:w-auto bg-white/40 px-3 py-1.5 rounded-sm border border-zen-sage/20">
                <span className="text-[10px] uppercase tracking-widest text-zen-sage font-semibold">Ordenar:</span>
                <select
                    value={currentSort}
                    onChange={(e) => router.push(`/tienda?${createQueryString("orden", e.target.value)}`)}
                    className="bg-transparent text-xs font-sans text-zen-dark focus:outline-none cursor-pointer"
                >
                    <option value="default">Recomendados</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="newest">Novedades</option>
                </select>
            </div>
        </div>
    );
}
