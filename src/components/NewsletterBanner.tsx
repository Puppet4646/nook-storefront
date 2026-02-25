"use client";

import { useState } from "react";

export default function NewsletterBanner() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Connected to newsletter service
        setSubmitted(true);
    };

    return (
        <section className="relative w-full bg-zen-dark overflow-hidden">
            {/* Decorative subtle pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-zen-sage blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-zen-sage blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-24 text-center">
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-zen-sage mb-4 block">
                    Exclusivo para suscriptores
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-zen-bone mb-4 md:mb-6">
                    Únete al <span className="italic text-zen-sage-light">Nook Club</span>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-10 text-[13px] md:text-sm font-sans text-zen-bone/90 font-light">
                    <span className="flex items-center gap-2">
                        <span className="text-zen-sage text-lg">✦</span>
                        <strong className="font-semibold">20% de descuento</strong> en tu primera compra
                    </span>
                    <span className="hidden sm:inline text-zen-sage/40">·</span>
                    <span className="flex items-center gap-2">
                        <span className="text-zen-sage text-lg">✦</span>
                        <strong className="font-semibold">Muestra gratis</strong> en todos tus pedidos
                    </span>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            required
                            className="w-full sm:flex-1 bg-white/10 border border-zen-sage/30 text-zen-bone placeholder:text-zen-sage/60 font-sans text-sm px-5 py-3.5 rounded-sm outline-none focus:border-zen-sage transition-colors"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-zen-sage hover:bg-zen-sage-light hover:text-zen-dark text-white font-sans text-xs font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all duration-300"
                        >
                            Suscribirme
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-zen-sage text-3xl">✓</span>
                        <p className="font-serif text-xl text-zen-bone italic">
                            ¡Bienvenido al Nook Club!
                        </p>
                        <p className="font-sans text-sm text-zen-bone/70 font-light">
                            Revisa tu correo para recibir tu cupón de 20%.
                        </p>
                    </div>
                )}

                <p className="mt-6 font-sans text-[10px] text-zen-sage/50 tracking-wide">
                    Sin spam. Solo novedades, cosechas limitadas y ofertas exclusivas.
                </p>
            </div>
        </section>
    );
}
