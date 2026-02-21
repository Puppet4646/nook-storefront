"use client";

import { useCartStore } from "@/store/cart";

export default function AddToCartButton({ product }: { product: { id: number, name: string, price: string, images?: { src: string }[] } }) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            image: (product.images?.length ?? 0) > 0 ? product.images![0].src : "",
        });
    };

    return (
        <button
            onClick={handleAdd}
            className="w-full bg-zen-sage text-white py-5 rounded-sm tracking-[0.15em] text-xs font-bold hover:bg-zen-dark transition-all shadow-lg shadow-zen-sage/20 uppercase"
        >
            Añadir al Carrito
        </button>
    );
}
