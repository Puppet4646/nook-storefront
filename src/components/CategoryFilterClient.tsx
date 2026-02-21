"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

// Iconos SVG de reemplazo directo para evitar dependencias
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
    parent: number;
    children?: Category[]; // Nueva propiedad para anidamiento
}

// Función auxiliar para construir el árbol de categorías
function buildCategoryTree(flatCategories: Category[]): Category[] {
    const categoryMap = new Map<number, Category>();
    const rootCategories: Category[] = [];

    // Primera pasada: Inicializar el mapa
    flatCategories.forEach(cat => {
        categoryMap.set(cat.id, { ...cat, children: [] });
    });

    // Segunda pasada: Construir el árbol
    flatCategories.forEach(cat => {
        const mappedCat = categoryMap.get(cat.id)!;
        if (cat.parent === 0) {
            rootCategories.push(mappedCat);
        } else {
            const parentCat = categoryMap.get(cat.parent);
            if (parentCat) {
                parentCat.children!.push(mappedCat);
            }
        }
    });

    return rootCategories;
}

export default function CategoryFilterClient({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Estado para los acordeones abiertos (guardar IDs de categorías padre)
    const [openMenus, setOpenMenus] = useState<Set<number>>(new Set());

    // Obtener parámetros actuales
    const currentCategory = searchParams.get("categoria") || "todas";
    const currentSort = searchParams.get("orden") || "default";

    // Modificador URL Query
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const toggleMenu = (id: number) => {
        const newSet = new Set(openMenus);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setOpenMenus(newSet);
    };

    // Construir el árbol en el renderizado
    const tree = buildCategoryTree(categories);

    // Render recursivo de categorías
    const renderCategoryTree = (node: Category, level = 0) => {
        const hasChildren = node.children && node.children.length > 0;
        const isOpen = openMenus.has(node.id);
        const isActive = currentCategory === node.slug;
        const paddingLeft = level * 16; // 1rem extra por cada nivel

        return (
            <div key={node.id} className="w-full flex flex-col">
                <div
                    className={`flex items-center justify-between py-2 cursor-pointer transition-colors group
                        ${isActive ? "text-zen-dark font-semibold" : "text-zen-sage hover:text-zen-dark"}
                    `}
                    style={{ paddingLeft: `${paddingLeft}px` }}
                >
                    <button
                        onClick={() => router.push(`/tienda?${createQueryString("categoria", node.slug)}`)}
                        className="flex-1 text-left flex items-center gap-2 text-sm"
                    >
                        <span className="truncate">{node.name}</span>
                        {node.count > 0 && <span className="opacity-40 text-[10px]">({node.count})</span>}
                    </button>

                    {hasChildren && (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleMenu(node.id); }}
                            className="p-1 rounded-sm hover:bg-zen-sage/10 text-zen-dark"
                        >
                            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                        </button>
                    )}
                </div>

                {/* Subcategorías (Anidadas) */}
                {hasChildren && isOpen && (
                    <div className="flex flex-col border-l border-zen-sage/20 ml-2 mt-1 mb-2 animate-in slide-in-from-top-2">
                        {node.children!.map(child => renderCategoryTree(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Header del Filtro: Sólo Ordenador y Título para Móvil ahora */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zen-sage/30 pb-4 gap-4">
                <h2 className="font-serif text-xl text-zen-dark hidden md:block">Colección</h2>
                <div className="flex items-center gap-3 w-full md:w-auto bg-white/40 px-3 py-1.5 rounded-sm border border-zen-sage/20">
                    <span className="text-[10px] uppercase tracking-widest text-zen-sage font-semibold">Ordenar:</span>
                    <select
                        value={currentSort}
                        onChange={(e) => router.push(`/tienda?${createQueryString("orden", e.target.value)}`)}
                        className="bg-transparent text-xs font-sans text-zen-dark focus:outline-none cursor-pointer w-full md:w-auto"
                    >
                        <option value="default">Recomendados</option>
                        <option value="price_asc">Precio: Menor a Mayor</option>
                        <option value="price_desc">Precio: Mayor a Menor</option>
                        <option value="newest">Novedades</option>
                    </select>
                </div>
            </div>

            {/* Layout Tienda: Sidebar + Productos irán en page.tsx pero aquí exportamos el Sidebar Filter */}
            <div className="w-full bg-zen-light/30 rounded-md p-4 border border-zen-sage/10 shadow-sm">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-zen-dark mb-4 border-b border-zen-sage/20 pb-2">
                    Categorías
                </h3>

                <div className="flex flex-col gap-1 w-full">
                    <button
                        onClick={() => router.push(`/tienda?${createQueryString("categoria", "todas")}`)}
                        className={`text-left py-2 text-sm transition-colors ${currentCategory === "todas" ? "text-zen-dark font-semibold" : "text-zen-sage hover:text-zen-dark"}`}
                    >
                        Catálogo Completo
                    </button>

                    {tree.map(rootNode => renderCategoryTree(rootNode, 0))}
                </div>
            </div>

        </div>
    );
}
