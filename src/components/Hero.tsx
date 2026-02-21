import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] px-6 pt-16 pb-12 flex flex-col md:flex-row items-center max-w-7xl mx-auto">
            {/* Background Decorative Element */}
            <div className="absolute top-20 right-0 w-32 h-64 bg-zen-sage/10 rounded-l-full -z-10 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 flex-1 items-center">
                {/* Left Side: Typography & CTA (60% width on desktop grid) */}
                <div className="col-span-1 md:col-span-6 lg:col-span-5 z-10 mt-4 md:mt-0">
                    <p className="font-sans text-xs font-medium tracking-[0.3em] text-[#4A564B] mb-6 uppercase">
                        Especialidad en Té y Café
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-zen-dark leading-[1.1] mb-8">
                        El Ritual del <span className="italic">Silencio</span> en cada sorbo
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                        <button className="bg-zen-sage hover:bg-zen-sage/90 text-white font-sans text-xs font-bold tracking-widest uppercase px-8 py-5 rounded-sm w-fit transition-all shadow-sm">
                            Explorar la Esencia
                        </button>
                        <div className="flex items-center gap-4 text-[#4A564B]">
                            <div className="h-[1px] w-12 bg-zen-sage/40"></div>
                            <span className="text-[10px] italic font-serif">Est. 2024</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Vertical Featured Image (Offset) */}
                <div className="col-span-1 md:col-span-6 lg:col-span-7 flex justify-center md:justify-end mt-12 md:mt-0">
                    <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border-[8px] border-white">
                        <Image
                            alt="Premium tea ritual"
                            className="object-cover"
                            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Small caption/badge over image */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md p-4 border border-white/30 hidden sm:block">
                            <p className="text-white text-xs font-sans font-light leading-relaxed drop-shadow-md">
                                Cosechas seleccionadas de las montañas de Shizuoka para encontrar el Zen diario.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
