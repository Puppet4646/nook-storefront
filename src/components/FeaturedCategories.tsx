import Image from "next/image";

export default function FeaturedCategories() {
    return (
        <section className="bg-zen-bone w-full px-6 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">

                {/* Featured Categories Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-zen-dark mb-6 px-2">
                        Explora Nuestras Esencias
                    </h2>
                    <p className="text-[#4A564B] text-base md:text-lg font-sans font-light max-w-lg mx-auto leading-relaxed px-6">
                        Meticulosamente seleccionadas para acompañar cada momento de tu día.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="h-px w-16 bg-zen-sage"></div>
                    </div>
                </div>

                {/* Category Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

                    {/* Category Card 1: Té Matcha */}
                    <div className="group relative overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-xl aspect-[3/4]">
                        <Image
                            alt="Premium Japanese Matcha Tea Powder"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1579761763131-dae193fb69ee?q=80&w=800&auto=format&fit=crop"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Card Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-end">
                            <h3 className="text-white text-sm font-sans font-medium uppercase tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.25em]">
                                Té Matcha
                            </h3>
                            <div className="mt-3 h-0.5 w-0 bg-zen-sage transition-all duration-500 group-hover:w-16"></div>
                        </div>
                        <a aria-label="Explorar Té Matcha" className="absolute inset-0 z-10" href="#"></a>
                    </div>

                    {/* Category Card 2: Té Negro */}
                    <div className="group relative overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-xl aspect-[3/4]">
                        <Image
                            alt="Artisanal Black Tea Leaves"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-end">
                            <h3 className="text-white text-sm font-sans font-medium uppercase tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.25em]">
                                Té Negro
                            </h3>
                            <div className="mt-3 h-0.5 w-0 bg-zen-sage transition-all duration-500 group-hover:w-16"></div>
                        </div>
                        <a aria-label="Explorar Té Negro" className="absolute inset-0 z-10" href="#"></a>
                    </div>

                    {/* Category Card 3: Café de Especialidad */}
                    <div className="group relative overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:shadow-xl aspect-[3/4]">
                        <Image
                            alt="Roasted Specialty Coffee Beans"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-end">
                            <h3 className="text-white text-sm font-sans font-medium uppercase tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.25em] text-center">
                                Café de Especialidad
                            </h3>
                            <div className="mt-3 h-0.5 w-0 bg-zen-sage transition-all duration-500 group-hover:w-16"></div>
                        </div>
                        <a aria-label="Explorar Café de Especialidad" className="absolute inset-0 z-10" href="#"></a>
                    </div>

                </div>

                {/* Minimal Call to Action */}
                <div className="mt-20 text-center">
                    <button className="inline-flex items-center gap-2 border-b-2 border-zen-sage pb-1 text-xs font-sans font-semibold uppercase tracking-widest text-[#4A564B] hover:text-zen-dark transition-colors">
                        Ver Toda la Colección
                    </button>
                </div>

            </div>
        </section>
    );
}
