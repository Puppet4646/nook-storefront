import { Suspense } from "react";
import CategoryFilterClient from "./CategoryFilterClient";

interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    return (
        <Suspense fallback={<div className="h-16 w-full animate-pulse bg-zen-sage/10 rounded-sm"></div>}>
            <CategoryFilterClient categories={categories} />
        </Suspense>
    );
}
