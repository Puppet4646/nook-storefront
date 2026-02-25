"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2000&auto=format&fit=crop",
        alt: "Ritual del té Zen verde oscuro",
        kicker: "Nook",
        headline: (
            <>
                El Ritual del <br />
                <span className="italic text-zen-sage-light font-light">Silencio</span>
            </>
        ),
        description:
            "Cosechas exclusivas de las montañas de Shizuoka y las mesetas de Etiopía. Encuentra tu Zen diario en cada taza.",
        cta: "Descubrir la Colección",
        href: "/tienda",
    },
    {
        image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop",
        alt: "Granos de café de especialidad tostados artesanalmente",
        kicker: "Especialidad",
        headline: (
            <>
                Café de <br />
                <span className="italic text-zen-sage-light font-light">Origen</span>
            </>
        ),
        description:
            "Tostado artesanal de microlotes seleccionados. Perfiles aromáticos únicos desde la finca hasta tu taza.",
        cta: "Explorar Cafés",
        href: "/tienda",
    },
    {
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=2000&auto=format&fit=crop",
        alt: "Matcha ceremonial japonés premium",
        kicker: "Ceremonial",
        headline: (
            <>
                Matcha <br />
                <span className="italic text-zen-sage-light font-light">Premium</span>
            </>
        ),
        description:
            "Grado ceremonial de Uji, Kyoto. Cultivado a la sombra, molido en piedra. Umami puro en cada preparación.",
        cta: "Descubrir Matcha",
        href: "/tienda",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const goTo = useCallback((index: number) => {
        setCurrent(index);
    }, []);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    // Auto-rotation
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, next]);

    return (
        <section
            className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={() => setIsAutoPlaying(false)}
        >
            {/* Background Images */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
                        i === current ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20 md:from-black/80 md:via-black/50 md:to-transparent" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 flex flex-col justify-center h-full pt-12 md:pt-20">
                <div className="max-w-2xl">
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            className={`transition-all duration-700 ease-in-out ${
                                i === current
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4 absolute pointer-events-none"
                            }`}
                        >
                            {i === current && (
                                <>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-[1px] w-12 bg-zen-sage" />
                                        <p className="font-sans text-[10px] md:text-sm font-medium tracking-[0.3em] text-zen-sage-light uppercase">
                                            {slide.kicker}
                                        </p>
                                    </div>

                                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-4 md:mb-6 drop-shadow-lg">
                                        {slide.headline}
                                    </h2>

                                    <p className="font-sans text-sm md:text-base lg:text-lg text-gray-200 mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
                                        {slide.description}
                                    </p>

                                    <Link
                                        href={slide.href}
                                        className="inline-block bg-zen-sage hover:bg-white hover:text-zen-dark text-white font-sans text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 md:px-10 md:py-5 rounded-sm transition-all duration-300 shadow-xl border border-transparent hover:border-zen-sage"
                                    >
                                        {slide.cta}
                                    </Link>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Ir al slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                            i === current
                                ? "w-8 h-2 bg-zen-sage"
                                : "w-2 h-2 bg-white/50 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
