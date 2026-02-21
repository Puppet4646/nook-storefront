export default function Storytelling() {
    return (
        <section className="relative bg-zen-sage flex flex-col pt-24 pb-32 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center w-full">

                {/* Left Side: Typography */}
                <div className="z-10 order-2 md:order-1 flex flex-col justify-center">
                    <p className="text-white/80 font-sans text-xs font-medium tracking-[0.4em] mb-8 uppercase">
                        Nuestra Filosofía
                    </p>
                    <h2 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
                        Creemos en la pausa. En el <span className="italic">instante</span> donde el mundo se detiene y solo queda el aroma.
                    </h2>
                    <div className="max-w-xl">
                        <p className="text-white/90 font-sans font-light text-lg md:text-xl leading-relaxed">
                            Nuestra selección es un tributo a la paciencia. Desde los campos de té envueltos en niebla hasta el tostado artesanal, cada paso está diseñado para honrar el ritual de lo simple y lo excepcional.
                        </p>
                    </div>
                    <div className="mt-12">
                        <button className="bg-white text-zen-sage font-sans font-semibold px-8 py-5 rounded-sm flex items-center gap-3 hover:bg-zen-bone transition-colors shadow-sm w-fit uppercase tracking-wider text-xs">
                            Descubrir la Colección
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Right Side: Asymmetric Editorial Image */}
                <div className="relative order-1 md:order-2 w-full flex justify-center md:justify-end">
                    <div className="relative aspect-[3/4] w-full max-w-md rounded-sm overflow-hidden shadow-2xl transform md:translate-x-8 md:translate-y-12">
                        <img
                            className="w-full h-full object-cover"
                            alt="A serene traditional matcha tea preparation ritual"
                            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1000&auto=format&fit=crop"
                        />
                    </div>
                    {/* Decorative Element: Overflowing offset border */}
                    <div className="absolute top-0 right-0 w-full max-w-md aspect-[3/4] border border-white/30 rounded-sm -z-10 pointer-events-none transform translate-x-4 -translate-y-4 md:translate-x-12 md:translate-y-8"></div>
                </div>

            </div>

            {/* Subtle Scroll Indicator overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hidden md:flex">
                <span className="text-white text-[10px] tracking-widest uppercase font-medium">Descubre</span>
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
}
