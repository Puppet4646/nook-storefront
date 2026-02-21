"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const payload = {
                contact: { email: formData.email },
                shipping: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode
                },
                items: items
            };

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setOrderId(data.orderId);
                setSuccess(true);
                clearCart();
            } else {
                setErrorMsg(data.message || "Ocurrió un error al procesar el pedido.");
            }
        } catch (err) {
            console.error("Frontend checkout error:", err);
            setErrorMsg("Hubo un problema de red. Por favor, inténtelo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen bg-zen-bone flex flex-col items-center justify-center -mt-20 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 text-zen-sage/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="font-serif text-3xl text-zen-dark mb-2 text-center">¡Pedido Confirmado!</h1>
                <p className="text-[#8C9A7B] mb-8">
                    Su número de pedido es <strong>#{orderId}</strong>. Hemos recibido su encargo y estamos preparando su experiencia Nook.
                </p>
                <Link href="/tienda" className="bg-zen-sage text-white px-8 py-4 rounded-sm tracking-widest text-xs font-bold uppercase hover:bg-zen-dark transition-all shadow-lg">
                    Seguir Explorando
                </Link>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-zen-bone flex flex-col items-center justify-center -mt-20 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-zen-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h1 className="font-serif text-3xl text-zen-dark mb-4 text-center">Tu carrito está vacío</h1>
                <p className="text-zen-sage mb-8 text-center max-w-md">No tienes artículos en tu carrito en este momento. Explora nuestra colección para encontrar tu próxima experiencia.</p>
                <Link href="/tienda" className="bg-zen-sage text-white px-8 py-4 rounded-sm tracking-widest text-xs font-bold uppercase hover:bg-zen-dark transition-all">
                    Volver a la Tienda
                </Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-zen-bone pt-32 pb-16 px-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Side: Checkout Form */}
                <div className="flex-1">
                    <h1 className="font-serif text-4xl text-zen-dark mb-10">Proceder al Pago</h1>

                    <form onSubmit={handleCheckout} className="space-y-12">

                        {/* Información de Contacto */}
                        <section>
                            <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-zen-sage mb-6 border-b border-zen-sage/30 pb-2">Información de Contacto</h2>
                            <div className="space-y-4">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required className="w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                            </div>
                        </section>

                        {/* Dirección de Envío */}
                        <section>
                            <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-zen-sage mb-6 border-b border-zen-sage/30 pb-2">Dirección de Envío</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required className="w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellidos" required className="w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Dirección Postal" required className="md:col-span-2 w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" required className="w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Código Postal" required className="w-full bg-transparent border border-zen-sage/30 p-4 rounded-sm focus:outline-none focus:border-zen-sage placeholder-zen-dark/40 font-sans" />
                            </div>
                        </section>

                        {/* Método de Pago Placeholder */}
                        <section>
                            <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-zen-sage mb-6 border-b border-zen-sage/30 pb-2">Pago</h2>
                            <div className="p-6 border border-zen-sage/30 rounded-sm bg-white/30 text-center">
                                <p className="font-sans text-sm text-zen-dark/70 italic">La integración de pago real (Stripe/PayPal) requeriría pasarelas adicionales. Por ahora generaremos un pedido estándar.</p>
                            </div>
                        </section>

                        {errorMsg && (
                            <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-sm font-sans text-sm">
                                {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zen-sage text-white py-5 rounded-sm tracking-[0.15em] text-xs font-bold hover:bg-zen-dark transition-all uppercase disabled:opacity-70 shadow-lg"
                        >
                            {loading ? 'Procesando...' : 'Completar Pedido'}
                        </button>

                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:w-[450px]">
                    <div className="bg-white/40 p-8 rounded-lg sticky top-32">
                        <h2 className="font-sans text-xs font-semibold tracking-widest uppercase text-zen-sage mb-6 border-b border-zen-sage/30 pb-2">Resumen del Pedido</h2>

                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="w-16 h-20 bg-zen-sage/10 rounded overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-zen-sage/30"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-serif text-md text-zen-dark leading-tight">{item.name}</h3>
                                        <p className="text-zen-dark/60 font-sans text-xs mt-1">Cant: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-zen-sage font-sans font-medium text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zen-sage/30 pt-6 space-y-4">
                            <div className="flex justify-between items-center text-sm font-sans text-zen-dark/80">
                                <span>Subtotal</span>
                                <span>€{cartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-sans text-zen-dark/80">
                                <span>Envío</span>
                                <span>Calculado en el siguiente paso</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-zen-sage/10">
                                <span className="font-sans text-sm tracking-widest uppercase text-zen-dark font-bold">Total</span>
                                <span className="font-serif text-2xl text-zen-dark">€{cartTotal().toFixed(2)}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}
