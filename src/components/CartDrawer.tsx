"use client";

import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage"; // <-- New import

export default function CartDrawer() {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, cartTotal } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration errors by only rendering on client
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleCart}
            />

            {/* Slide-out panel */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-zen-bone shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-zen-sage/10">
                    <h2 className="font-serif text-3xl font-medium text-zen-dark tracking-tight">Tu Ritual</h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 text-zen-sage hover:text-zen-dark transition-colors rounded-full hover:bg-zen-sage/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-zen-sage/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-zen-dark mb-6">Tu carrito está vacío</p>
                            <button onClick={toggleCart} className="text-zen-sage border-b border-zen-sage pb-1 text-sm hover:text-zen-dark hover:border-zen-dark transition-colors">Descubrir té</button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-6 items-center group">
                                {/* Product Image using new component */}
                                <div className="relative w-24 h-28 bg-zen-sage/5 rounded-sm overflow-hidden shrink-0 border border-zen-sage/10 group-hover:border-zen-sage/30 transition-colors">
                                    <ProductImage
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col py-1">
                                    <h3 className="font-serif text-lg text-zen-dark leading-tight">{item.name}</h3>
                                    <p className="text-zen-sage font-sans flex-1 text-sm mt-1">€{item.price.toFixed(2)}</p>

                                    {/* Quantity Controls & Remove */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-zen-sage/20 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                className="text-zen-sage hover:text-zen-dark hover:bg-zen-sage/5 px-3 py-1 font-sans text-lg transition-colors"
                                            >-</button>
                                            <span className="text-xs font-sans font-medium text-zen-dark w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-zen-sage hover:text-zen-dark hover:bg-zen-sage/5 px-3 py-1 font-sans text-lg transition-colors"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-[10px] uppercase tracking-widest text-zen-sage/60 hover:text-red-500 transition-colors"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-zen-sage/10 p-8 bg-white/50 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-sans text-xs tracking-[0.2em] uppercase text-zen-dark/60 font-medium">Subtotal</span>
                            <span className="font-serif text-3xl text-zen-dark tracking-tight">€{cartTotal().toFixed(2)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={toggleCart}
                            className="block w-full text-center bg-zen-dark text-white py-5 rounded-sm tracking-[0.2em] text-xs font-light hover:bg-zen-sage transition-all shadow-xl uppercase"
                        >
                            Completar Pedido
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
