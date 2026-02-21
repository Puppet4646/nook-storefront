"use client";

import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import Link from "next/link";

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
            {isOpen && (
                <div
                    className="fixed inset-0 bg-nook-dark/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Slide-out panel */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-zen-bone shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-zen-sage/20">
                    <h2 className="font-serif text-2xl text-zen-dark">Tu Carrito</h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 text-zen-sage hover:text-zen-dark transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-zen-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="font-sans text-sm tracking-widest uppercase text-zen-dark">Tu carrito está vacío</p>
                            <button onClick={toggleCart} className="mt-6 text-zen-sage underline underline-offset-4 text-sm hover:text-zen-dark">Seguir comprando</button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                {/* Product Image */}
                                <div className="w-20 h-24 bg-zen-sage/10 rounded overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-zen-sage/30"></div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col">
                                    <h3 className="font-serif text-lg text-zen-dark leading-tight">{item.name}</h3>
                                    <p className="text-zen-sage font-sans font-medium text-sm mt-1">€{item.price.toFixed(2)}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center border border-zen-sage/30 rounded-full px-2 py-0.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                className="text-zen-sage hover:text-zen-dark px-2 font-bold"
                                            >-</button>
                                            <span className="text-xs font-sans font-medium text-zen-dark w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-zen-sage hover:text-zen-dark px-2 font-bold"
                                            >+</button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-zen-sage/20 p-6 bg-zen-bone/50 pb-10">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-sans text-sm tracking-widest uppercase text-zen-dark/80 font-bold">Total</span>
                            <span className="font-serif text-2xl text-zen-dark">€{cartTotal().toFixed(2)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={toggleCart}
                            className="block w-full text-center bg-zen-sage text-white py-5 rounded-sm tracking-[0.15em] text-xs font-bold hover:bg-zen-dark transition-all shadow-lg shadow-zen-sage/20 uppercase"
                        >
                            Proceder al Pago
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
