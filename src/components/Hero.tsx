import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image Loading with Next/Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2000&auto=format&fit=crop"
                    alt="Ritual del té Zen verde oscuro"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark/Sage Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-zen-sage"></div>
                        <p className="font-sans text-xs md:text-sm font-medium tracking-[0.3em] text-zen-sage-light uppercase">
                            Nook
                        </p>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 drop-shadow-lg">
                        El Ritual del <br />
                        <span className="italic text-zen-sage-light font-light">Silencio</span>
                    </h1>

                    <p className="font-sans text-base md:text-lg text-gray-200 mb-10 max-w-lg leading-relaxed font-light">
                        Cosechas exclusivas de las montañas de Shizuoka y las mesetas de Etiopía. Encuentra tu Zen diario en cada taza.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <button className="bg-zen-sage hover:bg-white hover:text-zen-dark text-white font-sans text-xs font-bold tracking-[0.2em] uppercase px-10 py-5 rounded-sm transition-all duration-300 shadow-xl border border-transparent hover:border-zen-sage">
                            Descubrir la Colección
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-70 animate-bounce">
                <span className="text-white text-[10px] uppercase tracking-widest font-sans">Explorar</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
}
